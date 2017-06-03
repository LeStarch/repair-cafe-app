import {RepairAPI} from "../repair-api"
/**
 * A repair class representing repair data
 */
export class Repair {
    static MARSHALL_FIELDS = ["name","email","type","item","description",
                              "repairer","stateIndex","deleted"];
    static demarshall(object) {
        var repair = new Repair();
        repair.id = object.id;
        for (var i = 0; i < Repair.MARSHALL_FIELDS.length; i++) {
            repair[Repair.MARSHALL_FIELDS[i]] = object[Repair.MARSHALL_FIELDS[i]];
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
     * @param type: type of repair
     */
    constructor(name,email,type) {
        this.availableStates = [
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
          }
        ];
        //Null constructor for copy
        if (typeof(name) === "undefined") {
            return;
        }
        this.name = name;
        this.email = email;
        this.type = type;
        this.item = "Awaiting check at the "+type+" station.";
        this.description = "Awaiting check at the "+type+" station.";
        this.repairer = "Unassigned";
        this.deleted = true;
        this.stateIndex = -1;
        this.states = [];
        for (var i = 0; i < this.availableStates.length; i++) {
            this.states.push(new State(this.availableStates[i].name,this.availableStates[i].message));
        }
        //Enter and exit the register state
        this.transitionState(true);
        this.transitionState(true);
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
        for (var i = 0; i < tokens.length; i++) {
            ret = ret && text.indexOf(tokens[i]) >= 0;
        }
        return ret;
    }
    /**
     * Transition from one state to the next
     */
    transitionState(nosave) {
        if (this.stateIndex > -1) {
            this.states[this.stateIndex].exit();
        }
        if (this.stateIndex == this.states.length - 1) {
            for (var i = 0; i < this.states.length; i++) {
                this.states[i].progress = "waiting";
            }
        }
        this.stateIndex= (this.stateIndex + 1) % this.states.length;
        this.states[this.stateIndex].enter();
        if (typeof(nosave) === "undefined" || !(nosave) ) {
            return RepairAPI.saveRepair(this);
        }
    }
    /**
     * Used for triaging once item enters system
     * @param item: type of item
     * @param description: description of problem
     */
    triageEntry(item,description) {
        this.item = item;
        this.description = description;
        this.repairer = "Unassigned";
        while (this.states[this.stateIndex].name != "queued") {
            this.transitionState(true);
        }
        return RepairAPI.saveRepair(this);
    }
    /**
     * Assign repairer
     * @param repairer: repairer handling repair
     */
    assignRepairer(repairer) {
        this.repairer = repairer;
        while (this.states[this.stateIndex].name != "in-repair") {
            this.transitionState(true);
        }
        return RepairAPI.saveRepair(this);
    }
    /**
     * Finish repair
     */
    finishRepair() {
        while (this.states[this.stateIndex].name != "checkout") {
            this.transitionState(true);
        }
        return RepairAPI.saveRepair(this);
    }
    /**
     * Close-out
     */
    closeRepair() {
        while (this.states[this.stateIndex].name != "completed") {
            this.transitionState(true);
        }
        return RepairAPI.saveRepair(this);
    }
    /**
     * Delete-repair
     */
    deleteRepair() {
        return RepairAPI.deleteRepair(this.id);
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
