export let TEMPLATE=`
    <div class="row" >
        <div class="col col-sm-3">
            <repairer-add @cleared="clearRepairer" :selected="repairer" v-model="repairer"></repairer-add>
        </div>
        <div class="col col-sm-9">
            <repairer-list :advanced="false" :assigned="[]" v-model="repairer"></repairer-list>
        </div>
    </div>
`;