export let TEMPLATE =
`
<div>
    <search v-model="search" :options='[""].concat(config.types)' :options_label='"Type"'></search>
    <table class="table table-striped">
        <tr>
            <th>Repair Id</th>
            <th>Repairee Name</th>
            <th>State</th>
            <th>Item</th>
            <th></th>
            <th></th>
        </tr>
        <tr v-for="repair in subset" :key="repair.id" :class="repairStatusClass(repair)">
            <td>{{ repair.id }}</td>
            <td>{{ repair.name }}</td>
            <td>{{ repair.states[repair.stateIndex].name }}</td>
            <td>{{ repair.item || repair.states[repair.stateIndex].message }}</td>
            <td v-show="advanced">
                <button v-show="repair.stateIndex > 1 && !repair.isComplete()" v-on:click="print(repair)" class="w-100 btn btn-primary">Print</button>
            </td>
            <td v-show="advanced">
                <button v-show="repair.stateIndex <= 1" v-on:click="checkIn(repair)" class="w-100 btn btn-success">Check-In</button>
                <button v-show="repair.stateIndex >  1" :disabled="repair.isComplete()" v-on:click="closeRepair(repair)" class="w-100 btn btn-success">Check-Out</button>
            </td>
        </tr>
    </table>
</div>
`;
