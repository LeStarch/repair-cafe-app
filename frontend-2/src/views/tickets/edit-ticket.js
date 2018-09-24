import {bindable, inject} from 'aurelia-framework';
import {Config} from "config";
import {Ticket} from "models/ticket";
import {DB} from "database/db"

/**
 * EditTicketView:
 *
 * A view used to add/edit the ticket. This enables a deployment to use the same
 * screen for adding and editing tickets. It also means that the workflow can
 * be compartementialized such that editing of the full ticket data can be done
 * in various stages.
 *
 * @author lestarch
 */
 @inject(Config, DB)
export class EditTicketCustomElement {
    @bindable ticket; //Ticket, bound-in for edits and constructed for adds.
    @bindable minimal; //bool, bound-in to display minimally or not.
    /**
     * Used to setup the new ticket to be submitted into the system. Injects
     * @param config: configuration object to use
     * @param db: database API to inject
     */
    constructor(config, db) {
        this.CONFIG = config;
        this.db = db;
        this.submit_msg = "Update " + this.CONFIG.TICKET_DISPLAY;
        this.adding = false;
    }
    /**
     * Used to setup a new ticket VS use the bound object.
     */
    activate() {
        //Check if the ticket is undefined or null, then construct a new one
        if (typeof(this.ticket) === "undefined" || this.ticket == null) {
            this.ticket = new Ticket();
            this.submit_msg = "Add " + this.CONFIG.TICKET_DISPLAY;
            this.adding = true;
        }
    }
    /**
     * Submits the ticket after add/edit
     */
    submit() {
        //Loop back if adding tickets
        if (this.adding) {
            this.db.getNewId(this.ticket.order.type).then(
                this.finalize.bind(this));
        } else {
            //TODO: route back
            alert("Loop-back!");
        }
    }
    /**
     * Finalizes the submission, by taking in the identification supplied by the
     * system and adds it to the outgoing ticket. Then forwards that ticket
     * along to the database with the ID.
     * @param id: identification supplied back by the system
     */
    finalize(id) {
        this.ticket.id = id;
        this.db.saveObject(this.ticket);
        this.ticket = new Ticket();
    }
}
