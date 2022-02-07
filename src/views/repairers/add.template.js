export let TEMPLATE = `
    <form v-on:submit="addRepairer" class="form-group">
      <label for="name">Repairer Name:</label>
      <input name="name" type="text" v-model="name" class="form-control" />
      <label for="email">Repairer Email:</label>
      <input name="email" type="email"  v-model="email" class="form-control" />
      <label>Repairer Skills:</label>
      <div v-for="skill of Object.keys(skills)">
          <input name="{{ skill }}" type="checkbox" v-model="skills[skill]" />
          <label for="{{ skill }}">{{ skill }}</label>
      </div>
      <input type="submit" value="Add Repairer" class="btn btn-success" />
    </form>
`;