// For loval testing
import {Repair} from "../models/repair.js";
import {Repairer} from "../models/repairer.js";
/**
 * High-level api for persisting the objects for more specific APIs. This will handle the saving and returning of data
 * in a generic way. This API allows for both local and non-local storage depending on the configuration.
 *
 * @author lestarch
 */
let TEST_DATA={
    "repairer": [
        new Repairer("Fenneko I.", "FennI@cmtc.com", ["electronics", "micro-electronics", "explosives"]),
        new Repairer("Washimi K.", "washimi@cmtc.com", ["sewing", "adhesives"])],
    "repair": [
        new Repair("Kabae T.", "KabaeT@cmtc.com", "Tinkerer", true),
        new Repair("D. Gori", "gori@cmtc.com", "Tailor", false)
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
        let _self = this;
        setTimeout(() => { _self.refresh() }, 500);
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
        let index = this.items.findIndex((test) => test.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
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
    refresh() {
        let _self = this;
        return new Promise((success, error) => {
            _self.items.splice(0, _self.items.length, ..._self.items);
            success(_self.items)
        });
    }

    /**
     * Get an item by the given id.
     * @param id: id of the item to return
     */
    get(id) {
        return new Promise(
            (success, error) => {
                let items = this.items.filter((item) => item.id === id);

                // Check if we found the ID
                if (items.length === 0) {
                    error(new Error("[LocalDB] Failed to find item with id " + id ));
                } else if (items.length > 1) {
                    error(new Error("[LocalDB] Found too many items with id " + id ));
                } else {
                    success(items[0]);
                }
            }
        );
    }

    /**
     * Save the item to the local store
     * @param item: item to save
     */
    save(item) {
        let index = this.items.findIndex((test) => test.id === item.id);
        this.items.splice((index === -1) ? this.items.length : index, index !== -1, item);
        return new Promise((success, error) => success());
    }
}
