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
            "name":"pre-registered",
            "message": "Repair has pre-registered"
        },
        {
            "name":"register",
            "message": "Repair is being registered"
        },
        {
            "name":"triage",
            "message": "Please wait to be escorted to your repair station",
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
            "message": "Please collect your item, and report to checkout"
        },
        {
            "name":"completed",
            "message":"Your item is finished! Hurrah!"
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
        return State.AVAILABLE_STATES.map((item) => new State(item.name, item.message));
    }

    /**
     * Constructs a new state object.
     * @param name: name of the state
     * @param message: message supplied to the given stat
     */
    constructor(name, message) {
        super();
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