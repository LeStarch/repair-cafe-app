import {RepairAPI} from "../repair-api";
import {Pageable} from "../views/pageable";
import {Config} from "../config";
import {bindable, bindingMode} from 'aurelia-framework';
/**
 * A view for inspecting the summaries of repairs. Will automatically update and
 * page through the repairs.
 *
 * @author lestarch
 */
export class RepairSummary extends Pageable {
    @bindable shouldPage = true;
    /**
     * When attached to the dom, what do we do
     */
    attached() {
        if (window.location.href.indexOf("checkout") != -1) {
            //No paging
            this.completeView = true;
            this.shouldPage = false;
        } else {
            this.completeView = false;
        }
        if (!this.shouldPage) {
            this.setPageSize(-1);
        } else {
            this.setPageSize(3);
        }
        //Pages to get updates, without problems
        this.setPaging(true);
        this.setAutoUpdate(true);
    }
    /**
     * Handles the update of items being paged in pageable.
     * @return: a promise of list of items to come
     */
    update() {
        return RepairAPI.getRepairList();
    }
    /**
     * Handles the selection of a single repair to send to the update
     * view.
     * @param repair: the selected repair
     */
    select(repair) {
        this.selectedId = repair.id;
        return true;
    }
}
