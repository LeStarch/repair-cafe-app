/**
HTML and binding only listing of a repair. Represents the full display including
the id, name, description, and if "ADVANCED" mode is enabled, controls to modify
the repair.

@author lestarch
**/
export let TEMPLATE = `
    <div class="repair-listing panel panel-primary">
        <div class="panel-heading">
            <span class="panel-title">
                {{ repair.id.replace("-"," #") }} - {{ repair.name }}
                {{ (repair.stateIndex < 2) ? "" : "["+repair.item+"]" }}
            </span>
            <span v-if="repair.reserved" class="glyphicon glyphicon-tag" aria-hidden="true">
            </span>
        </div>
        <div class="horizontal-container">
            <table class="table" style="width:80%;">
                <tr>
                    <th>Repair Station</th><td>{{ repair.type }}</td>
                </tr>
                <tr>
                    <th>Item</th><td>{{ repair.item }}</td>
                </tr>
                <tr>
                    <th>Repair Status</th>
                    <td>{{ repair.states[repair.stateIndex].message }}</td>
                </tr>
                <tr>
                    <th>Repairer(s)</th>
                    <td>{{ (repair.repairers.length == 0) ? 'Unassigned': repair.repairers.join(", ") }}</td>
                </tr>
                <tr>
                    <th>Details</th><td>{{ repair.description }}</td>
                </tr>
                <tr v-if="config.ADVANCED">
                    <th>Registered:</th><td>{{ repair.states[0].enterTime }}</td>
                </tr>
            </table>
            <div class="btn-group btn-group-vertical" style="width:20%" v-if="config.ADVANCED">
                <!--a route-href="route: repair-update; params.bind: {id:repair.id}" class="btn btn-primary">Edit</a-->
                <button v-on:click="update" name="finish" class="btn btn-success">Finish</button>
                <button v-on:click="update" name="update" class="btn btn-primary">Update</button>
                <button v-on:click="update" name="fail"   class="btn btn-warning">Fail Repair</button>
                <button v-on:click="update" name="move"   class="btn btn-primary">Move</button>
                <button v-on:click="update" name="delete" class="btn btn-danger" >Delete</button>
            </div>
            <img style="width:20%" class="img-responsive img-circle" src="../img/logo.jpg" v-if="!config.ADVANCED" />
        </div>
        <div class="btn-group btn-group-justified">
            <span v-for="state of repair.states" :class="['btn',  stateClass(state)]">
                {{state.name}}
            </span>
        </div>
    </div>
`;