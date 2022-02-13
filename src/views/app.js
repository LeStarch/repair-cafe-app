import {COMPONENT as REPAIR_SUMMARY_COMPONENT} from "./repairs/summary.js";
import {COMPONENT as REPAIR_LIST_ITEM_COMPONENT} from "./repairs/list-item.js";
import {COMPONENT as REPAIR_UPDATE_COMPONENT} from "./repairs/update.js";
import {COMPONENT as REPAIRER_ADD_COMPONENT} from "./repairers/add.js";
import {COMPONENT as REPAIR_ADD_COMPONENT} from "./repairs/add.js";
import {COMPONENT as REPAIR_LIST_COMPONENT} from "./repairs/list.js";
import {COMPONENT as REPAIRER_LIST_COMPONENT} from "./repairers/list.js";
import {COMPONENT as SEARCH_COMPONENT} from "./search.js";
import {COMPONENT as ADD_REPAIR_PAGE_COMPONENT} from "./pages/add-repairs.js";
import {COMPONENT as ADD_REPAIRER_PAGE_COMPONENT} from "./pages/add-repairers.js";
import {COMPONENT as MANAGE_COMPONENT} from "./pages/manage.js";
import {COMPONENT as NAV_COMPONENT} from "./navigation.js";

import {TEMPLATE as APP_TEMPLATE} from "./app.template.js"

import {_data, setupData} from "../data.js";

/**
 * Register components to the supplied application object. Returns that object to allow the chaining/builder pattern.
 * @param app: application object to register components with
 */
function register_components(app) {
    app.component("repair-summary", REPAIR_SUMMARY_COMPONENT);
    app.component("repair-list-item", REPAIR_LIST_ITEM_COMPONENT);
    app.component("repair-update", REPAIR_UPDATE_COMPONENT);
    app.component("repairer-add", REPAIRER_ADD_COMPONENT);
    app.component("repair-add", REPAIR_ADD_COMPONENT);
    app.component("repair-list", REPAIR_LIST_COMPONENT);
    app.component("search", SEARCH_COMPONENT);
    app.component("add-repair-page", ADD_REPAIR_PAGE_COMPONENT);
    app.component("add-repairer-page", ADD_REPAIRER_PAGE_COMPONENT);
    app.component("repairer-list", REPAIRER_LIST_COMPONENT);
    app.component("manage", MANAGE_COMPONENT);
    app.component("navigation", NAV_COMPONENT);
}

/**
 * Mounts the application, sets up the databases to use the apps local data cache, and returns the instance.
 * @param app: application to mount into an instantiation
 * @returns mounted instance of the given application
 */
function build_app_instance(app) {
    let instance = app.mount("#repair-app");
    setupData(instance.repairs, instance.repairers);
    return instance;
}



/**
 * Setup the vue application and route the Vue data cache into the database instances.
 * @param element: element to mount the application into
 * @returns {{repairs: [], repairers: []}}
 */
export function setup(element) {
    // Initial data and application creation
    const RepairApp = {
        template: APP_TEMPLATE,
        data() {
            return {
                "repairs": [],
                "repairers": [],
                "config": _data.config,
                "route": window.location.hash
            };
        },
        provide() {
            let routes = {
                "Start Here": "",
                "Check-In": "#add",
                "Team Triage": "#manage",
                "Check-Out": "#summary",
                "Add Repairers": "#repairers"
            };
            return {
                "repairs": this.repairs,
                "repairers": this.repairers,
                "config": this.config,
                "route": this.route,
                "routes": routes
            };
        }
    };
    // Setup application and instance
    let app = Vue.createApp(RepairApp);
    app.config.unwrapInjectedRef = true;
    register_components(app)
    let instance = build_app_instance(app);
}



