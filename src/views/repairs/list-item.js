
//import Vue from 'vue';

import { TEMPLATE } from "./list-item.template.js"
import { Repair } from "../../models/repair.js"
import {_data} from "../../data.js";

export let COMPONENT = {
    props: { "repair": Repair, "advanced": Boolean },
    data() {
        return {"editing": null};
    },
    inject: ["config"],
    template: TEMPLATE,
    methods: {
        /**
         * Get the HTML class of a repair based on the its state in the database.
         * @returns {string}: "default", "success", or "danger" that maps to bootstrap classes
         */
        stateClass(state) {
            if (state.name === "pre-registered" && !this.repair.reserved) {
                return "btn-danger";
            }
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
            } else if (command === "update") {
                this.$parent.$emit("update:modelValue", this.repair);
                return; // Save done in editing box
            }
            _data.repair.save(this.repair);
        },
        /**
         * Return the bootstrap color for this state
         * 
         * Returns the bootstrap color for this state when this state has been entered.
         * 
         * @returns {string} bootstrap color for this state
         */
        bootstrapEntryColor(state, defaultColor) {
            if (state.name == "fixed") {
                return "success";
            } else if (state.name == "consulted") {
                return "info";
            } else if (state.name == "no-time") {
                return "warning";
            } else if (state.name == "unfixable") {
                return "danger";
            }
            return defaultColor;
        },
        stateClass(state) {
            // Waiting states should look dull
            if (state.progress == "waiting") {
                return "btn-secondary";
            }
            // Started states are bright
            else if (state.progress == "started") {
                let base_color = this.bootstrapEntryColor(state, "success");
                return `btn-${base_color}`;
            }
            // Finished states are green
            else if (state.progress == "finished") {
                let base_color = this.bootstrapEntryColor(state, "primary");
                return `btn-${base_color}`;
            }
        }

    },
};
