export let COMPONENT = {
    props: {"options": Array, "options_label": String, "use_all": Boolean},
    data() {
        return {
            "local_selected": (this.options.length === 0) ? null : this.options[0],
            "local_filter": "",
            "local_all": false
        }
    },
    created() {this.update(null);},
    template: `
        <div class="w-100 d-inline d-inline-flex input-group">
            <div class="d-inline-flex flex-shrink">
                <label v-if="options.length > 0" for="options_select" class="input-group-text">{{ options_label }}</label>
                <select v-if="options.length > 0" name="options_select" v-model="local_selected" @input="update($event)" class="form-control">
                    <option v-for="type in options">{{ type }}</option>
                </select>
            </div>
            <label for="filter" class="input-group-text">Search</label>
            <input name="filter" v-model="local_filter" class="flex-grow-1 form-control" @input="update($event)" />
            <div class="d-inline-flex flex-shrink">
                <label for="all" v-if="use_all" class="input-group-text">All</label>
                <input name="all" v-if="use_all" v-model="local_all" class="form-control" type="checkbox" @input="update($event)" />
            </div>
        </div>`,
    methods: {
        update(event) {
            let data = {"filter": this.local_filter, "selected": this.local_selected, "all": this.local_all};
            if (event != null && event.target.name === "options_select") {
                data.selected = event.target.value;
            } else if (event != null && event.target.name === "all") {
                data.all = event.target.checked;
            } else if (event != null) {
                data.filter = event.target.value;
            }
            this.$emit("update:modelValue", data);
        }
    }
};