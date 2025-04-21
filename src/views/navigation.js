/**
 * Navigation component for the application
 * 
 * Navigation is driven based on the origin (original #anchor) of the page. Each origin has a set of routes it displays
 * and allows. Navigation to HOME will provide a directory of links to other #anchors.
 * 
 * The original #anchor is akin to a user's role.
 */
export let COMPONENT = {
    inject: ["routes", "roles"],
    data() {
        return {"route": ""}
    },
    template: `
        <ul class="nav nav-tabs">
            <li class="nav-item"  v-for="(dest, label) in routes[roles.role]">
                <a class="nav-link" :class='{ "active": dest == route }'
                   v-on:click='navigate(dest)'>{{ label }}</a>
            </li>
        </ul>`,
    methods: {
        navigate(destination) {
            this.$emit("update:modelValue", destination);
            this.route = destination;
        }
    }
};
