export let TEMPLATE =
`
<div>
    <div class="row" v-show="isCheckIn() || isCheckout()">
        <search class="col col-9" v-model="search" :options='[""].concat(config.types)' :options_label='"Type"'></search>
        <div class="col col-3 input-group">
            <label for="printer_select" class="input-group-text">Printer:</label>
            <select name="printer_select" v-show="isCheckIn()" v-model="local_data.printer" class="form-control" required>
                <option v-for="(printer, index) in event_info.printers" :value="printer">{{ index + 1}} ({{ printer.name }})</option>
            </select>
        </div>
    </div>
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
            <td v-show="isCheckout()">
                <checkout :repair="repair"></checkout>
            </td>
            <td v-show="isCheckIn()">
                <check-in :repair="repair" :printer="local_data.printer"></check-in>
            </td>
        </tr>
    </table>
</div>
`;

