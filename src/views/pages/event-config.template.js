export let TEMPLATE=`
<div class="form-group">
    <div class="row">
        <div class="col col-lg-4">
            <label for="server-count">Server Count</label>
        </div>
        <div class="col col-lg-4">
            <input type="number" id="server-count" class="form-control"
                v-model="server_count" min="1" max="10" step="1" />
        </div>
    </div>
    <div class="row" >
        <div class="col col-lg-4">
            <label for="set-time">Set Event Time (From This Device)</label>
        </div>
        <div class="col col-lg-4">
            <input type="button" class="btn btn-block btn-success" id="set-time"
                value="Set Time" @click="setTime" />
        </div>
        <div class="col col-lg-4 alert alert-danger" v-show="time_error != null">
            <strong>Error Setting Time: </strong>
            <span class="text-danger">{{ time_error }}</span>
        </div>
    </div>
</div>
`;