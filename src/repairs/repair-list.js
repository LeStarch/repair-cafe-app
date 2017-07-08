import {RepairAPI} from "../repair-api";
import {Config} from "../config";
import {Pageable} from "../views/pageable"
/**
 * Lists a set of repairs in full format for paging or for editing without
 * paging.
 *
 * @author lestarch
 */
export class RepairList extends Pageable {
    /**
     * Attached dom, set paging etc.
     */
    attached() {
        this.setAutoUpdate(true);
        this.setPageing(true);
        this.timer();
    }
    /**
     * Override timer to set paging
     */
    timer() {
        //If advanced, list everything, else page
        if (Config.ADVANCED) {
            this.setPageSize(-1);
        } else {
            this.setPageSize(3);
        }
        super.timer();
    }
    /**
     * Update the list of repairs
     * @return: a promise of list of repairs to come
     */
    update() {
        return RepairAPI.getRepairList();
    }
    /**
     * Select a repair to edit
     * @param repair: select repair
     */
    select(repair) {
        this.selectedId = repair.id;
        return true;
    }
}
