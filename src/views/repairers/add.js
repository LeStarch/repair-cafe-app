import {Repairer} from "../../models/repairer.js"
import {TEMPLATE} from "./add.template.js"
import {_data} from "../../data.js";

export let COMPONENT = {
    template: TEMPLATE,
    data: function () {
        return {
            "name": "",
            "email": "",
            "skills": _data.config.skills.reduce((accum, item) => {
                accum[item] = false;
                return accum;
            }, {})
        };
    },
    methods: {
        addRepairer(event) {
            event.preventDefault();
            if (this.name === "" || this.email === "") {
                //TODO, error?
                return;
            }
            let skills = Object.keys(this.skills).filter((item) => { return this.skills[item]; });

            var repairer = new Repairer(this.name,this.email, skills);
            _data.repairer.nextId().then( id => {
                repairer.id = "repairer-" +id;
                _data.repairer.save(repairer);
            });

            this.name = "";
            this.email = "";
        }
    }
};
