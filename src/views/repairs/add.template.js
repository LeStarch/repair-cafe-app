export let TEMPLATE = `
    <form v-on:submit="addRepair" class="form-group">
        <label for="name">Repairee Name:</label>
        <input name="name" type="text" v-model="name" class="form-control" />
        <label for="email">Repairee Email:</label>
        <input name="email" type="email" v-model="email" class="form-control" />
        <label for="type">Repair Type:</label>
        <select name="type" v-model="type" class="form-control">
            <option v-for="type of config.types" :value="type">{{ type }}</option>
        </select>
        <input type="checkbox" name="reserved" v-model="reserved" /><label for="reserved">Pre-Registered</label>
        <input type="submit" value="Add Repair" class="btn btn-success" />
        <div v-if='last_id !== "" && name === "" && email === ""' class="alert alert-success">
            <h4>Ticket Submitted: {{ last_id.replace("-", " #") }}</h4>
            <p>Ticket Number:
                <em>{{ last_id.replace("-", " #") }}</em>
                (Please note on physical ticket, if physical ticket present)</p>
        </div>
    </form>
`;