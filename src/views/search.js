export let COMPONENT = {
    props: {"options": Array, "options_label": String, "selected": String, "filter": String},
    data() {
        return {"local_selected": (this.options.length === 0) ? null : this.options[0], "local_filter": ""}
    },
    created() {this.update(null);},
    template: `
        <div class="input-group">
            <label v-if="options.length > 0" for="options_select" class="input-group-text">{{ options_label }}</label>
            <select v-if="options.length > 0" name="options_select" v-model="local_selected" @input="update($event)" class="form-control">
                <option v-for="type in options">{{ type }}</option>
            </select>
            <label for="filter" class="input-group-text">Search</label>
            <input name="filter" v-model="local_filter" class="form-control" @input="update($event)" />
        </div>`,
    methods: {
        update(event) {
            let data = {"filter": this.local_filter, "selected": this.local_selected};
            if (event != null && event.target.name === "options_select") {
                data.selected = event.target.value;
            } else if (event != null) {
                data.filter = event.target.value;
            }
            this.$emit("update:modelValue", data);
        }
    }
};