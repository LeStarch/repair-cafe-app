export let TEMPLATE = `
    <div>
        <search class="col col-8" v-model="search" :options='["All Types"].concat(config.types)' :options_label='"Type"' :use_all="false"></search>
        <report :repairs="subset" :title="search.selected"></report>
        <report :repairs="subseter(type)" :title="type" v-for="type in config.types"></report>
    </div>
`;