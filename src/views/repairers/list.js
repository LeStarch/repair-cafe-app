import {TEMPLATE} from "./list.template.js";

export let COMPONENT = {
    template: TEMPLATE,
    inject: ["repairers", "config"],
    props: ["advanced"],
    data() {
        return {"search": {"filter": "", "selected": ""} };
    },
    computed: {
        subset() {
            let _self = this;
            return this.repairers.filter((repairer) => {
                return repairer.matches(_self.search.filter);
            });
        }
    }
}