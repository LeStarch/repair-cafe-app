
import { TEMPLATE } from "./summary.template.js"
import {_data} from "../../data.js";

export let COMPONENT = {
    data() {
        return {
            completeView: true,
            search: {"selected": "", "filter": ""}
    }},
    props: ["advanced"],
    inject: ["repairs", "config", "event_info", "local_data"],
    template: TEMPLATE,
    methods: {
        /**
         * Get the HTML class of a repair based on the its state in the database.
         * @returns {string}: "default", "success", or "danger" that maps to bootstrap classes
         */
        repairStatusClass(repair) {
            let suffix = "default";
            if (repair.stateIndex === 7) {
                suffix = "danger";
            } else if (repair.stateIndex >= 5) {
                suffix = "success";
            } else if (repair.stateIndex === 4) {
                suffix = "primary";
            }
            return "table-" + suffix;
        },
        /**
         * Print the repair
         * @param repair
         */
        print(repair) {
            _data.repair.print(repair, this.printer);
        },
        /**
         * Check in the repair
         * @param repair
         */
        checkIn(repair) {
            repair.transitionState("triage");
            _data.repair.save(repair);
        },
        /**
         * Check out the repair
         * @param repair
         */
        closeRepair(repair) {
            repair.closeRepair();
            _data.repair.save(repair);
        }
    },
    computed: {
        subset() {
            let _self = this;
            return this.repairs.filter((repair) => {
                let selected = (_self.search.selected === "" || _self.search.selected === repair.type);
                return selected && repair.matches(_self.search.filter)
            });
        }
    }
};
