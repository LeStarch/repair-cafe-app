export let TEMPLATE = `<div>
<form v-on:submit="submit">
    <div v-if="repair == null && !advanced">
        <div class="row">
            <!--div class="col-4">
                <img src="./img/logo.jpg" alt="RC Logo" />
            </div-->
            <div class="col-8">
                <h2>Repair Cafe Registration Form</h2>
                <p>Please fill out this for to register your repair. After your repair has been registered, please
                proceed to check-in. For help, ask the attending volunteer or proceed to check-in.</p>
            </div>
        </div>
    </div>
    <label for="name">Repairee Name:</label>
    <input name="name" autocomplete="off" type="text" v-model="editing.name" class="form-control" required />
    <label for="type">Repair Type:</label>
    <select name="type" v-model="editing.type" class="form-control" required>
        <option v-for="type of config.types" :value="type">{{ type }}</option>
    </select>
    <label for="item">Repair Item:</label>
    <input name="item" autocomplete="off" type="text" v-model="editing.item" class="form-control" required />
    <label for="description">Problem Description:</label>
    <textarea name="desc" v-model="editing.description" class="form-control" rows=3></textarea>
    <label for="email">Repairee Email:<em>(optional)</em></label>
    <input name="email" autocomplete="off" type="email" v-model="editing.email" class="form-control" />
    <div v-if="repair != null">
        <h4>Select Repairer(s):</h4>
        <repairer-list :advanced="true" v-model="assignees"></repairer-list>
        <input type="submit" value="Update Repair" class="btn btn-success" />
        <input type="button" value="Cancel" class="btn btn-danger" v-on:click="cancel" />
    </div>
    <div v-else>
        <div class="row">
            <div class="col-5">
                <input type="submit" :disabled="!editing.acknowledged" value="Add Repair" class="btn btn-success" />
                <input type="button" value="Clear" class="btn btn-danger" v-on:click="clear" />
            </div>
            <div class="col-1">
                <input name="ack" type="checkbox" v-model="editing.acknowledged" />
            </div>
            <div class="col-6">
                <label for="ack"><small>By checking I acknowledge that I have read, understand and agree to comply with the terms below.</small>
                </label>
            </div>
        </div>
        <div v-if='last_id !== "" && editing.name === "" && editing.type === ""' class="row alert alert-success">
            <h4>Request Submitted: Please proceed to check-in to receive your ticket!</h4>
        </div>
        <div name="legalese">
            <h3>Repair Cafe Terms</h3>
            <p>Repair Café is composed of volunteers agreeing to make an effort to assist those in need of repairs.
                Volunteers do not claim to be experts in any field and may refuse to repair an item. No repair cost is charged.
                No warranties or guarantees are applicable to service provided. Additional damage could occur during repair process.</p>

            <p>By checking above, you agree to represent accurately your true repair need. You represent that the repair item
           belongs to you or you have authorization from the owner to pursue its repair.</p>
            <p>You agree that Repair Café and its volunteers will not be responsible for any damage that may occur during handling
           or repair. By entering into any area where Repair Café volunteers are gathered or working, you agree to:</p>
            <ol>
                <li>Maintain a quiet and cooperative demeanor</li>
                <li>Pay attention to others possessing and handling items and tools which could pose a danger</li>
                <li><p>Waive any right you have under local, state, federal law to legal claim arising from personal injury or
                property damage whether under principles of tort, contract or equity.</p></li>
            </ol>
        </div>
    </div>
</form>
</div>`;
