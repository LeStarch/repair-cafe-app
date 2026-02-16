/**
 * @fileoverview implementation for the management widget
 * 
 * This file contains the implementation for the management widget. The implementation provides five actions to the end user:
 * 1. Delete: the repair is deleted from the system
 * 2. Fixed: the repair was successful
 * 3. Consulted: the repair ended with consultation (needed part, advice, etc.)
 * 4. No Time: the repair was not completed due to time constraints
 * 5. Unfixable: the repair was not successful and is not expected to be successful in the future
 * 
 * @author lestarch
**/
import { TEMPLATE } from "./manage-repair.template.js"
import { Repair } from "../../models/repair.js";
import {_data} from "../../data.js";


export let COMPONENT = {
    props: { "repair": Repair},
    template: TEMPLATE,
    methods: {
      /**
       * Finish the repair by transitioning to the named state
       * @param {string} end_state: end state name for this repair to move to 
       */
      finish(end_state) {
        if (end_state === "delete") {
            _data.repair.delete(this.repair.id);
        } else {
            this.repair.transitionAndSave(end_state, _data.repair);
        }
      }
    }
};
