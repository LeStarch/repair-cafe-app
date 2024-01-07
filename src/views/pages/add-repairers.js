import {TEMPLATE} from "./add-repairers.template.js"

export let COMPONENT = {
    template: TEMPLATE,
    data() {
        return {"repairer": null}
    },
    methods: {
        clearRepairer() {
            this.repairer = null;
        }
    }
};
