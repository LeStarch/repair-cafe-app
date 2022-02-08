import {TEMPLATE} from "./manage.template.js"
import {_data} from "../../data.js";

export let COMPONENT = {
    data() {
        return {"repair": null}
    },
    template: TEMPLATE,
    /*computed: {
        repair() {
            if (this.repair_id === -1) {
                return null;
            }
            return _data.repair.get(this.repair_id);
        }
    }*/
};
