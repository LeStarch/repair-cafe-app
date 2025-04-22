/**
 * @fileoverview implementation for the checkout widget
 * 
 * This file contains the implementation for the checkout widget. The implementation provides three actions to the end user:
 * 1. Fixed: the repair was successful
 * 2. Consulted: the repair ended with consultation (needed part, advice, etc.)
 * 3. Not Fixed: the repair was not successful
 * 
 * @author lestarch
**/
import { TEMPLATE } from "./checkout.template.js"
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
          this.repair.transitionAndSave(end_state, _data.repair);
      }
    }
};
