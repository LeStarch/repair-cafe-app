import 'bootstrap/dist/css/bootstrap.css';
import {Config} from "./config"
import {PLATFORM} from 'aurelia-pal';
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
            { route: '',  moduleId: PLATFORM.moduleName("home"), name: "home" },
            { route: 'repairs',  moduleId: PLATFORM.moduleName("repairs/repair-list"), title: "Repair List", name: "repair-list" },
            { route: 'repairs/add',  moduleId: PLATFORM.moduleName("repairs/repair-add"),  title: "Add a Repair", name: "repair-add" },
            { route: 'repairs/:id',  moduleId: PLATFORM.moduleName("repairs/repair-update"), title: "Edit a Repair", name: "repair-update" },
            { route: 'repairers/add',  moduleId: PLATFORM.moduleName("repairers/repairer-add"), title: "Add a Repairer", name: "repairer-add" },
            { route: 'repairs/summary',  moduleId: PLATFORM.moduleName("repairs/repair-summary"), title: "Summary of Repairs", name: "repair-summary" },
            { route: 'repairs/checkout',  moduleId: PLATFORM.moduleName("repairs/repair-summary"), title: "Checkout of Repairs", name: "repair-checkout",
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
