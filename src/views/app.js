/**
 * Entrypoint for the Vue application. This file is responsible for setting up the Vue application, registering
 * components, and mounting the application to the DOM.
 */
// Component import list
import {COMPONENT as REPAIR_SUMMARY_COMPONENT} from "./repairs/summary.js";
import {COMPONENT as REPAIR_LIST_ITEM_COMPONENT} from "./repairs/list-item.js";
import {COMPONENT as REPAIR_UPDATE_COMPONENT} from "./repairs/update.js";
import {COMPONENT as REPAIRER_ADD_COMPONENT} from "./repairers/add.js";
import {COMPONENT as REPAIR_LIST_COMPONENT} from "./repairs/list.js";
import {COMPONENT as REPAIRER_LIST_COMPONENT} from "./repairers/list.js";
import {COMPONENT as SEARCH_COMPONENT} from "./search.js";
import {COMPONENT as ADD_REPAIR_PAGE_COMPONENT} from "./pages/add-repairs.js";
import {COMPONENT as REG_REPAIR_PAGE_COMPONENT} from "./pages/register-repair.js";
import {COMPONENT as ADD_REPAIRER_PAGE_COMPONENT} from "./pages/add-repairers.js";
import {COMPONENT as MANAGE_COMPONENT} from "./pages/manage.js";
import {COMPONENT as NAV_COMPONENT} from "./navigation.js";
import {COMPONENT as PRINTER_LIST_ITEM_COMPONENT} from "./widgits/printer-item.js";
import {COMPONENT as EVENT_CONFIG_COMPONENT} from "./pages/event-config.js";
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
    app.component("repair-list", REPAIR_LIST_COMPONENT);
    app.component("search", SEARCH_COMPONENT);
    app.component("add-repair-page", ADD_REPAIR_PAGE_COMPONENT);
    app.component("reg-repair-page", REG_REPAIR_PAGE_COMPONENT);
    app.component("add-repairer-page", ADD_REPAIRER_PAGE_COMPONENT);
    app.component("repairer-list", REPAIRER_LIST_COMPONENT);
    app.component("manage", MANAGE_COMPONENT);
    app.component("printer-list-item", PRINTER_LIST_ITEM_COMPONENT)
    app.component("event-config", EVENT_CONFIG_COMPONENT);
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
            let _self = this;
            setInterval(() => {_self.date_now = new Date()}, 1000);
            // Origins used to dictate role
            let origins = {
                "#register": "Registeration",
                "#checkin": "Check-In",
                "#checkout": "Check-Out",
                "#triage": "Team Triage",
            }
            // Routes select views and are indexed by origin
            let routes = {
                "#home": {},
                "#register": {
                    "Home": "#home",
                    "Register": "#register",
                },
                "#checkin": {
                    "Home": "#home",
                    "Check-In": "#checkin",
                    "Add Repairer": "#repairers",
                    "Admin": "#event-config",
                },
                "#checkout": {
                    "Home": "#home",
                    "Check-Out": "#checkout",
                },
                "#triage": {
                    "Home": "#home",
                    "Team Triage": "#triage",
                    "Add Repairers": "#repairers",
                },
                
            }

            return {
                "date_now": new Date(),
                "repairs": [],
                "repairers": [],
                "config": _data.config,
                "roles": {
                    "role": window.location.hash,
                    "available_roles": origins,
                },
                "route": window.location.hash,
                "routes": routes,
                "event_info": _data.event_info,
                "local_data": _data.local
            };
        },
        provide() {
            return {
                "repairs": this.repairs,
                "repairers": this.repairers,
                "config": this.config,
                "route": this.route,
                "routes": this.routes,
                "roles": this.roles,
                "event_info": this.event_info,
                "local_data": this.local_data
            };
        },
        methods: {
            changeRole(destination) {
                window.location.hash = destination;
                this.roles.role = destination;
                this.route = destination;
                this.$emit("update:modelValue", destination);
            }
        },
        computed: {
            date_computed() {
                return ("" + this.date_now).replace(/[A-Z]{3}-\d{4}/,"");
            }
        }
    };
    // Setup application and instance
    let app = Vue.createApp(RepairApp);
    app.config.unwrapInjectedRef = true;
    register_components(app)
    let instance = build_app_instance(app);
}



