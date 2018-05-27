import {Config} from "./config"
export class App {
    /**
     * Register a bit of code that updates the time in the navigation bar
     */
    constructor() {
        this.Config = Config;
        setInterval(this.updateTime.bind(this),500);
    }
    /**
     *
     */
    configureRouter(config,router) {
        config.title = 'Repair Cafe Manager';
        config.map([
            { route: '',  moduleId: 'home', name: "home" },
            { route: 'repairs',  moduleId: 'repairs/repair-list', title: "Repair List", name: "repair-list" },
            { route: 'repairs/add',  moduleId: 'repairs/repair-add',  title: "Add a Repair", name: "repair-add" },
            { route: 'repairs/:id',  moduleId: 'repairs/repair-update', title: "Edit a Repair", name: "repair-update" },
            { route: 'repairers/add',  moduleId: 'repairers/repairer-add', title: "Add a Repairer", name: "repairer-add" },
            { route: 'repairs/summary',  moduleId: 'repairs/repair-summary', title: "Summary of Repairs", name: "repair-summary" },
            { route: 'repairs/checkout',  moduleId: 'repairs/repair-summary', title: "Checkout of Repairs", name: "repair-checkout",
                }
        ]);
        this.router = router;
    }
    /**
     * This function reads the new time as seen by the client, and shortens it
     * to fit will within the nav-bar
     */
    updateTime() {
        this.date = (""+ new Date()).replace(/[A-Z]{3}-\d{4}/,"");
    }
}
