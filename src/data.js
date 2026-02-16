import {Config} from "./config.js";
import {ElasticDatabase, LocalDatabase} from "./database/object-api.js"

// Setup and export some databases
let db_type = (Config.USE_LOCAL_STORAGE) ? LocalDatabase : ElasticDatabase;
export let _data = {
    config: Config,
    event_info: {},
    local: {
        database_index: "repairs-" + Config.INDEX_MODULATION,
    }
};

/**
 * Sets up the database entries from the given item caches.
 * @param repairCache: cache for repairs, or undefined if it should be created
 * @param repairerCache: cache for repairers or undefined if it should be created
 * @param repairCafeindiciesCache: cache for repair cafe indicies or undefined if it should be created
 * @param repairerIndiciesCache: cache for repairer indicies or undefined if it should be created
 */
export function setupData(repairCache, repairerCache, repairCafeindiciesCache, repairerIndiciesCache) {
    Object.assign(_data, {
        repair: new db_type(Config.REPAIR_INDEX, Config.REPAIR_TYPE, repairCache, repairCafeindiciesCache),
        repairer: new db_type(Config.REPAIRER_INDEX, Config.REPAIRER_TYPE, repairerCache, repairerIndiciesCache)
    });
}
