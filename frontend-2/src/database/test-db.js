import {inject} from "aurelia-framework"
import {Config} from "config"
/**
 * TestDB:
 *
 * A version of the database that is used to test the system without actually
 * deferring to permanent backend. This is useful for debugging purposes.
 *
 * @author lestarch
 */
 @inject(Config)
export class TestDB {
    ids = {};
    objs = {};
    /**
     * Constructor to inject config.
     */
    constructor(config) {
        this.CONFIG = config;
    }
    /**
     * Gets a new sequential ID for the given type.
     * @param indexer: a token used to create unique IDs
     */
    getNewId(indexer) {
        let self = this;
        return new Promise(
            //Function to run, and call callback.
            function(success, error) {
                if (typeof(self.ids[indexer]) === "undefined") {
                    self.ids[indexer] = 0;
                }
                //Grab newid
                let newid = self.ids[indexer];
                self.ids[indexer]++;
                //Set a timeout with simulated ID
                setTimeout(function() {
                    if (self.CONFIG.TEST_FORCE_ERROR) {
                        error("Test error forced");
                    } else {
                        success(indexer + "-" + newid);
                    }
                }, self.CONFIG.TEST_DB_DELAY);
            }
        );
    }
    /**
     * Stores an object into our fake database
     * @param obj: object to database
     */
    saveObject(obj) {
        let self = this;
        let type = typeof(obj);
        return new Promise(
            //Function to run, and call callback.
            function(success, error) {
                self.objs[type][obj.id] = obj;
                //Set a timeout with simulated ID
                setTimeout(function() {
                    if (self.CONFIG.TEST_FORCE_ERROR) {
                        error("Test error forced");
                    } else {
                        success();
                    }
                }, self.CONFIG.TEST_DB_DELAY);
            }
        );
    }
    /**
     * Get a list of objects of a specific type.
     * @param type: type of object
     */
    getObjects(type) {
        let self = this;
        return new Promise(
            //Function to run, and call callback.
            function(success, error) {
                let keys = Object.keys(self.objs[type]);
                let vals = [];
                for (let i = 0; i < keys.length; i++) {
                    vals.push(self.objs[type][keys[i]]);
                }
                //Set a timeout with simulated ID
                setTimeout(function() {
                    if (self.CONFIG.TEST_FORCE_ERROR) {
                        error("Test error forced");
                    } else {
                        success(vals);
                    }
                }, self.CONFIG.TEST_DB_DELAY);
            }
        );
    }
}
