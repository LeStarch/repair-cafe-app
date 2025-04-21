/**
An entry in a list of printers

@author lestarch
**/
export let TEMPLATE = `
<div class="row">
    <div class="col col-lg-3">
        <label>Printer <em>{{ printer.name }}</em></label>
    </div>
    <div class="col col-lg-3">
        <label>{{ printer.mac }}</label>
    </div>
    <div class="col col-lg-3">
        <label>{{ printer.port }}</label>
    </div>
</div>
`;