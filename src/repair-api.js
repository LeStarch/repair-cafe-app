import {Repair} from "./models/repair"
import {Elastic} from "./elastic"
import {Config} from "./config"
/**
 * High-level api for repair persistence allowing user to get a
 * repair by ID, list a set of ids, and save repairs.
 *
 * This implementation uses an Elastic search backend.
 *
 * @author lestarch
 */
export class RepairAPI {
    /**
     * Process an individual ES result
     * @param result: es result to process
     * @returns: a repair object
     */
    static processResult(result) {
        var processed = result._source;
        //Remap the id field
        processed.id = result._id;
        return Repair.demarshall(processed);
    }
    /**
     * Get the next unique id
     */
    static getNextId(station) {
        return new Promise(
            function(success, error) {
                var data = {"id":station.toLowerCase()};
                Elastic.elasticPost(Config.COUNTER_INDEX,
                                    Config.COUNTER_TYPE, data).then(
                    function(result) {
                        success(result["_version"]);
                    }, error);
            });
    }
    /**
     * Get a listing of repairs
     */
    static getRepairList() {
        return new Promise(
            function(success, error) {
                Elastic.elasticList(Config.REPAIR_INDEX,
                                    Config.REPAIR_TYPE).then(
                    function(results) {
                        if (!("hits" in results) ||
                            !("hits" in results.hits)) {
                            error(new Error("[ERROR] Got invalid result set: "+
                                            JSON.stringify(results)));
                        }
                        //Process results
                        var ret = [];
                        for (var i = 0; i < results.hits.hits.length; i++) {
                            ret.push(RepairAPI.processResult(results.hits.hits[i]));
                        }
                        success(ret);
                    }, error);
            });
    }
    /**
     * Get a repair by given ID
     * @param id: id to get from elastic search
     */
    static getRepair(id) {
        return new Promise(
            function(success, error) {
                Elastic.elasticGet(Config.REPAIR_INDEX,
                                    Config.REPAIR_TYPE, id).then(
                    function(result) {
                        if (!("_source" in result)) {
                            error(new Error("[ERROR] Got invalid result: "+
                                            JSON.stringify(result)));
                        }
                        success(RepairAPI.processResult(result));
                    }, error);
            });
    }
    /**
     * Save the repair
     * @param repair: repair to save
     */
    static saveRepair(repair) {
        return new Promise(
            function(success, error) {
                var data = repair.marshall();
                Elastic.elasticPost(Config.REPAIR_INDEX,
                                    Config.REPAIR_TYPE, data).then(
                    function(result) {
                        success(result);
                    }, error);
            });
    }
    /**
     * Delete the repair
     * @param repair: repair to delete
     */
    static deleteRepair(id) {
        return new Promise(
            function(success, error) {
                Elastic.elasticDelete(Config.REPAIR_INDEX,
                                    Config.REPAIR_TYPE, id).then(
                    function(result) {
                        success(result);
                    }, error);
            });
    }
}
