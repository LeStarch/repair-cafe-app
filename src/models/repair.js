/**
 * A repair class representing repair data
 */
export class Repair {
    static MARSHALL_FIELDS = ["name", "email", "phone", "type", "item","subtype", "description",
                              "repairers","stateIndex","deleted","reserved"];
    static demarshall(object) {
        var repair = new Repair();
        repair.id = object.id;
        for (var i = 0; i < Repair.MARSHALL_FIELDS.length; i++) {
            repair[Repair.MARSHALL_FIELDS[i]] = object[Repair.MARSHALL_FIELDS[i]];
            //Overrides
            if (typeof(repair[Repair.MARSHALL_FIELDS[i]]) === "undefined" && Repair.MARSHALL_FIELDS[i] == "reserved") {
                repair[Repair.MARSHALL_FIELDS[i]] = true;
            }
        }
        repair.states = [];
        for (var i = 0; i < object.states.length; i++) {
            repair.states.push(State.demarshall(object.states[i]));
        }
        return repair;
    }
    marshall() {
        var repair = {};
        if ("id" in this) {
            repair.id = this.id;
        }
        for (var i = 0; i < Repair.MARSHALL_FIELDS.length; i++) {
            repair[Repair.MARSHALL_FIELDS[i]] = this[Repair.MARSHALL_FIELDS[i]];
        }
        repair.states = [];
        for (var i = 0; i < this.states.length; i++) {
            repair.states.push(this.states[i].marshall());
        }
        return repair;
    }
    /**
     * Construct a new repair
     * @param name: name of person getting repair
     * @param email: e-mail of repairee
     * @param phone: phone number
     * @param type: type of repair
     * @param reserved: pre-reserved repair?
     */
    constructor(name,email,phone,type,reserved) {
        this.id = "-1";
        this.availableStates = [
          {
              "name":"pre-registered",
              "message": "Repair has pre-registered"
          },
          {
            "name":"register",
            "message": "Repair is being registered"
          },
          {
            "name":"triage",
            "message":"Please wait to be escorted to the '"+type+"' station",
          },
          {
            "name":"queued",
            "message":"Waiting for next suitable repairer"
          },
          {
            "name":"in-repair",
            "message":"Attempting to repair item",
          },
          {
            "name":"checkout",
            "message":"Please collect your item, and report to checkout"
          },
          {
            "name":"completed",
            "message":"Your item is finished! Hurrah!"
          },
          {
            "name":"unfixable",
            "message":"Lamentably, we were unable to fix this item dispite legendary effort and great loss of blood, sweat, and tears."
          }
        ];
        //Null constructor for copy
        if (typeof(name) === "undefined") {
            return;
        }
        if (typeof(reserved) === "undefined") {
            reserved = false;
        }
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.type = type;
        this.item = "Awaiting check at the "+type+" station.";
        this.description = "Awaiting check at the "+type+" station.";
        this.subtype = "N/A";
        this.repairers = [];
        this.deleted = true;
        this.stateIndex = -1;
        this.states = [];
        this.reserved = reserved;
        for (var i = 0; i < this.availableStates.length; i++) {
            this.states.push(new State(this.availableStates[i].name,this.availableStates[i].message));
        }
        //Enter and exit the register state
        this.transitionState();
        this.transitionState();
    }
    /**
     * Compare function used for sorting
     * @param b: repair to compare this agains
     * @return: -1, I come first, 0 equal, 1 b comes first
     */
    compare(b) {
        var aid = this.id.split("-");
        aid = parseInt(aid[aid.length-1]);
        var bid = b.id.split("-");
        bid = parseInt(bid[bid.length-1]);
        if (aid < bid) {
            return -1;
        } else if (bid < aid) {
            return 1;
        }
        return 0;
    }
    /**
     * Does this repair match a string filter
     */
    matches(filter) {
        //Gatecheck
        if (typeof(filter) == "undefined" || filter == "") {
            return true;
        }
        var tokens = filter.toLowerCase().split(" ");
        var ret = true;
        var text = JSON.stringify(this).toLowerCase();
        //Remove ":" from the text
        text = text.replace(new RegExp("\":\"?","g"),":");
        for (var i = 0; i < tokens.length; i++) {
            ret = ret && text.indexOf(tokens[i]) >= 0;
        }
        return ret;
    }
    /**
     * Transition from one state to the next
     */
    transitionState(state) {
        if (typeof(state) === typeof(true) || typeof(state) === typeof(false)) {
            throw Error("API changed, fixme");
        }
        if (this.stateIndex > -1) {
            this.states[this.stateIndex].exit();
        } else {
            this.stateIndex = 0;
        }
        if (this.stateIndex == this.states.length - 1) {
            for (var i = 0; i < this.states.length; i++) {
                this.states[i].progress = "waiting";
            }
        }
        var tmp = this.stateIndex;
        this.stateIndex = (this.stateIndex + 1) % this.states.length;
        if (typeof(state) != "undefined") {
            while (this.states[this.stateIndex].name != state && this.stateIndex != tmp) {
                this.stateIndex= (this.stateIndex + 1) % this.states.length;
            }
        }
        this.states[this.stateIndex].enter();
    }
    /**
     * Used for triaging once item enters system
     * @param item: type of item
     * @param description: description of problem
     */
    triageEntry(item,description) {
        this.item = item;
        this.description = description;
        this.repairers = [];
        while (this.states[this.stateIndex].name != "queued") {
            this.transitionState();
        }
    }

    /**
     * Finish repair
     */
    isComplete() {
        return this.stateIndex >= (this.states.length - 2);
    }
    /**
     * Preregistration
     */
    isPrereg() {
        return this.reserved;
    }

    /**
     * Assign repairers
     * @param repairers: repairer list handling repair
     */
    assignRepairers(repairers) {
        this.repairers = repairers;
        while (this.states[this.stateIndex].name != "in-repair") {
            this.transitionState();
        }
    }

    /**
     * Set the subtype with no state change
     * @param subtype: new subtype
     */
    setSubtype(subtype) {
        this.subtype = subtype;
    }

    /**
     * Finish repair
     */
    finishRepair() {
        while (this.states[this.stateIndex].name != "checkout") {
            this.transitionState();
        }
    }
    /**
     * Fail this repair
     */
    failRepair() {
        this.transitionState("unfixable");
    }
    /**
     * Close-out
     */
    closeRepair() {
        while (this.states[this.stateIndex].name != "completed") {
            this.transitionState();
        }
    }
}
/**
 * A repair state.
 */
class State {
    static demarshall(object) {
        var state = new State();
        state.name = object.name;
        state.message = object.message;
        state.progress = object.progress;
        state.time = object.time;
        state.enterTime = new Date(object.enterTime);
        state.exitTime = new Date(object.exitTime);
        return state;
    }
    marshall() {
        var state = {};
        state.name = this.name;
        state.message = this.message;
        state.progress = this.progress;
        state.time = this.time;
        state.enterTime = this.enterTime;
        state.exitTime = this.exitTime;
        return state;
    }
    /**
     * Build a new state
     * @param name: name of the state
     */
    constructor(name,message) {
        this.name = name;
        this.message = message;
        this.progress = "waiting";
        this.time = 0;
        this.enterTime = new Date();
        this.exitTime = new Date("1900-01-01");
    }
    /**
     * Enter this state
     */
    enter() {
        this.progress = "started";
        this.enterTime = new Date();
    }
    /**
     * Exit this state
     */
    exit() {
        this.progress = "finished";
        this.exitTime = new Date();
        this.time = this.enterTime - this.exitTime;
    }
}
