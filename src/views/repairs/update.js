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
        let stand_in = new Repair().copy_from(this.repair);
        return {"editing": stand_in, "assignees": stand_in.repairers, "last_id": ""};
    },
    computed: {
        subtypes() {
            return this.config.COMMON_REPAIRS[(this.editing.type || "").toLowerCase()] || [];
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
        add() {
            let _self = this;
            // Guard against bad inputs
            if ((this.editing.name || "") === "" || (this.editing.type || "") === "" || (!this.editing.acknowledged)) {
                return;
            }
            // Build a new repair, copy in the submitted fields, request a new id, and save the final result
            let new_repair = new Repair().copy_from(this.editing);
            _data.repair.nextId(this.editing.type).then( id => {
                new_repair.id = new_repair.type + "-" +id;
                new_repair.stateIndex = 1;
                new_repair.transitionState();
                _data.repair.save(new_repair);
                _self.last_id = new_repair.id;
            });
            this.clear();
        },
        update() {
            this.editing.triageEntry();
            if (this.assignees.length > 0) {
                this.editing.assignRepairers(this.assignees);
            }
            _data.repair.save(this.editing);
            this.$emit("update:modelValue", null);
        },

        submit(event) {
            event.preventDefault();
            if (this.repair) {
                this.update();
            } else {
                this.add();
            }
            return false;
        },
        clear(event) {
            // Replace the stand-in repair's fields with an un-editied copy
            this.editing.copy_from(new Repair());
        },

        cancel(event) {
            this.$emit("update:modelValue", null);
        }
    }
};

