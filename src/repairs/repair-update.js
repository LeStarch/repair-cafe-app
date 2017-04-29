import {RepairAPI} from "../repair-api";
import {Config} from "../config";
import {Repair} from "../models/repair"

export class RepairUpdate {

    constructor() {
        this.item = "";
        this.description = "";
        this.repairer = "";
    }

    activate(param, routeConfig) {
        RepairAPI.getRepair(param.id).then(repair => {
            this.repair = repair;
            if (typeof(this.repair) === "undefined") {
                return;
            }
            if (this.repair.stateIndex >= 2) {
                this.item = repair.item;
                this.description = repair.description;
            }
            if (this.repair.stateIndex >= 3) {
                this.repairer = repair.repairer;
            }
        });
    }

    updateRepair() {
        this.repair.triageEntry(this.item, this.description);
        if (this.repairer != "") {
            this.repair.assignRepairer(this.repairer);
        }
        RepairAPI.saveRepair(this.repair);
        this.item = "";
        this.description = "";
        this.repairer = "";
    }
}
