export let TEMPLATE=`
    <div class="row">
        <div class="col col-sm-6">
            <repairer-add></repairer-add>
        </div>
        <div class="col col-sm-6">
            <repairer-list :avanced="false" :assigned="[]"></repairer-list>
        </div>
    </div>
`;