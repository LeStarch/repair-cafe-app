import {RepairAPI} from "../repair-api";
import {Config} from "../config";

export class RepairList {

    created() {
        this.repairs = [];
        this.lastScrollY = null;
        this.refresh();
        setInterval(this.refresh.bind(this), 1000);
    }
    attached() {
        this.refresh();
        setTimeout(this.startScroll.bind(this),2000);
    }
    startScroll() {
        this.intervalId = setInterval(this.scroll.bind(this),200);
    }
    scroll() {
        if (Config.ADVANCED) {
            return;
        }
        window.scrollBy(0,10);
        if (this.lastScrollY != null && this.lastScrollY == window.scrollY) {
            clearInterval(this.intervalId);
            setTimeout(this.resetScroll.bind(this),2000);

        }
        this.lastScrollY = window.scrollY;
    }
    resetScroll() {
        window.scrollTo(0,0);
        setTimeout(this.startScroll.bind(this),2000);
    }
    refresh() {
        RepairAPI.getRepairList().then(repairs => {
            //Sort repairs
            function compare(a,b) {
                return a.id.localeCompare(b.id);
            }
            repairs.sort(compare);
            //Update the array with newest entries
            for (var i = 0; i < repairs.length; i++) {
                var newer = repairs[i];
                var older = (i < this.repairs.length) ? this.repairs[i] : null;
                //Remove old entries that don't exist any longer
                while (older != null && older.id < newer.id) {
                    this.repairs.splice(i,1);
                    older = (i < this.repairs.length) ? this.repairs[i] : null;
                }
                //Get comparible string versions
                var newer_str = JSON.stringify(newer.marshall());
                var older_str = (older == null)?"":JSON.stringify(older.marshall());
                //If identical skip
                if (older != null && newer.id == older.id && newer_str == older_str) {
                    continue;
                }
                //If updated, splice in
                else if (older != null && newer.id == older.id && newer_str != older_str) {
                    this.repairs.splice(i,1,newer);
                    continue;
                }
                //Insert a new entry
                else if (older == null || newer.id < older.id) {
                    this.repairs.splice(i,0,newer);
                    continue;
                }
                //Should never happen
                else {
                    throw Exception("[ERROR] Algorithm in bad state");
                }
            }
            //Clean up extras
            if (i < this.repairs.length) {
                this.repairs.splice(i, this.repairs.length - i);
            }
        });
    }
    select(repair) {
        this.selectedId = repair.id;
        return true;
    }
}
