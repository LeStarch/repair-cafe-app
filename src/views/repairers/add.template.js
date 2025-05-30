export let TEMPLATE = `
    <form v-on:submit="addRepairer" class="form-group">
        <label for="name">Repairer Name:</label>
        <input name="name" type="text" v-model="editing.name" class="form-control" />
        <label for="type">Repairer Team:</label>
        <select name="type" v-model="editing.team" class="form-control">
            <option v-for="type of config.types" :value="type">{{ type }}</option>
        </select>
        <label for="email">Repairer Email: (Optional)</label>
        <input name="email" type="email"  v-model="editing.email" class="form-control" />
        <input type="submit" :value="submitButtonText" class="btn btn-success" />
        <input type="button" value="Clear" class="btn btn-danger" @click="clear" />
    </form>
`;