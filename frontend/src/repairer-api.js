import {Repairer} from "./models/repairer"
import {Elastic} from "./elastic"
import {Config} from "./config"
/**
 * High-level api for repairer persistence allowing user to get a
 * repairer by ID, list a set of ids, and save repairers.
 *
 * This implementation uses an Elastic search backend.
 *
 * @author lestarch
 */
export class RepairerAPI {
    /**
     * Process an individual ES result
     * @param result: es result to process
     * @returns: a repairer object
     */
    static processResult(result) {
        var processed = result._source;
        //Remap the id field
        processed.id = result._id;
        return Repairer.demarshall(processed);
    }
    /**
     * Get the next unique id
     */
    static getNextId() {
        return new Promise(
            function(success, error) {
                var data = {"id":"repairer"};
                Elastic.elasticPost(Config.COUNTER_INDEX,
                                    Config.COUNTER_TYPE, data).then(
                    function(result) {
                        success(result["_version"]);
                    }, error);
            });
    }
    /**
     * Get a listing of repairers
     */
    static getRepairerList() {
        return new Promise(
            function(success, error) {
                Elastic.elasticList(Config.REPAIRER_INDEX,
                                    Config.REPAIRER_TYPE).then(
                    function(results) {
                        if (!("hits" in results) ||
                            !("hits" in results.hits)) {
                            error(new Error("[ERROR] Got invalid result set: "+
                                            JSON.stringify(results)));
                        }
                        //Process results
                        var ret = [];
                        for (var i = 0; i < results.hits.hits.length; i++) {
                            ret.push(RepairerAPI.processResult(results.hits.hits[i]));
                        }
                        success(ret);
                    }, error);
            });
    }
    /**
     * Get a repairer by given ID
     * @param id: id to get from elastic search
     */
    static getRepairer(id) {
        return new Promise(
            function(success, error) {
                Elastic.elasticGet(Config.REPAIRER_INDEX,
                                    Config.REPAIRER_TYPE, id).then(
                    function(result) {
                        if (!("_source" in result)) {
                            error(new Error("[ERROR] Got invalid result: "+
                                            JSON.stringify(result)));
                        }
                        success(RepairerAPI.processResult(result));
                    }, error);
            });
    }
    /**
     * Save the repairer
     * @param repairer: repairer to save
     */
    static saveRepairer(repairer) {
        return new Promise(
            function(success, error) {
                var data = repairer.marshall();
                Elastic.elasticPost(Config.REPAIRER_INDEX,
                                    Config.REPAIRER_TYPE, data).then(
                    function(result) {
                        success(result);
                    }, error);
            });
    }
    /**
     * Delete the repairer
     * @param repairer: repairer to delete
     */
    static deleteRepair(id) {
        return new Promise(
            function(success, error) {
                Elastic.elasticDelete(Config.REPAIRER_INDEX,
                                    Config.REPAIRER_TYPE, id).then(
                    function(result) {
                        success(result);
                    }, error);
            });
    }
}
