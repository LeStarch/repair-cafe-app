import {TEMPLATE} from "./list.template.js";
import {_data} from "../../data.js";

export let COMPONENT = {
    template: TEMPLATE,
    props: ["repairs"],
    data() {
        return {"type": _data.config.types[0], "config": _data.config, "search": {"filter": "", "selected": ""} };
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
}