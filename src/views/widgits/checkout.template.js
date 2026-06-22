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
<div class="btn-group w-100" role="group" aria-label="Checkout Actions">
    <button type="button" class="btn btn-success" @click="finish('fixed')"
        :disabled="system_errors.connectivity !== null">Fixed</button>
    <button type="button" class="btn btn-info"  @click="finish('consulted')"
        :disabled="system_errors.connectivity !== null">Consulted</button>
    <button type="button" class="btn btn-warning" @click="finish('no-time')"
        :disabled="system_errors.connectivity !== null">No Time</button>
    <button type="button" class="btn btn-danger"  @click="finish('unfixable')"
        :disabled="system_errors.connectivity !== null">Not Fixed</button>
    <span class="text-danger" v-if="system_errors.connectivity !== null">{{ system_errors.connectivity }}</span>
</div>
`;