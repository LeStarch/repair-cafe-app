export let TEMPLATE = `
<ul class="list-group">
    <li class="list-group-item" v-show="advanced">
        <search v-model="search" :options='[""].concat(config.types)' :options_label='"Repair Type"'></search>
    </li>
    <repair-list-item :repair="repair" :advanced="advanced" v-for="repair in subset"></repair-list-item>
</ul>
`;