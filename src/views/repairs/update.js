import {Repair} from "../../models/repair.js"
import {TEMPLATE} from "./update.template.js";
import {_data} from "../../data.js";

/**
 *A form enabling the update of the repair
 * @author lestarch
 */
export let COMPONENT = {
    inject: ["config", "repairers"],
    props: ["repair"],
    template: TEMPLATE,
    data() {
        return {
            item: (this.repair.stateIndex < 2) ? "" : this.repair.item,
            subtype: this.repair.subtype,
            description:  (this.repair.stateIndex < 2) ? "" : this.repair.description,
            assignees: [...this.repair.repairers],
        };
    },
    computed: {
        subtypes() {
            return this.config.COMMON_REPAIRS[this.repair.type.toLowerCase()];
        }
    },
    methods: {
        selected(repairer, event) {
            if (event.target.checked) {
                this.assignees.push(repairer.name);
            } else {
                let new_items = this.assignees.filter((item) => item !== repairer.name);
                this.assignees.splice(0, this.assignees.length, new_items);
            }
            return true;
        },
        update(event) {
            event.preventDefault();
            this.repair.triageEntry(this.item, this.description);
            if (this.assignees.length > 0) {
                this.repair.assignRepairers(this.assignees);
            }
            this.repair.setSubtype(this.subtype);
            _data.repair.save(this.repair);
            this.$emit("update:modelValue", null);
            return false;
        },
        cancel(event) {
            this.$emit("update:modelValue", null);
        }
    }
};

