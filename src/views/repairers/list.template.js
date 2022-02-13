export let TEMPLATE = `
<div>
    <search v-model="search" :options="[]"></search>
    <h4>{{ selected }}</h4>
    <table class="table table-boardered">
        <tr>
            <th v-if="advanced">Select</th><th>Repairer</th>
            <th v-for="skill in config.skills">{{ skill }}</th>
        </tr>
        <tr v-for="repairer in subset">
            <td v-if="advanced">
                <input type="checkbox" :value="repairer.name" v-model="checked" />
            </td>
            <td>{{ repairer.name }}</td>
            <td v-for="skill in config.skills" :class="(repairer.skills.indexOf(skill) != -1) ? 'table-success': 'table-danger'">
                {{ (repairer.skills.indexOf(skill) != -1) ? 'yes': 'no' }}
            </td>
        </tr>
    </table>
</div>
`;