export let COMPONENT = {
    inject: ["routes"],
    data() {
        return {"route": ""}
    },
    template: `
        <ul class="nav nav-tabs">
            <li class="nav-item"  v-for="(dest, label) in routes">
                <a class="nav-link" :class='{ "active": dest == route }' v-on:click='navigate(dest)'>{{ label }}</a>
            </li>
        </ul>`,
    methods: {
        navigate(destination) {
            this.$emit("update:modelValue", destination);
            this.route = destination;
        }
    }
};
