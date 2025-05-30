export let TEMPLATE = `
<div>
    <search v-model="search" :options="[]"></search>
    <table class="table table-boardered">
        <tr>
            <th>Select</th><th>Repairer</th><th>Team</th>
            <th v-for="skill in config.skills">{{ skill }}</th>
        </tr>
        <tr v-for="repairer in subset">
            <td v-if="advanced">
                <input type="checkbox" :value="repairer.name" v-model="checked" />
            </td>
            <td v-if="!advanced">
                <button v-on:click="update(repairer)" name="update" class="btn btn-success">Update</button>
            </td>
            <td>{{ repairer.name }}</td>
            <td>{{ repairer.team }}</td>
        </tr>
    </table>
</div>
`;