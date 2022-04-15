import {Repairer} from "../../models/repairer.js"
import {TEMPLATE} from "./add.template.js"
import {_data} from "../../data.js";

export let COMPONENT = {
    inject: ["config"],
    props: ["selected"],
    template: TEMPLATE,
    data: function () {
        return {
            "editing": new Repairer(),
            "skills": _data.config.skills.reduce((accum, item) => {
                accum[item] = false;
                return accum;
            }, {})
        };
    },
    watch: {
        selected(new_item, old_item) {
            this.editing.copy_from(new_item)
        }
    },
    methods: {
        addRepairer(event) {
            event.preventDefault();
            if (this.name === "" || this.team === "") {
                //TODO, error?
                return;
            }
            let skills = Object.keys(this.skills).filter((item) => { return this.skills[item]; });

            let repairer = this.editing;
            repairer.skills = skills;
            // ID is defined therefore repairer is an edit
            if (repairer.id) {
                _data.repairer.save(repairer);
                this.editing.copy_from(new Repairer());
            } else {
                _data.repairer.nextId().then(id => {
                    repairer.id = "repairer-" + id;
                    _data.repairer.save(repairer);
                    this.editing.copy_from(new Repairer());
                });
            }
        }
    }
};
