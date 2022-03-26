import {TEMPLATE} from "./list.template.js";
import {_data} from "../../data.js";

export let COMPONENT = {
    template: TEMPLATE,
    inject: ["repairs", "config"],
    props: ["advanced"],
    data() {
        return {"type":this.config.types[0], "search": {"filter": "", "selected": ""} };
    },
    computed: {
        subset() {
            let _self = this;
            return this.repairs.filter((repair) => {
                let match_types = (_self.search.selected === "" || _self.search.selected === repair.type);
                return match_types && repair.matches(_self.search.filter)
            });
        }
    }
}