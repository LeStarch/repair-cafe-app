export let TEMPLATE=`
    <div class="row">
        <div class="col col-sm-6">
            <h3>{{ title }}</h3>
            <table class="table" v-if="repairs && repairs.length > 0">
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
                    <tr></td><td></tr>
                    <!--tr><td>Mean Wait Time</td><td>{{ meanWait }} Minutes</td></tr>
                    <tr><td><em>Mean Total Time</em></td><td>{{ meanTotal }} Minutes</td></tr>
                    <tr></td><td></tr>
                    <tr><td>Median Wait Time</td><td>{{ medianWait }} Minutes</td></tr>
                    <tr><td><em>Median Total Time</em></td><td>{{ medianTotal }} Minutes</td></tr-->
                </tbody>
            </table>
            <p v-else>No repairs of this type available.</p>
        </div>
        <div v-if="repairs && repairs.length > 0" class="col col-sm-6" >
            <h3>Repair Resolution</h3>
            <canvas class="donut">
            </canvas>
            <span hidden>{{chart}}</span>
        </div>
    </div>
`;
