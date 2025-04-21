
//import Vue from 'vue';

import { TEMPLATE } from "./printer-item.template.js"
import {_data} from "../../data.js";

export let COMPONENT = {
    props: { "printer": Object},
    data: function() {
        return {"editing": false}
    },
    template: TEMPLATE
};
