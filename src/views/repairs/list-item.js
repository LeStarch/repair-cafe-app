
//import Vue from 'vue';

import { TEMPLATE } from "./list-item.template.js"
import { Repair } from "../../models/repair.js"
import {_data} from "../../data.js";
import { bootstrapEntryColor } from "../../utilities.js";

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
         * Queue the repair for processing.
         */
        queue() {
            // Invalidation must happen after transition otherwise transition will exit the invalidated state
            this.repair.transitionState("queued");
            this.repair.invalidate("in-repair");
            _data.repair.save(this.repair);
        },
        /**
         * Finishthe repair for processing.
         */
        finish() {
            this.repair.transitionAndSave("checkout", _data.repair);
        },
        /**
         * Update the repair adding information and assigning repairers
         */
        update() {
            this.$parent.$emit("update:modelValue", this.repair);
        },
        /**
         * Recalls the repair back to the in-repair state.
         */
        recall() {
            // Invalidation must happen after transition otherwise transition will exit the invalidated state
            this.repair.transitionState("in-repair");
            this.repair.invalidate("checkout");
            _data.repair.save(this.repair);
        },
        alert() {
            this.repair.alert = !this.repair.alert;
            _data.repair.save(this.repair);
        },
        stateClass(state) {
            // Waiting states should look dull
            if (state.progress == "waiting") {
                return "btn-secondary";
            }
            // Started states are bright
            else if (state.progress == "started") {
                let base_color = bootstrapEntryColor(state, "success");
                return `btn-${base_color}`;
            }
            // Finished states are green
            else if (state.progress == "finished") {
                let base_color = bootstrapEntryColor(state, "primary");
                return `btn-${base_color}`;
            }
        }

    },
};
