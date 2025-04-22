/**
 * @fileoverview template for the checkout widget
 * 
 * This file contains the template for the checkout widget. The template provides three actions to the end user:
 * 1. Fixed: the repair was successful
 * 2. Consulted: the repair ended with consultation (needed part, advice, etc.)
 * 3. Not Fixed: the repair was not successful
 * 
 * @author lestarch
**/
export let TEMPLATE = `
<div v-show="repair.checkAction('check-out')" class="btn-group w-100" role="group" aria-label="Checkout Actions">
    <button type="button" class="btn btn-success" @click="finish('fixed')">Fixed</button>
    <button type="button" class="btn btn-info"  @click="finish('consulted')">Consulted</button>
    <button type="button" class="btn btn-warning" @click="finish('no-time')">No Time</button>
    <button type="button" class="btn btn-danger"  @click="finish('unfixable')">Not Fixed</button>
</div>
`;