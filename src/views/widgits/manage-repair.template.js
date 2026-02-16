/**
 * @fileoverview template for the repair management widget
 * 
 * This file contains the template for the management widget allowing 5 actions:
 * 1. Delete: the repair is deleted from the system
 * 2. Fixed: the repair was successful
 * 3. Consulted: the repair ended with consultation (needed part, advice, etc.)
 * 4. No Time: the repair was not completed due to time constraints
 * 5. Unfixable: the repair was not successful and is not expected to be successful in the future
 * @author lestarch
**/
export let TEMPLATE = `
<div class="btn-group w-100" role="group" aria-label="Management Actions">
    <button type="button" class="btn btn-danger" @click="finish('delete')">Delete</button>
    <button type="button" class="btn btn-success" @click="finish('fixed')">Fixed</button>
    <button type="button" class="btn btn-info"  @click="finish('consulted')">Consulted</button>
    <button type="button" class="btn btn-warning" @click="finish('no-time')">No Time</button>
    <button type="button" class="btn btn-danger"  @click="finish('unfixable')">Unfixable</button>
</div>
`;