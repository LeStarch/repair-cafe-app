export let TEMPLATE = `
<div>
    <search v-model="search" :options="[]"></search>
    <table class="table table-boardered">
        <tr>
            <th v-if="advanced">Select</th><th>Repairer</th>
            <th v-for="skill in config.skills">{{ skill }}</th>
        </tr>
        <tr v-for="repairer in repairers">
            <td v-if="advanced">
                <input type="checkbox" :data="repairer" :checked="assignees.indexOf(repairer.name) != -1" v-on:click="selected(repairer, $event)"/>
            </td>
            <td>{{ repairer.name }}</td>
            <td v-for="skill in config.skills" :class="(repairer.skills.indexOf(skill) != -1) ? 'table-success': 'table-danger'">
                {{ (repairer.skills.indexOf(skill) != -1) ? 'yes': 'no' }}
            </td>
        </tr>
    </table>
</div>
`;