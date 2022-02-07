import {RepairAPI} from "../database/repair-api";
import {Pageable} from "../views/pageable";
import {Config} from "../config";
import {bindable} from 'aurelia-framework';
/**
 * A view for inspecting the summaries of repairs. Will automatically update and
 * page through the repairs.
 *
 * @author lestarch
 */
export class RepairSummary extends Pageable {
    @bindable shouldpage = true;
    /**
     * When attached to the dom, what do we do
     */
    attached() {
        if (window.location.href.indexOf("checkout") != -1) {
            //No paging
            this.completeView = true;
            this.shouldpage = false;
        } else {
            this.completeView = false;
        }
        //Pages to get updates, without problems
        this.setPageSize(this.shouldpage ? 18 : -1);
        this.setPageing(true);
        this.setAutoUpdate(true);
        this.timer();
    }
    /**
     * Handles the update of items being paged in pageable.
     * @return: a promise of list of items to come
     */
    update() {
        return RepairAPI.getRepairList();
    }

}
