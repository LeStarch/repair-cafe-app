export let TEMPLATE = `<div>
    <form v-on:submit="update">
      <label for="name">Repairee Name:</label>
      <input name="name" type="text" v-model="repair.name" disabled class="form-control" />
      <label for="email">Repairee Email:</label>
      <input name="email" type="email" v-model="repair.email" disabled class="form-control" />
      <label for="type">Repair Type:</label>
      <input name="type" v-model="repair.type" disabled class="form-control" />
      <label for="item">Repair Item:</label>
      <input name="item" type="text" v-model="item" class="form-control" />
      <label for="description">Repair Description:</label>
      <textarea name="desc" v-model="description" class="form-control" rows=3></textarea>
      <h4>Select Repairer(s):</h4>
      <table class="table table-boardered">
          <tr>
              <th>Select</th><th>Repairer</th>
              <th v-for="skill in config.skills">{{ skill }}</th>
          </tr>
          <tr v-for="repairer in repairers">
              <td><input type="checkbox" :data="repairer" :checked="assignees.indexOf(repairer.name) != -1" v-on:click="selected(repairer, $event)"/></td>
              <td>{{ repairer.name }}</td>
              <td v-for="skill in config.skills" :class="(repairer.skills.indexOf(skill) != -1) ? 'table-success': 'table-danger'">
                  {{ (repairer.skills.indexOf(skill) != -1) ? 'yes': 'no' }}
              </td>
          </tr>
      </table>
      <input type="submit" value="Update Repair" class="btn btn-success" />
    </form>
  </div>`;