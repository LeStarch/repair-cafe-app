import {inject} from "aurelia-framework";
import {Container} from 'aurelia-dependency-injection'
import {Config} from "config";
/**
 * App:
 *
 * JavaScript supporting the single-page App. This must setup the router to
 * ensure that navigation works.
 *
 * @author lestarch
 */
 @inject(Config)
export class App {
    /**
     * Configuration injection location, allowing configuration to be injected
     * into this application.
     */
    constructor(config) {
        this.CONFIG = config;
    }
    /**
     * Router configuration setup.
     */
    configureRouter(config, router) {
        config.title = this.CONFIG.APP_TITLE;
        config.map([
            {route: "", moduleId: "root.html", name: "root"},
            {
                route: "tickets/add",
                moduleId: "views/tickets/edit-ticket",
                title: this.CONFIG.APP_TITLE + " - " +
                       this.CONFIG.TICKET_DISPLAY,
                name: "add-ticket"
            }
/*            { route: '',  moduleId: 'home', name: "home" },
            { route: 'repairs',  moduleId: 'repairs/repair-list', title: "Repair List", name: "repair-list" },
            { route: 'repairs/add',  moduleId: 'repairs/repair-add',  title: "Add a Repair", name: "repair-add" },
            { route: 'repairs/:id',  moduleId: 'repairs/repair-update', title: "Edit a Repair", name: "repair-update" },
            { route: 'repairers/add',  moduleId: 'repairers/repairer-add', title: "Add a Repairer", name: "repairer-add" },
            { route: 'repairs/summary',  moduleId: 'repairs/repair-summary', title: "Summary of Repairs", name: "repair-summary" },
            { route: 'repairs/checkout',  moduleId: 'repairs/repair-summary', title: "Checkout of Repairs", name: "repair-checkout",*/
        ]);
        this.router = router;
    }
}
