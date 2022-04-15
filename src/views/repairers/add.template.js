export let TEMPLATE = `
    <form v-on:submit="addRepairer" class="form-group">
        <label for="name">Repairer Name:</label>
        <input name="name" type="text" v-model="editing.name" class="form-control" />
        <label for="email">Repairer Email:</label>
        <input name="email" type="email"  v-model="editing.email" class="form-control" />
        <label for="type">Repairer Team:</label>
        <select name="type" v-model="editing.team" class="form-control">
            <option v-for="type of config.types" :value="type">{{ type }}</option>
        </select>
        <label>Repairer Skills:</label>
        <div v-for="skill of Object.keys(skills)">
            <input name="{{ skill }}" type="checkbox" v-model="skills[skill]" />
            <label for="{{ skill }}">{{ skill }}</label>
        </div>
        <input type="submit" value="Add Repairer" class="btn btn-success" />
    </form>
`;