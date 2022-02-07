export let TEMPLATE = `
<ul class="list-group">
    <div>Filter: {{ search.filter }} Selectes: {{ search.selected }}</div>
    <li class="list-group-item">
        <search v-model="search" :options='[""].concat(config.types)' :options_label='"Repair Type"'></search>
    </li>
    <repair-list-item :repair="repair" v-for="repair in subset"></repair-list-item>
</ul>
`;