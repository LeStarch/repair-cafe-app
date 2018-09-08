import {Client} from "models/client"
import {Worker} from "models/worker"
import {Lifecycle} from "models/lifecycle"
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
        this.lifecycle = Lifecycle.newObject();
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
