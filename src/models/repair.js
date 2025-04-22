/**
 * Represents the
 */
import {Marshallable} from "./marshall.js"
import {State} from "./repair-state.js"
/**
 * A repair class representing repair data
 */
export class Repair extends Marshallable {
    static MARSHALL_FIELDS = ["numerical_id", "id", "name", "email", "phone", "type", "item", "subtype", "description",
                              "repairers", "stateIndex", "states", "reserved"];


    /**
     * Construct a new repair
     * @param name: name of person getting repair
     * @param email: e-mail of repairee
     * @param phone: phone number
     * @param type: type of repair
     * @param reserved: pre-reserved repair?
     */
    constructor(name, email, phone, type, reserved, item, description) {
        super();
        this.numerical_id = -1;
        this.id = "-1";
        this.name = name || "";
        this.email = email || "";
        this.phone = phone || "";
        this.type = type || "";
        this.item = item || "";
        this.description = description ||"";
        this.subtype = "N/A";
        this.acknowledged = false;
        this.repairers = [];
        this.stateIndex = 0;
        this.states = State.newStateList();
        this.reserved = (typeof(reserved) === typeof(undefined)) ? false : reserved;
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
        // Exit the current state, or enter "state 0"
        if (this.stateIndex > -1) {
            this.states[this.stateIndex].exit();
        } else {
            this.stateIndex = 0;
        }
        // If moved past the end, then clear all state information
        if (this.stateIndex === this.states.length - 1) {
            for (var i = 0; i < this.states.length; i++) {
                this.states[i].progress = "waiting";
            }
        }
        // If the state was provided, then search for it wrapping around if necessary
        let tmp = this.stateIndex;
        this.stateIndex = (this.stateIndex + 1) % this.states.length;
        if (typeof(state) != "undefined") {
            while (this.states[this.stateIndex].name !== state && this.stateIndex !== tmp) {
                this.stateIndex= (this.stateIndex + 1) % this.states.length;
            }
        }
        // "Enter" the new state if it is not the same state
        if (this.stateIndex !== tmp) {
            this.states[this.stateIndex].enter();
        }
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
     * Get the current state of the repair
     * @returns {State} the current state of the repair
     */
    currentState() {
        return this.states[this.stateIndex];
    }
    /**
     * Check if the supplied action is available (currently) for this repair.
     * @param {string} action 
     * @returns true if so, false otherwise
     */
    checkAction(action) {
        return this.currentState().checkAction(action);
    }
    /**
     * Helper to transition and then save a repair
     * @param {string} state: state to transition to
     * @param {Database} database: database to save to
     */
    transitionAndSave(state, database) {
        this.transitionState(state);
        database.save(this);
    }
}

