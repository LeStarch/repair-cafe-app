import {TEMPLATE} from "./list.template.js";

export let COMPONENT = {
    template: TEMPLATE,
    inject: ["repairers", "config"],
    props: ["advanced", "modelValue"],
    data() {
        return {
            "search": {"filter": "", "selected": ""}
        };
    },
    computed: {
        subset() {
            let _self = this;
            return this.repairers.filter((repairer) => {
                return repairer.matches(_self.search.filter);
            });
        },
        checked: {
            /**
             * Used when rendering, pulls from the bound-in property "selected" allowing child to access data
             * @returns: currently selected name list
             */
            get() {
                return this.modelValue;
            },
            /**
             * Used when updating, pulls in the set value allow us to emit it as an update event passing up to the next
             * level model.
             */
            set(values) {
                this.$emit("update:modelValue", values);
            }
        }
    },
    methods: {
        update(repairer) {
            this.$emit("update:modelValue", repairer);
        }
    }
}