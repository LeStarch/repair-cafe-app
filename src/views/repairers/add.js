import {Repairer} from "../../models/repairer.js"
import {TEMPLATE} from "./add.template.js"
import {_data} from "../../data.js";

/**
 * Generate a renderable skills model set to false or from the list specified in base_list.
 * @param base_list list of skills
 * @returns: dictionary of skill to boolean for visualizing
 */
function generate_skills_model(base_list) {
    return _data.config.skills.reduce((accum, item) => {
        accum[item] = (typeof(base_list) != "undefined") ? (base_list.indexOf(item) !== -1) : false;
        return accum;
    }, {})
}

export let COMPONENT = {
    inject: ["config"],
    props: ["selected"],
    template: TEMPLATE,
    data: function () {
        return {
            "editing": new Repairer(),
            "skills": generate_skills_model()
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
                //TODO, error?
                return;
            }
            let skills = Object.keys(this.skills).filter((item) => { return this.skills[item]; });
            // ID is defined therefore repairer is an edit
            if (this.editing.id) {
                console.assert(this.selected != null, "When active repairer has ID selected must be valid");
                this.selected.copy_from(this.editing);
                this.selected.skills = skills;
                _data.repairer.save(this.selected);
                this.clear();
            } else {
                let repairer = new Repairer();
                repairer.copy_from(this.editing);
                repairer.skills = skills;
                _data.repairer.nextId().then(id => {
                    repairer.id = "repairer-" + id;
                    _data.repairer.save(repairer);
                    this.clear();
                });
            }
        },
        assign_from_repair(repair) {
            repair = (typeof(repair) !== "undefined" && repair != null) ? repair : new Repairer();
            this.editing.copy_from(repair);
            Object.assign(this.skills, generate_skills_model(repair.skills));
        }
    }
};
