/**
 * Status:
 *
 *  A generic class which reports status or state information regarding tickets.
 *  Since state information cannot be predicted ahead of time, it supplies a
 *  convience method which returns the correct subclass of the Status class for
 *  the given adaption.
 *
 *  Example: (repair cafe application) this would represent the status of the
 *           repair, including a message, and state name. Likely it will defer
 *           to the ConfigurablePipelineStatus to supply a list of states.
 *
 * @author lestarch
 */
export class Status {
    static newStatus() {
        //TODO: rewrite this to construct child classes not just configurable
        //child.
        return new ConfigurablePipelineStatus();
    }
}
/**
 * ConfigurablePipelineStatus:
 *
 *  A configurable version of the status used to create a basic pipeline of
 *  states with an optional non-pipeline end state representing worker orders
 *  not to be handled.
 *
 *  Example: (repair cafe application) this will be confiugred with the states:
 *            "check-in", "triage", "in-repair", "finished", and "checkout". It
 *            would have the out-of-band end state of "won't-fix".
 */
class ConfigurablePipelineStatus extends Status {
    //TODO: do this yo!
}
