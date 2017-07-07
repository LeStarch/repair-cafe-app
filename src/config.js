import {ElasticConfig} from './environment'
/**
 * A class containing configuration for the repair cafe app.
 * This implementation uses static variables so access to these variables
 * must be done using fully qualified names.
 *
 * Note: do not instantiate this class.
 *
 * @author lestarch
 */
export class Config {
    static types = ["Tinker", "Tailor", "Soldier", "Spy"];
    static skills = ["electronics","micro-electronics","sewing"];
    static COUNTER_INDEX = "tickets";
    static COUNTER_TYPE = "ticket";
    static REPAIR_INDEX = "repairs";
    static REPAIR_TYPE = "repair";
    static REPAIRER_INDEX = "repairers";
    static REPAIRER_TYPE = "repairer";
    static ES_URL = ElasticConfig.ES_URL;
    static ES_USER = "rcuser";
    static ES_PASSWORD = "ginko!2017RC";
    static UPDATE_INTERVAL = 1000;
    //Global variables
    static ADVANCED = false;
    static FILTER = "";
}
