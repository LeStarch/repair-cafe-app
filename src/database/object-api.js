// For loval testing
import {Repair} from "../models/repair.js";
import {Repairer} from "../models/repairer.js";
import {Elastic} from "./elastic.js";
import {Config} from "../config.js"

/**
 * High-level api for persisting the objects for more specific APIs. This will handle the saving and returning of data
 * in a generic way. This API allows for both local and non-local storage depending on the configuration.
 *
 * @author lestarch
 */
let TEST_DATA={
    "repairer": [
        new Repairer("Fenneko I.", "FennI@cmtc.com", "Tinker", ["electronics", "micro-electronics", "explosives"]),
        new Repairer("Washimi K.", "washimi@cmtc.com", "Stich", ["sewing", "adhesives"])],
    "repair": [
        new Repair("Kabae T.", "KabaeT@cmtc.com", "555-5555", "Tinker", true),
        new Repair("D. Gori", "gori@cmtc.com", "555-5555", "Stich", false)
    ]
};

class Database {
    /**
     * Constructs the database object by internalizing the index and type.
     * @param index: index to use when posting to the database
     * @param type: type of the documents posted to the database
     * @param items: items if the persistence needs to be overridden
     */
    constructor(index, type, items) {
        this.items = (typeof(items) === "undefined") ? [] : items;
        this.index = index;
        this.type = type;
        this.marshall_type = (type === "repairer") ? Repairer : Repair;
        let _self = this;
        setInterval(() => { _self.refresh() }, Config.UPDATE_INTERVAL);
    }

    /**
     * Prepare data for databasing
     * @param item: item to marsall
     * @returns {{}}
     */
    marshall(item) {
        return item.marshall();
    }

    /**
     * Demarshall items from database
     * @param item: item from database
     */
    demarshall(item) {
        return (new this.marshall_type()).demarshall(item);
    }

    /**
     * Save the item using generic marshalling
     * @param item: item to save
     */
    save(item) {
        item.version = (item.version || 0) + 1;
        item = this.marshall(item);
        this.save_helper(item);
    }

    /**
     * Refresh handler
     */
    refresh() {
        let _self = this;
        this.refresh_helper().then((items) => {
            items = items.map((item) => {
                let demarshalled = _self.demarshall(item);
                // Add version if available
                if (item.version) {
                    demarshalled.version = item.version;
                }
                return demarshalled;
            });
            items = items.map(_self.chooseNewer.bind(_self));
            this.items.splice(0, this.items.length, ...items);
        });
    }

    chooseNewer(new_item) {
        let index = this.items.findIndex((item) => new_item.id === item.id);
        if (index === -1 || this.items[index].version < new_item.version) {
            return new_item;
        } else {
            return this.items[index];
        }
    }


}

export class ElasticDatabase extends Database {
    /**
     * Setup elastic search database handler
     */
    constructor(index, type, items) {
        super(index, type, items);
        // A function to ignore resource exists
        let ignore = (error) => {
            if (error.message.indexOf("resource_already_exists_exception") === -1) {
                console.error(error);
            }
        }
        Elastic.elastic(Config.COUNTER_INDEX, undefined, "PUT", undefined).catch(ignore);
        Elastic.elastic(index, undefined, "PUT", undefined).catch(ignore);
    }

    /**
     * Delete through delegation to elastic search database.
     * @param id: ID of item to delete
     */
    delete(id) {
        return Elastic.elasticDelete(this.index, this.type, id);
    }

    /**
     * Handle getting the next id via a serialized ID in the database
     * @returns {Promise<unknown>}: promis with the next ID
     */
    nextId() {
        return new Promise((success, error) => {
            let data = { "id": this.type.toLowerCase() };
            Elastic.elasticPost(Config.COUNTER_INDEX, Config.COUNTER_TYPE, data).then(
                (result) => { success(result["_version"]); }, error);
        });
    }


    /**
     * List all items through elastic search delegation
     * @returns {Promise | Promise<items>}: items returned from this listing
     */
    refresh_helper() {
        let _self = this;
        return new Promise((success, error) => {
            Elastic.elasticList(this.index, this.type).then((response) => {
                let items = ((response.hits || {}).hits || []);
                items = items.map((item) => Object.assign({}, item._source, {"version": item._version}));
                success(items);
            }).catch(error);
        });
    }

    /**
     * Post the item to the elastic store
     * @param item: item to save
     * @returns {Promise | Promise<unknown>}
     */
    save_helper(item) {
        delete item["version"];
        return Elastic.elasticPost(this.index, this.type, item);
    }
}


export class LocalDatabase extends Database {
    /**
     * Construct this object including the local id counter.
     * @param index: index to use when posting to the database
     * @param type: type of the documents posted to the database
     * @param items: items if the persistence needs to be overridden
     */
    constructor(index, type, items) {
        super(index, type, items);
        this.id = -1;
        this.internal = [];

        // Local database holds test data
        let _self = this;
        let test_data = TEST_DATA[type];
        for (let i = 0; i < test_data.length; i++) {
            this.nextId().then((id) => {
                test_data[i].id = (typeof(test_data[i].type) !== "undefined") ? test_data[i].type + "-" + id : id;
                _self.save(test_data[i]);
            })
        }
    }

    /**
     * Get the next available ID.
     * @returns {Promise<unknown>}
     */
    nextId() {
        this.id = this.id + 1;
        let _self = this;
        return new Promise((success, error) => { success(_self.id.toString()); });
    }

    /**
     * Delete the object from the database of items, leaving the local storage intact
     * @param id: id of the the item to remove
     */
    delete(id) {
        let index = this.internal.findIndex((test) => test.id === id);
        if (index !== -1) {
            this.internal.splice(index, 1);
        }
        return new Promise((success, error) => {
            if (index === -1) {
                error(new Error("[LocalDB] Failed to find item with id " + id ));
            } else {
                success()
            }
        });
    }

    /**
     * Refresh the list of items from the backing store. In this case, it does nothing as the backing store is local.
     * @returns {Promise<unknown>}
     */
    refresh_helper() {
        let _self = this;
        return new Promise((success, error) => {
            success(_self.internal)
        });
    }

    /**
     * Save the item to the local store
     * @param item: item to save
     */
    save_helper(item) {
        let index = this.internal.findIndex((test) => test.id === item.id);
        this.internal.splice((index === -1) ? this.internal.length : index, index !== -1, item);
        return new Promise((success, error) => success());
    }
}
