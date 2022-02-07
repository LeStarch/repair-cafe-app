export let TEMPLATE = `
    <form v-on:submit="addRepair" class="form-group">
        <label for="name">Repairee Name:</label>
        <input name="name" type="text" v-model="name" class="form-control" />
        <label for="email">Repairee Email:</label>
        <input name="email" type="email" v-model="email" class="form-control" />
        <label for="type">Repair Type:</label>
        <select name="type" v-model="type" class="form-control">
            <option v-for="type of config.types" :value="type">{{ type }}</option>
        </select>
        <input type="checkbox" name="reserved" v-model="reserved" /><label for="reserved">Pre-Registered</label>
        <input type="submit" value="Add Repair" class="btn btn-success" />
        <div id="ticket-modal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Ticket Submitted</h4>
                    </div>
                    <div class="modal-body">
                        <p>Ticket Number: {{ last_id.replace("-", "#") }} (Please, note on physical ticket, if present)</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
`;