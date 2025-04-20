export let TEMPLATE=`
<div class="row" >
    <div class="col col-lg-4">
        <label for="set-time">Set Event Time (From This Device)</label>
    </div>
    <div class="col col-lg-4">
        <input type="button" class="btn btn-block btn-success" id="set-time"
               value="Set Time" @click="setTime" />
    </div>
    <div class="col col-lg-4 alert alert-danger" v-if="time_error != null">
        <strong>Error Setting Time: </strong>
        <span class="text-danger">{{ time_error }}</span>
    </div>
    <div class="col col-lg-4 alert alert-success" v-if="time_response != null">
        <span class="text-success">{{ time_response }}</span>
    </div>
</div>
`;