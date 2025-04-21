export let TEMPLATE = `
<div class="container-fluid">
    <h4 class="text-right">{{ date_computed }}</h4>
    <navigation v-model="route"></navigation>
    <!-- Basic role pages: Register, Check-In, Check-Out, Team Triage -->
    <reg-repair-page v-if='route == "#register"'></reg-repair-page>
    <repair-summary v-else-if='route == "#checkin" || route == "#checkout"' :advanced="true"></repair-summary>
    <manage v-else-if='route == "#triage"'></manage>
    <add-repairer-page v-else-if='route == "#repairers"'></add-repairer-page>
    <!-- Sign Pages -->
    <repair-summary v-else-if='route == "#sign1"' :advanced="false"></repair-summary>
    <repair-list v-else-if='route == "#sign2"' :advanced="false"></repair-list>
    <!-- Role selection: only applies when not doing event configuration -->
    <div v-else-if='route != "#event-config"' class="card">
        <div class="card-body">
            <div class="row">
                <div class="col">
                    <img src="./img/logo.jpg" class="card-img" alt="RC Logo" />
                </div>
                <div class="col">
                    <h4>Repair Cafe, The App!</h4>
                    <p>Welcome to the Repair Cafe application!</p>
                    
                    <p>Feel free to <a href="https://github.com/LeStarch/repair-cafe-app/issues/new">report an issue.</a></p>
                    
                    <p>Choose your role:</p>
                    <button  v-for="(label, role) in roles.available_roles" class="btn btn-primary"
                                        @click="changeRole(role)">{{ label }}</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Event configuration: alwyas active (hence v-show) such that config is loaded and
    shared regardles of route-->
    <event-config :event_info="event_info" v-show='route == "#event-config"'></event-config> 
</div>
`;
