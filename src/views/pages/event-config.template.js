export let TEMPLATE=`
<div>
<div class="row" >
    <div class="col col-lg-6">
        <label>Event Time</label>
    </div>
    <div class="col col-lg-6 alert alert-danger" v-if="time_error != null">
        <span class="text-danger">{{ time_error }}</span>
    </div>
    <div class="col col-lg-6 alert alert-success" v-if="time_response != null">
        <span class="text-success">{{ time_response }}</span>
    </div>
</div>
<div class="row" >
    <div class="col col-lg-4">
        <label for="event_host">Event Host</label>
    </div>
    <div class="col col-lg-4">
        <input type="text" class="form-control" id="event_host" v-model="event_info.host" />
    </div>
    <div class="col col-lg-4 alert alert-danger" v-if="error != null">
        <span class="text-danger">{{ error }}</span>
    </div>
</div>
<div class="row" >
    <div class="col col-lg-4">
        <label for="event_location">Event Location</label>
    </div>
    <div class="col col-lg-4">
        <input type="text" class="form-control" id="event_location" v-model="event_info.location" />
    </div>
    <div class="col col-lg-4 alert alert-danger" v-if="error != null">
        <span class="text-danger">{{ error }}</span>
    </div>
</div>
<printer-list-item :printer="printer" v-for="printer in event_info.printers"></printer-list-item>
<div class="row">
    <div class="col col-lg-6 btn btn-success" @click="setEventConfig">
        Update Event Configuration
    </div>
    <div class="col col-lg-6 btn btn-primary" @click="testTicket">
        Print Test Ticket ({{ local_data.printer.name }})
    </div>
</div>
</div>
`;