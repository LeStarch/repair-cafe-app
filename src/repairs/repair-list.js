import {RepairAPI} from "../repair-api";

export class RepairList {

    created() {
        this.refresh();
        //setInterval(this.refresh.bind(this), 500);
    }

    refresh() {
        RepairAPI.getRepairList().then(repairs => this.repairs = repairs);
    }

    select(repair) {
        this.selectedId = repair.id;
        return true;
    }
}
