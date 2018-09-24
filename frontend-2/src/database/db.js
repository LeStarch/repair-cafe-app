import {inject} from "aurelia-framework";
import {Config} from "config";
/**
 * DB:
 *
 * This class represents the database interface. Based on what backend-database
 * is configured, this will change behavior. For example, it could defer to a
 * test database or a real database.
 *
 * @author lestarch
 */
 @inject(Config)
export class DB {
    /**
     * Constructor to inject config.
     */
    constructor(config) {
        this.CONFIG = config;
        this.helper = new this.CONFIG.SYS_DB(config);
    }
    /**
     * Gets a new sequential ID for the given type.
     * @param indexer: a token used to create unique IDs
     */
    getNewId(indexer) {
        return this.helper.getNewId(indexer);
    }
    /**
     * Stores an object into our fake database
     * @param obj: object to database
     */
    saveObject(obj) {
        return this.helper.saveObject(obj);
    }
    /**
     * Get a list of objects of a specific type.
     * @param type: type of object
     */
     getObjects(type) {
         return this.helper.getObjects(type);
     }
}
