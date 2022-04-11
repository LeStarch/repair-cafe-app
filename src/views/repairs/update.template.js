export let TEMPLATE = `<div>
<form v-on:submit="submit">
    <label for="name">Repairee Name:</label>
    <input name="name" type="text" v-model="editing.name" class="form-control" />
    <label for="email">Repairee Email:<em>(optional)</em></label>
    <input name="email" type="email" v-model="editing.email" class="form-control" />
    <label for="phone">Repairee Phone:<em>(optional)</em></label>
    <input name="phone" type="tel" v-model="editing.phone" class="form-control" />
    <label for="type">Repair Type:</label>
    <select name="type" v-model="editing.type" class="form-control">
        <option v-for="type of config.types" :value="type">{{ type }}</option>
    </select>
    <label for="item">Repair Item:<em>(optional)</em></label>
    <input name="item" type="text" v-model="editing.item" class="form-control" />
    <label for="subtype">Repair Subtype:<em>(optional)</em></label>
    <select name="subtype" v-model="editing.subtype" class="form-control">
         <option v-for="subtype in subtypes">{{ subtype }}</option>
    </select>      
    <label for="description">Repair Description:<em>(optional)</em></label>
    <textarea name="desc" v-model="editing.description" class="form-control" rows=3></textarea>
    <div v-if="repair != null">
        <h4>Select Repairer(s):</h4>
        <repairer-list :advanced="true" v-model="assignees"></repairer-list>
        <input type="submit" value="Update Repair" class="btn btn-success" />
        <input type="button" value="Cancel" class="btn btn-danger" v-on:click="cancel" />
    </div>
    <div v-else>
        <input type="submit" value="Add Repair" class="btn btn-success" />
        <input type="button" value="Clear" class="btn btn-danger" v-on:click="clear" />
        <div v-if='last_id !== "" && editing.name === "" && editing.type === ""' class="alert alert-success">
            <h4>Ticket Submitted: {{ last_id.replace("-", " #") }}</h4>
            <p>Ticket Number: <em>{{ last_id.replace("-", " #") }}</em>
                (Please note on physical ticket, if physical ticket present)
            </p>
        </div>
    </div>
</form>
</div>`;