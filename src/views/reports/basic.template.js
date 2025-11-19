export let TEMPLATE=`
    <div class="row">
        <div class="col col-sm-6">
            <h3>Repairs</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="state in repairs[0].states">
                        <td>{{state.name}}</td>
                        <td>{{repairsAt(state.name)}}</td>
                    </tr>
                    <tr><td><em>Total</em></td><td>{{repairs.length}}</td></tr>
                </tbody>
            </table>
        </div>
        <div class="col col-sm-6" >
            <h3>Repair Resolution</h3>
            <canvas id="donut">
            </canvas>
            <span hidden>{{chart}}</span>
        </div>
    </div>
`;
