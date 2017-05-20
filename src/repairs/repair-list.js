import {RepairAPI} from "../repair-api";
import {Config} from "../config";

export class RepairList {

    created() {
        this.repairs = [];
        this.lastScrollY = null;
        this.refresh();
        setInterval(this.refresh.bind(this), 5000);
    }
    attached() {
        this.refresh();
        setTimeout(this.startScroll.bind(this),500);
    }
    startScroll() {
        this.intervalId = setInterval(this.scroll.bind(this),10);
    }
    scroll() {
        if (Config.ADVANCED) {
            return;
        }
        window.scrollBy(0,1);
        if (this.lastScrollY != null && this.lastScrollY == window.scrollY) {
            clearInterval(this.intervalId);
            setTimeout(this.resetScroll.bind(this),500);

        }
        this.lastScrollY = window.scrollY;
    }
    resetScroll() {
        window.scrollTo(0,0);
        setTimeout(this.startScroll.bind(this),500);
    }
    refresh() {
        RepairAPI.getRepairList().then(repairs => {
            for (var i = 0; i < repairs.length; i++) {
                this.updateSingleListing(repairs[i]);
            }
        });
    }
    updateSingleListing(repair) {
        var found = false;
        for (var i = 0; i < this.repairs.length; i++) {
            found = found || this.repairs[i].id == repair.id;
            var existing = JSON.stringify(this.repairs[i].marshall());
            var newer = JSON.stringify(repair.marshall());
            if (this.repairs[i].id == repair.id && existing != newer) {
                this.repairs.splice(i,1,repair);
                found = true;
            }
        }
        if (!found) {
            this.repairs.push(repair);
        }

    }
    select(repair) {
        this.selectedId = repair.id;
        return true;
    }
}
