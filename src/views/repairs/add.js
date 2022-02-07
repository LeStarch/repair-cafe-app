import {TEMPLATE} from "./add.template.js"
import {Repair} from "../../models/repair.js";
import {_data} from "../../data.js";

export let COMPONENT = {
    template: TEMPLATE,
    data: function () {
        return {
            "name": "",
            "email": "",
            "type": this.config.types[0],
            "last_id": "unknown--1",
            "reserved": false,
        };
    },
    inject: ["config"],
    methods: {
        addRepair(event) {
            let _self = this;
            event.preventDefault();
            if (this.name === "" || this.email === "" || this.type === "") {
                return false;
            }
            let repair = new Repair(this.name, this.email, this.type, this.reserved);
            _data.repair.nextId(this.type).then( id => {
                repair.id = _self.type + "-" +id;
                _data.repair.save(repair);
                _self.last_id = repair.id;
            });
            /*document.getElementById("ticket-modal").modal();*/
            this.name = "";
            this.email = "";
            this.reserved = false;
            return false;
        }
    }
};
