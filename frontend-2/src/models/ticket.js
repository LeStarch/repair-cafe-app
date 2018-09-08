import {Client} from "models/client"
import {Worker} from "models/worker"
import {Status} from "models/status"
/**
 * Ticket:
 *
 *  Model class representing a ticket in the system. This stores the basic data
 *  including client, work order, assigned workers, and status of
 *  ticket. It is basically a container for all the above property objects.
 *
 *  Example: (repair cafe application) in the example repair cafe application,
 *           the ticket would represent a repair, and its properties would
 *           represent the following:
 *              1. client: the repair customer
 *              2. order: the repair descriprion
 *              3. workers: the repairer(s)
 *              4. status: the repair state
 * @author lestarch
 */
export class Ticket {
    /**
     * In order to start out with a new ticket, two pieces of information should
     * be supplied: client, and order. In addition, a new status object is init-
     * ialized based on configured setup.
     * @param client: client that is associated with this Ticket
     * @param order: work order assoicated with this Ticket
     */
    constructor(client, order) {
        this.client = client;
        this.order = order;
        this.status = Status.newStatus();
        this.workers = [];
    }
}
/**
 * Order:
 *
 *  The order represents the work associated with the Ticket. It contains both
 *  a short and long description for the work to be done. Often the short descr-
 *  iption is a name or title and the long description is text explaning what
 *  work is to be done.
 *
 *  Example: (repair cafe application) the short description would represent the
 *           object being repaired and the long description would hold the prob-
 *           lem that is needed to be fixed.
 * @author lestarch
 */
export class Order {
    /**
     * Builds an empty repair order with blank short and long descriptions. This
     * is needed to allow binding to the object's properties when building it
     * directly from a form.
     */
    constructor() {
        this.short = "nothing";
        this.long = "Nothing has been submitted yet";
    }
    /**
     * Returns the short description of the object.
     * @return: short description
     */
    getShortDescription() {
        return this.short;
    }
    /**
     * Returns the long description of the object.
     * @return: long description
     */
    getLongDescription() {
        return this.long;
    }
}

// import {RepairAPI} from "../repair-api"
// import {Elastic} from "../elastic"
// /**
//  * A repair class representing repair data
//  */
// export class Repair {
//     static MARSHALL_FIELDS = ["name","email","type","item","description",
//                               "repairers","stateIndex","deleted","reservation", "phone", "provider"];
//     static demarshall(object) {
//         var repair = new Repair();
//         repair.id = object.id;
//         for (var i = 0; i < Repair.MARSHALL_FIELDS.length; i++) {
//             repair[Repair.MARSHALL_FIELDS[i]] = object[Repair.MARSHALL_FIELDS[i]];
//             //Overrides
//             if (typeof(repair[Repair.MARSHALL_FIELDS[i]]) === "undefined" && Repair.MARSHALL_FIELDS[i] == "reserved") {
//                 repair[Repair.MARSHALL_FIELDS[i]] = true;
//             }
//         }
//         repair.states = [];
//         for (var i = 0; i < object.states.length; i++) {
//             repair.states.push(State.demarshall(object.states[i]));
//         }
//         return repair;
//     }
//     marshall() {
//         var repair = {};
//         if ("id" in this) {
//             repair.id = this.id;
//         }
//         for (var i = 0; i < Repair.MARSHALL_FIELDS.length; i++) {
//             repair[Repair.MARSHALL_FIELDS[i]] = this[Repair.MARSHALL_FIELDS[i]];
//         }
//         repair.states = [];
//         for (var i = 0; i < this.states.length; i++) {
//             repair.states.push(this.states[i].marshall());
//         }
//         return repair;
//     }
//     /**
//      * Construct a new repair
//      * @param name: name of person getting repair
//      * @param email: e-mail of repairee
//      * @param type: type of repair
//      * @param reserved: pre-reserved repair?
//      */
//     constructor(name,email,type,reserved,phone,provider) {
//         this.availableStates = [
//           {
//             "name":"register",
//             "message": "Repair is being registered"
//           },
//           {
//             "name":"triage",
//             "message":"Please wait to be escorted to the '"+type+"' station",
//           },
//           {
//             "name":"queued",
//             "message": "Your item is waiting for the next repaierer",
//             "text" : true
//           },
//           {
//             "name":"in-repair",
//             "message":"Your item is being repair. Please stop by.",
//             "text" : true
//           },
//           {
//             "name":"checkout",
//             "message":"Please collect your item, and proceed to checkout",
//             "text" : true
//           },
//           {
//             "name":"completed",
//             "message":"Your item is finished! Hurrah!"
//           },
//           {
//             "name":"unfixable",
//             "message": "We were lamentably unable to fix your item. Please collect it and proceed to checkout.",
//             "text" : true
//           }
//         ];
//         //Null constructor for copy
//         if (typeof(name) === "undefined") {
//             return;
//         }
//         if (typeof(reserved) === "undefined") {
//             reserved = false;
//         }
//         this.name = name;
//         this.email = email;
//         this.type = type;
//         this.phone = phone;
//         this.provider = provider;
//         this.item = "Awaiting check at the "+type+" station.";
//         this.description = "Awaiting check at the "+type+" station.";
//         this.repairers = [];
//         this.deleted = true;
//         this.stateIndex = -1;
//         this.states = [];
//         this.reservation = reserved;
//         for (var i = 0; i < this.availableStates.length; i++) {
//             this.states.push(new State(this.availableStates[i].name,this.availableStates[i].message));
//         }
//         //Enter and exit the register state
//         this.transitionState(true);
//         this.transitionState(true);
//     }
//     /**
//      * Compare function used for sorting
//      * @param b: repair to compare this agains
//      * @return: -1, I come first, 0 equal, 1 b comes first
//      */
//     compare(b) {
//         var aid = this.id.split("-");
//         aid = parseInt(aid[aid.length-1]);
//         var bid = b.id.split("-");
//         bid = parseInt(bid[bid.length-1]);
//         if (aid < bid) {
//             return -1;
//         } else if (bid < aid) {
//             return 1;
//         }
//         return 0;
//     }
//     /**
//      * Does this repair match a string filter
//      */
//     matches(filter) {
//         //Gatecheck
//         if (typeof(filter) == "undefined" || filter == "") {
//             return true;
//         }
//         var tokens = filter.toLowerCase().split(" ");
//         var ret = true;
//         var text = JSON.stringify(this).toLowerCase();
//         //Remove ":" from the text
//         text = text.replace(new RegExp("\":\"?","g"),":");
//         for (var i = 0; i < tokens.length; i++) {
//             ret = ret && text.indexOf(tokens[i]) >= 0;
//         }
//         return ret;
//     }
//     /**
//      * Transition from one state to the next
//      */
//     transitionState(nosave, state) {
//         if (this.stateIndex > -1) {
//             this.states[this.stateIndex].exit();
//         }
//         if (this.stateIndex == this.states.length - 1) {
//             for (var i = 0; i < this.states.length; i++) {
//                 this.states[i].progress = "waiting";
//             }
//         }
//         var tmp = this.stateIndex;
//         this.stateIndex= (this.stateIndex + 1) % this.states.length;
//         if (typeof(state) != "undefined") {
//             while (this.states[this.stateIndex].name != state && this.stateIndex != tmp) {
//                 this.stateIndex= (this.stateIndex + 1) % this.states.length;
//             }
//         }
//         this.states[this.stateIndex].enter();
//         //window.open('mailto:'+Config.PROV_MAP.replace("number",this.phone)+"?subject=hello_from_rc'");
//         if (typeof(nosave) === "undefined" || !(nosave) ) {
//             return RepairAPI.saveRepair(this);
//         }
//     }
//     /**
//      * Used for triaging once item enters system
//      * @param item: type of item
//      * @param description: description of problem
//      */
//     triageEntry(item,description) {
//         this.item = item;
//         this.description = description;
//         this.repairers = [];
//         while (this.states[this.stateIndex].name != "queued") {
//             this.transitionState(true);
//         }
//         Elastic.telephone(this.phone, this.availableStates[this.stateIndex].message);
//         return RepairAPI.saveRepair(this);
//     }
//     /**
//      * Assign repairers
//      * @param repairers: repairer list handling repair
//      */
//     assignRepairers(repairers) {
//         this.repairers = repairers;
//         while (this.states[this.stateIndex].name != "in-repair") {
//             this.transitionState(true);
//         }
//         Elastic.telephone(this.phone, this.availableStates[this.stateIndex].message);
//         return RepairAPI.saveRepair(this);
//     }
//     /**
//      * Finish repair
//      */
//     finishRepair() {
//         while (this.states[this.stateIndex].name != "checkout") {
//             this.transitionState(true);
//         }
//         Elastic.telephone(this.phone, this.availableStates[this.stateIndex].message);
//         return RepairAPI.saveRepair(this);
//     }
//     /**
//      * Fail this repair
//      */
//     failRepair() {
//         this.transitionState(true,"unfixable");
//         Elastic.telephone(this.phone, this.availableStates[this.stateIndex].message);
//         return RepairAPI.saveRepair(this);
//     }
//     /**
//      * Close-out
//      */
//     closeRepair() {
//         while (this.states[this.stateIndex].name != "completed") {
//             this.transitionState(true);
//         }
//         return RepairAPI.saveRepair(this);
//     }
//     /**
//      * Delete-repair
//      */
//     deleteRepair() {
//         return RepairAPI.deleteRepair(this.id);
//     }
// }
// /**
//  * A repair state.
//  */
// class State {
//     static demarshall(object) {
//         var state = new State();
//         state.name = object.name;
//         state.message = object.message;
//         state.progress = object.progress;
//         state.time = object.time;
//         state.enterTime = new Date(object.enterTime);
//         state.exitTime = new Date(object.exitTime);
//         return state;
//     }
//     marshall() {
//         var state = {};
//         state.name = this.name;
//         state.message = this.message;
//         state.progress = this.progress;
//         state.time = this.time;
//         state.enterTime = this.enterTime;
//         state.exitTime = this.exitTime;
//         return state;
//     }
//     /**
//      * Build a new state
//      * @param name: name of the state
//      */
//     constructor(name,message) {
//         this.name = name;
//         this.message = message;
//         this.progress = "waiting";
//         this.time = 0;
//         this.enterTime = new Date();
//         this.exitTime = new Date("1900-01-01");
//     }
//     /**
//      * Enter this state
//      */
//     enter() {
//         this.progress = "started";
//         this.enterTime = new Date();
//     }
//     /**
//      * Exit this state
//      */
//     exit() {
//         this.progress = "finished";
//         this.exitTime = new Date();
//         this.time = this.enterTime - this.exitTime;
//     }
// }
