import {Repairer} from "../../models/repairer.js"
import {TEMPLATE} from "./add.template.js"
import {_data} from "../../data.js";

export let COMPONENT = {
    inject: ["config"],
    props: ["selected"],
    template: TEMPLATE,
    data: function () {
        return {
            "editing": new Repairer()
        };
    },
    watch: {
        selected(new_item, old_item) {
            this.assign_from_repair(new_item);
        }
    },
    computed: {
        submitButtonText() {
            return (this.editing.id) ? "Update Repairer" : "Add Repairer";
        }
    },
    methods: {
        clear(event) {
            this.assign_from_repair();
            this.$emit("cleared");
        },
        addRepairer(event) {
            event.preventDefault();
            if (this.editing.name === "" || this.editing.team === "") {
                return;
            }
            // ID is defined therefore repairer is an edit
            if (this.editing.id) {
                console.assert(this.selected != null, "When active repairer has ID selected must be valid");
                this.selected.copy_from(this.editing);
                _data.repairer.save(this.selected);
                this.clear();
            } else {
                let repairer = new Repairer();
                repairer.copy_from(this.editing);
                _data.repairer.nextId().then(id => {
                    repairer.numerical_id = id;
                    repairer.id = "repairer-" + id;
                    _data.repairer.save(repairer);
                    this.clear();
                });
            }
        },
        assign_from_repair(repair) {
            repair = (typeof(repair) !== "undefined" && repair != null) ? repair : new Repairer();
            this.editing.copy_from(repair);
        }
    }
};
