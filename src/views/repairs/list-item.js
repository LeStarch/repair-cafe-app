
//import Vue from 'vue';

import { TEMPLATE } from "./list-item.template.js"
import { Repair } from "../../models/repair.js"
import {_data} from "../../data.js";

export let COMPONENT = {
    props: { "repair": Repair },
    data() {
        return {"config": _data.config}
    },
    template: TEMPLATE,
    methods: {
        /**
         * Get the HTML class of a repair based on the its state in the database.
         * @returns {string}: "default", "success", or "danger" that maps to bootstrap classes
         */
        stateClass(state) {
            return (state.progress === 'waiting') ? 'btn-danger' :
                ((state.progress === 'started') ? 'btn-primary' : 'btn-success');
        },
        /**
         * Update the repair to a given state.
         */
        update(event) {
            let command = event.target.getAttribute("name");
            // Route command
            if (command === "finish") {
                this.repair.finishRepair();
            } else if (command === "fail") {
                this.repair.failRepair();
            } else if (command === "move") {
                this.repair.transitionState();
            } else if (command === "delete") {
                _data.repair.delete(this.repair.id);
                return;
            }
            _data.repair.save(this.repair);
        }
    }
};
