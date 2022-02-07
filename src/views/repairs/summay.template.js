export let TEMPLATE =
`
<div>
    <table class="table table-striped">
        <tr>
            <th>Repair Id</th>
            <th>Repairee Name</th>
            <th>State</th>
            <th>Item</th>
            <th v-show="config.ADVANCED">
                <search v-model="search" :options='[""].concat(config.types)' :options_label='"Repair Type"'></search>
            </th>
        </tr>
        <tr v-for="repair in subset" :key="repair.id" :class="repairStatusClass(repair)">
            <td>{{ repair.id }}</td>
            <td>{{ repair.name }}</td>
            <td>{{ repair.states[repair.stateIndex].name }}</td>
            <td>{{ repair.item }}</td>
            <td v-show="config.ADVANCED">
                <button v-on:click="repair.closeRepair()" class="btn btn-primary">Check-Out</button>
            </td>
        </tr>
    </table>
</div>
`;

