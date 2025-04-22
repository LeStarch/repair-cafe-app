/**
HTML and binding only listing of a repair. Represents the full display including
the id, name, description, and if "ADVANCED" mode is enabled, controls to modify
the repair.

@author lestarch
**/
export let TEMPLATE = `
    <div class="repair-listing card card-primary">
        <div class="card-header">
            <span class="card-title">
                {{ repair.id.replace("-"," #") }} - {{ repair.name }}
                {{ (repair.stateIndex < 2) ? "" : "["+repair.item+"]" }}
            </span>
            <span v-if="repair.reserved" class="glyphicon glyphicon-tag" aria-hidden="true">
            </span>
        </div>
        <div class="card-body horizontal-container">
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
                <tr v-if="advanced">
                    <th>Registered:</th><td>{{ repair.states[0].enterTime }}</td>
                </tr>
            </table>
            <div class="btn-group btn-group-vertical" style="width:20%" v-show="repair.checkAction('triage')">
                <button @click="queue" name="queue" class="btn btn-primary">Enqueue</button>
                <button @click="update" name="update" class="btn btn-info">Edit / Assign Repairers</button>
                <button @click="finish" name="update" class="btn btn-success">Repair Done</button>
            </div>
            <img style="width:20%" class="img-responsive img-circle" src="./img/logo.jpg" v-if="!advanced" />
        </div>
        <div class="btn-group btn-group-justified">
            <span v-for="state of repair.states" :class="['btn',  stateClass(state)]">
                {{state.name}}
            </span>
        </div>
    </div>
`;