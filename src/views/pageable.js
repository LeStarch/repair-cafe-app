import {Config} from "../config";
/**
 * This class represents a base view that contains a list of items that can be
 * paged through while displaying. It also contains the functionality needed to
 * continuously update the source of paged items.
 *
 * @author lestarch
 */
export class Pageable {
    /**
     * Sets up the pager's internal structures and prepares for paging items
     */
    constructor() {
        this.autoUpdate = false;
        this.paging = false;
        this.pageSize = 10;
        this.pagePointer = 0;
        this.items = [];
        this.subset = [];
        setInterval(this.timer.bind(this), Config.UPDATE_INTERVAL);
    }
    /**
     * Set the page size for the number of page-able items that can be returned
     * @param pageSize: number of page-items to be returned
     */
    setPageSize(pageSize) {
        this.pageSize = pageSize;
    }
    /**
     * Sets this pager to automatically update the list of itmes underlying this
     * pager. Such updating does not affect the page-pointer.
     * @param autoUpdate: true to start auto-updating false, to turn off
     */
    setAutoUpdate(autoUpdate) {
        this.autoUpdate = autoUpdate;
    }
    /**
     *Turns on or off paging
     * @param paging: boolean, should page or not
     */
    setPaging(paging) {
        this.paging = paging;
    }
    /**
     * Returns a list representing the next page of items form the set. This
     * function will loop around to the begining after returning the partial
     * page at the end.
     */
    nextPage() {
        //If page size is -1, then return the whole list
        if (this.pageSize == -1) {
            return this.items;
        }
        //Get a list of items, even if it is a partial-page
        var ret = this.items.slice(this.pagePointer,
            Math.min(this.pagePointer + this.pageSize, this.items.length));
        //Move the pointer, and wrap if necessary
        this.pagePointer = this.pagePointer + this.pageSize;
        if (this.pagePointer >= this.items.length) {
            this.pagePointer = 0;
        }
        return ret;
    }
    /**
     * Called on a timer used to run paging
     */
    timer() {
        //Create an empty-promise
        var promise = new Promise(function (resolve,reject) {resolve(null)});
        if (this.autoUpdate) {
            promise = this.updateHelper();
        }
        //Run paging helper, if paging
        if (this.paging) {
            promise.then(items => { this.pageHelper();});
        }
    }
    /**
     * A function called on pageing interval to grab a page and deal with it,
     * handing the paged set to the "page" function.
     */
    pageHelper() {
        var tmp = this.nextPage();
        this.page(tmp);
    }
    /**
     * A basic implementation of page which merges the new subset with the old
     * subset resulting in an object-reference protected changing out of items
     * in the list. This prevents Aurelia from tearing when the update happens.
     * @param subset: new subset of items
     */
    page(subset) {
        this.merge(subset);
    }
    /**
     * A helper function for running update and handling the returned promise
     * of a list of objects representing that update
     * @param callback: function to call after update
     * @return: forwarded promise
     */
    updateHelper(callback) {
        var _self  = this;
        return new Promise(
            function(success, error) {
                _self.update().then(
                    items => {
                        items.sort(_self.compare);
                        _self.items = items;
                        success(items);
                    },
                    err => {error(err);}
                );
            }
        );
    }
    /**
     * Update function must be implemented in children
     * Note: subclass implementors should return a promise handing a list
     * @return: promise of list of objects
     */
    update() {
        throw new Error("Class must implement function 'update'");
    }
    /**
     * Compares two objects with this notion of sorting.
     * @param a: first parameter
     * @param b: second parameter
     * @return: -1 if a comes first, 0 if equal, 1 if b comes first
     */
    compare(a, b) {
        //Try three conversions, implemented, string then JSON, otherwise
        //a comes first
        try {
            return a.compare(b);
        } catch (e) {}
        try {
            return new String(a).localeCompare(new String(b));
        } catch (e) {}
        try {
            return JSON.stringify(a).localeCompare(JSON.stringify(b));
        } catch (e) {}
        return -1;
    }
    /**
     * A (hopefully private) function used to merge a given subset into the
     * member variable subset
     * @param incoming: subset to merge in
     */
    merge(incoming) {
        incoming.sort(this.compare);
        //Update the array with newest entries
        for (var i = 0; i < incoming.length; i++) {
            var newer = incoming[i];
            var older = (i < this.subset.length) ? this.subset[i] : null;
            //Remove old entries that don't exist any longer
            while (older != null && older.id < newer.id) {
                this.subset.splice(i,1);
                older = (i < this.subset.length) ? this.subset[i] : null;
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
                this.subset.splice(i,1,newer);
                continue;
            }
            //Insert a new entry
            else if (older == null || newer.id < older.id) {
                this.subset.splice(i,0,newer);
                continue;
            }
            //Should never happen
            else {
                throw Exception("[ERROR] Merge algorithm in bad state");
            }
        }
        //Clean up extras
        if (i < this.subset.length) {
            this.subset.splice(i, this.subset.length - i);
        }
    }
}
