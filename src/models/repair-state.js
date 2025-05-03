/***
 * models/repair-state.js:
 *
 * Contains the data representing a repair's state.
 */
import {Marshallable} from "./marshall.js"

/**
 * State of a given repair with enter and exit timestamps to track how long a repair was in a given state. This allows
 * a repair to track progress.
 */
export class State extends Marshallable {
    static MARSHALL_FIELDS = ["name", "message", "progress", "time", "enter", "exit"];
    static AVAILABLE_STATES = [
        {
            "name":"register",
            "message": "Repair has been registered!",
            "actions": [
                "check-in"
            ]
        },
        {
            "name":"check-in",
            "message": "Repair must be checked in. Please see front desk.",
            "actions": [
                "print"
            ]
        },
        {
            "name":"triage",
            "message": "Please go to your repair station, or ask a runner for help!",
            "actions": [
                "reprint",
                "check-out",
                "triage"
            ]
        },
        {
            "name":"queued",
            "message":"Waiting for next suitable repairer",
            "actions": [
                "reprint",
                "check-out",
                "triage"
            ]
        },
        {
            "name":"in-repair",
            "message":"Attempting to repair item",
            "actions": [
                "reprint",
                "check-out",
                "triage"
            ]
        },
        {
            "name":"checkout",
            "message": "Please collect your item, and report to checkout table.",
            "actions": [
                "revoke",
                "check-out"
            ]
        },
        {
            "name":"fixed",
            "message":"Your item is finished! Hurrah!"
        },
        {
            "name":"consulted",
            "message":"Your had a consultation!"
        },
        {
            "name":"no-time",
            "message":"We ran out of time. C'est La Vie!"
        },
        {
            "name":"unfixable",
            "message": "Lamentably, we were unable to fix this item despite legendary effort and great loss of blood, sweat, and tears."
        }
    ];

    /**
     * Create a list of state objects from the available states array.
     */
    static newStateList() {
        return State.AVAILABLE_STATES.map((item) => new State(item.name, item.message, item.actions));
    }

    /**
     * Constructs a new state object.
     * @param name: name of the state
     * @param message: message supplied to the given stat
     */
    constructor(name, message, actions) {
        super();
        this.name = name;
        this.message = message;
        this.progress = "waiting";
        this.time = 0;
        this.enterTime = new Date();
        this.exitTime = new Date("1900-01-01");
        this.actions = actions || [];
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
    /**
     * Check if the supplied action is available for this state.
     * @param {string} action 
     * @returns true if so, false otherwise
     */
    checkAction(action) {
        return this.actions.indexOf(action) > -1;
    }
}