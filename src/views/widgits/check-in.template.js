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
<div class="btn-group w-100" role="group" aria-label="Check-In Actions">
    <button type="button" v-show="repair.checkAction('check-in')" class="btn btn-primary" @click="checkIn"
        :disabled="system_errors.connectivity !== null">Check-In</button>
    <button type="button" v-show="repair.checkAction('print')" class="btn btn-success"  @click="print"
        :disabled="system_errors.connectivity !== null">Print</button>
    <button type="button" v-show="repair.checkAction('reprint')" class="btn btn-warning"  @click="print"
        :disabled="system_errors.connectivity !== null">Reprint</button>
    <span class="text-danger" v-if="system_errors.connectivity !== null">{{ system_errors.connectivity }}</span>
</div>
`;