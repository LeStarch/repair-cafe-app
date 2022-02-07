import {Repair} from "../../models/repair.js"
import {TEMPLATE} from "./update.template.js";
import {_data} from "../../data.js";

/**
 *A form enabling the update of the repair
 * @author lestarch
 */
export let COMPONENT = {
    props: {
        "repair": Repair,
    },
    inject: ["config", "repairers"],
    template: TEMPLATE,
    data() {
        return {
            item: (this.repair.stateIndex < 2) ? "" : this.repair.item,
            description:  (this.repair.stateIndex < 2) ? "" : this.repair.description,
            assignees: [...this.repair.repairers],
        };
    },
    methods: {
        selected(repairer, event) {
            if (event.target.checked) {
                this.assignees.push(repairer.name);
            } else {
                this.assignees.remove(repairer.name);
            }
            return true;
        },
        update(event) {
            event.preventDefault();
            this.repair.triageEntry(this.item, this.description);
            if (this.assignees.length > 0) {
                this.repair.assignRepairers(this.assignees);
            }
            _data.repair.save(this.repair);
            return false;
        }
    }
};

