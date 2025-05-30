
import { TEMPLATE } from "./summary.template.js"
import { bootstrapEntryColor } from "../../utilities.js";

export let COMPONENT = {
    data() {
        return {
            completeView: true,
            search: {"selected": "", "filter": "", "all": false},
            alertClass: "table-danger",
    }},
    mounted() {
        setInterval(() => {
            this.alertClass = (this.alertClass === "table-danger") ? "" : "table-danger";
        }, 1000);
    },
    props: ["advanced"],
    inject: ["repairs", "config", "event_info", "local_data", "roles"],
    template: TEMPLATE,
    methods: {
        /**
         * Get the HTML class of a repair based on the its state in the database.
         * @returns {string}: "default", "success", or "danger" that maps to bootstrap classes
         */
        repairStatusClass(repair) {
            let suffix = bootstrapEntryColor(repair.currentState(), "default");
            let className = "table-" + suffix;
            // If the repair has been alerted then add the alert visual
            if (repair.alert) {
                return [className, this.alertClass];
            }
            return [className];
        },
        isCheckout() {
            return this.roles.role === "#checkout";
        },
        isCheckIn() {
            return this.roles.role === "#checkin";
        }
    },
    computed: {
        subset() {
            let _self = this;
            return this.repairs.filter((repair) => {
                let selected = (_self.search.selected === "All Types" || _self.search.selected === repair.type);
                selected = selected && (_self.search.all || repair.checkAction("display"));
                return selected && repair.matches(_self.search.filter)
            });
        }
    }
};
