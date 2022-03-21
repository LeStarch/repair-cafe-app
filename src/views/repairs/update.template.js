export let TEMPLATE = `<div>
<form v-on:submit="update">
    <label for="name">Repairee Name:</label>
    <input name="name" type="text" v-model="repair.name" disabled class="form-control" />
    <label for="email">Repairee Email:</label>
    <input name="email" type="email" v-model="repair.email" disabled class="form-control" />
    <label for="type">Repair Type:</label>
    <input name="type" v-model="repair.type" disabled class="form-control" />
    <label for="item">Repair Item:</label>
    <input name="item" type="text" v-model="item" class="form-control" />
    <label for="subtype">Repair Subtype:</label>
    <select name="subtype" v-model="subtype" class="form-control">
         <option v-for="subtype in subtypes">{{ subtype }}</option>
    </select>      
    <label for="description">Repair Description:</label>
    <textarea name="desc" v-model="description" class="form-control" rows=3></textarea>
    <h4>Select Repairer(s):</h4>
    <repairer-list :advanced="true" v-model="assignees"></repairer-list>
    <input type="submit" value="Update Repair" class="btn btn-success" />
    <input type="button" value="Cancel" class="btn btn-danger" v-on:click="cancel" />
</form>
</div>`;