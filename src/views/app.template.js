export let TEMPLATE = `
<div class="container-fluid">
    <h4 class="text-right">{{ ("" + new Date()).replace(/[A-Z]{3}-\\d{4}/,"") }}</h4>
    <navigation v-model="route" v-show='!route.startsWith("#sign")'></navigation>
    <add-repairer-page v-if='route == "#repairers"'></add-repairer-page>
    <add-repair-page v-else-if='route == "#add"'></add-repair-page>
    <manage v-else-if='route == "#manage"'></manage>
    <repair-summary v-else-if='route == "#summary"' :advanced="true"></repair-summary>
    <repair-summary v-else-if='route == "#sign1"' :advanced="false"></repair-summary>
    <repair-list v-else-if='route == "#sign2"' :advanced="false"></repair-list>

    <div v-else class="card">
        <div class="card-body">
            <div class="row">
                <div class="col">
                    <img src="./img/logo.jpg" class="card-img" alt="RC Logo" />
                </div>
                <div class="col">
                    <h4>RC APP Beta Testing</h4>
                    <p>Welcome to the RC App beta test! This test runs entirely using non-persistent storage and as such
                    all changes you make will clear when you reload. On the positive side, changes made by others do not
                    affect you!</p>
                    
                    <p>Feel free to report any issues to Michael, or use the following link to post them: 
                    <a href="https://github.com/LeStarch/repair-cafe-app/issues/new">https://github.com/LeStarch/repair-cafe-app/issues/new</a></p>
                    
                    <p>Testing procedure:</p>
                    <ol>
                        <li>Add some repairers using the "Add Repairers" tab</li>
                        <li>Add some repairees using the "Check-In" tab</li>
                        <li>Run team update and tracking using the "Team Triage" tab</li>
                        <li>Checkout a repair using the "Check Out" tab</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</div>
`;