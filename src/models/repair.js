/**
 * Represents the
 */
import {Marshallable} from "./marshall.js"
import {State} from "./repair-state.js"
/**
 * A repair class representing repair data
 */
export class Repair extends Marshallable {
    static MARSHALL_FIELDS = ["id", "name", "email", "phone", "type", "item", "subtype", "description",
                              "repairers", "stateIndex", "states", "reserved"];
    /**
     * Construct a new repair
     * @param name: name of person getting repair
     * @param email: e-mail of repairee
     * @param phone: phone number
     * @param type: type of repair
     * @param reserved: pre-reserved repair?
     */
    constructor(name, email, phone, type, reserved) {
        super();
        this.id = "-1";
        this.name = name || "";
        this.email = email || "";
        this.phone = phone || "";
        this.type = type || "";
        this.item = "";
        this.description = "";
        this.subtype = "N/A";
        this.acknowledged = false;
        this.repairers = [];
        this.stateIndex = -1;
        this.states = State.newStateList();
        this.reserved = (typeof(reserved) === typeof(undefined)) ? false : reserved;
        this.transitionState(this.reserved ? "pre-registered" : "triage");
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
     * Transition from one state to the next
     */
    transitionState(state) {
        if (this.stateIndex > -1) {
            this.states[this.stateIndex].exit();
        } else {
            this.stateIndex = 0;
        }
        if (this.stateIndex === this.states.length - 1) {
            for (var i = 0; i < this.states.length; i++) {
                this.states[i].progress = "waiting";
            }
        }
        let tmp = this.stateIndex;
        this.stateIndex = (this.stateIndex + 1) % this.states.length;
        if (typeof(state) != "undefined") {
            while (this.states[this.stateIndex].name !== state && this.stateIndex !== tmp) {
                this.stateIndex= (this.stateIndex + 1) % this.states.length;
            }
        }
        this.states[this.stateIndex].enter();
    }
    /**
     * Used for triage once item enters system and has been check in at a given station.
     * @param item: type of item
     * @param description: description of problem
     */
    triageEntry(item,description) {
        while (this.states[this.stateIndex].name !== "queued") {
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
        while (this.states[this.stateIndex].name !== "in-repair") {
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
        while (this.states[this.stateIndex].name !== "checkout") {
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
        while (this.states[this.stateIndex].name !== "completed") {
            this.transitionState();
        }
    }
}

