/**
 * State:
 *
 *  Represents a state in the lifecycle of a ticket. Contains time-in, time-out,
 *  a name, and a message for the state.
 *
 *  Example: (repair cafe application) this represents one state like "triage",
 *           and the time it entered and exited this state.
 * @author lestarch
 */
export class State {
    /**
     * Builds a state from the given name setting the time-in, and time-out
     * values to null. Name and message must be supplied.
     * @param name: name of the state
     * @param message: description or message of this state
     */
    constructor(name, message) {
        this.name = name;
        this.message = message;
        this.time_in = null;
        this.time_out = null;
    }
    /**
     * Enter this state, setting the time in to "now" based on the system time.
     * For post-analysis, this depends on accurate shared notion of time.
     * @param reenter: reenter this state, updating time_in, setting time_out to
     *                 back to null.
     */
    enter(reenter) {
        //Enter this state
        if (this.time_in == null || reenter) {
            this.time_in = new Date();
            this.time_out = null;
        }
    }
    /**
     * Exit this state, setting the time out to "now" based on the system time.
     * For post-analysis, this depends on accurate shared notion of time.
     */
    exit() {
        //Exit this state
        if (this.time_out == null) {
            this.time_out = new Date();
        }
    }
    /**
     * Get the name of the this state.
     * @return name: name of the state
     */
    getName() {
        return this.name;
    }
    /**
     * Get the message of the this state.
     * @return message: message of the state
     */
    getMessage() {
        return this.message;
    }
    /**
     * Get the time_in (time entered) of the this state.
     * @return time_in: time_in of the state
     */
    getTimeIn() {
        return this.time_in;
    }
    /**
     * Get the time_out (time exited) of the this state.
     * @return time_out: time_out of the state
     */
    getTimeOut() {
        return this.time_out;
    }
}
