/**
 * @fileoverview implementation for the check-in widget
 * 
 * This file contains the implementation for the check-in widget. The implementation provides three actions to the end user:
 * 1. Check-in: check in the repair
 * 2. Print: print the repair
 * 
 * @author lestarch
**/
import { TEMPLATE } from "./check-in.template.js"
import { Repair } from "../../models/repair.js";
import {_data} from "../../data.js";


export let COMPONENT = {
    props: { "repair": Repair, "printer": Object},
    template: TEMPLATE,
    methods: {
        /**
         * Pull the repair out of registration and into the check-in state
         */
        checkIn() {
            this.repair.transitionAndSave("check-in", _data.repair);
        },
        /**
         * Finish the repair by transitioning to the named state
         * @param {string} end_state: end state name for this repair to move to 
         */
        print() {
            this.repair.transitionAndSave("triage", _data.repair);
            _data.repair.print(this.repair, this.printer);
        }
    }
};
