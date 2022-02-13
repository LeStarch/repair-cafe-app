export let TEMPLATE = `
    <div>
        <h3 v-if="repair != null">{{ repair.id }}</h3>
        <repair-list v-if="repair == null" v-model="repair" :advanced="true"></repair-list>
        <repair-update v-if="repair != null" :repair="repair" v-model="repair"></repair-update>
    </div>
`;