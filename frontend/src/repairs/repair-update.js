import {RepairAPI} from "../repair-api";
import {RepairerAPI} from "../repairer-api";
import {Config} from "../config";
import {Repair} from "../models/repair"
/**
 *A form enabling the update of the repair
 * @author lestarch
 */
export class RepairUpdate {

    constructor() {
        this.item = "";
        this.description = "";
        this.repairers = [];
        this.selected = [];
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
                this.selected = repair.repairers;
            }
        });
        RepairerAPI.getRepairerList().then(repairers => {
            var rprs = [];
            for (var i = 0; i < repairers.length; i++) {
                rprs.push(repairers[i]);
            }
            this.repairers = rprs;
        });
    }

    updateRepair() {
        this.repair.triageEntry(this.item, this.description).then( x => {
            if (this.selected.length != 0) {
                this.repair.assignRepairers(this.selected).then(y => {
                    location.assign('#/repairs');
                });
            } else {
                location.assign('#/repairs');
            }
        });

    }
}
