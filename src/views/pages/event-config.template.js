export let TEMPLATE=`
<div class="row" >
    <div class="col col-lg-6">
        <label for="set-time">Set Event Time</label>
    </div>
    <div class="col col-lg-6 alert alert-danger" v-if="time_error != null">
        <strong>Error Setting Time: </strong>
        <span class="text-danger">{{ time_error }}</span>
    </div>
    <div class="col col-lg-6 alert alert-success" v-if="time_response != null">
        <span class="text-success">{{ time_response }}</span>
    </div>
</div>
<div class="row">
    <input type="button" class="btn btn-block btn-success" id="update-config"
            value="Update Event Configuration" @click="setTime" />
</div>
`;