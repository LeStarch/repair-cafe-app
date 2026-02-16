import {TEMPLATE} from "./reports.template.js"

export let COMPONENT = {
    inject: ["repairs", "config"],
    data() {
        return {
            search: {"selected": "", "filter": "", "all": true},
        }
    },
    template: TEMPLATE,
    methods: {
        subseter(types) {
            let _self = this;
            return this.repairs.filter((repair) => {
                let selected = (types === "All Types" || types === repair.type);
                selected = selected && (_self.search.all || repair.checkAction("display"));
                return selected && repair.matches(_self.search.filter)
            });
        }
    },
    computed: {
        subset() {
            return this.subseter(this.search.selected);
        }
    }
};
