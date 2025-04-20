export let TEMPLATE = `
<div class="container-fluid">
    <h4 class="text-right">{{ date_computed }}</h4>
    <navigation v-model="route" v-show='!route.startsWith("#sign") && route!=""'></navigation>
    <add-repairer-page v-if='route == "#repairers"'></add-repairer-page>
    <reg-repair-page v-else-if='route == ""'></reg-repair-page>
    <add-repair-page v-else-if='route == "#add"'></add-repair-page>
    <manage v-else-if='route == "#manage"'></manage>
    <repair-summary v-else-if='route == "#summary"' :advanced="true"></repair-summary>
    <repair-summary v-else-if='route == "#sign1"' :advanced="false"></repair-summary>
    <repair-list v-else-if='route == "#sign2"' :advanced="false"></repair-list>
    <div v-else-if='route != "#event-config"' class="card">
        <div class="card-body">
            <div class="row">
                <div class="col">
                    <img src="./img/logo.jpg" class="card-img" alt="RC Logo" />
                </div>
                <div class="col">
                    <h4>Repair Cafe, The App!</h4>
                    <p>Welcome to the Repair Cafe application! This supports repair cafe tickets by digitizing the
                    ticket process removing the need to trade paper tickets back-and-forth. Please see below for an
                    understanding on how to navigate it.</p>
                    
                    <p>Feel free to report any issues to Michael</p>
                    
                    <p>Click on the navigation tab above as indicated by your role:</p>
                    <ol>
                        <li>Register: add walk-in and new repairs</li>
                        <li>Check In/Out: check-in pre-registered repairs and check-out repairs</li>
                        <li>Team Triage: manage team repair assignments</li>
                        <li>Add Repairers: add repairers</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <event-config :event_info="event_info" v-show='route == "#event-config"'></event-config> 
</div>
`;
