
import { TEMPLATE } from "./summay.template.js"
import {_data} from "../../data.js";

export let COMPONENT = {
    data() {
        return {
            completeView: true,
            search: {"selected": "", "filter": ""}
    }},
    props: ["advanced"],
    inject: ["repairs", "config"],
    template: TEMPLATE,
    methods: {
        /**
         * Get the HTML class of a repair based on the its state in the database.
         * @returns {string}: "default", "success", or "danger" that maps to bootstrap classes
         */
        repairStatusClass(repair) {
            let suffix = "default";
            if (repair.stateIndex === 6) {
                suffix = "danger";
            } else if (repair.stateIndex >= 4) {
                suffix = "success";
            } else if (repair.stateIndex === 3) {
                suffix = "primary";
            }
            return "table-" + suffix;
        },
        /**
         * Check in the repair
         * @param repair
         */
        checkIn(repair) {
            repair.transitionState();
            repair.transitionState();
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
