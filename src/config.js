import {ElasticConfig} from './environment.js'
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
    static USE_LOCAL_STORAGE = true;
    static types = ["Tinkerer", "Tailor", "Bike", "Soil"];
    static skills = ["electronics","micro-electronics","sewing", "adhesives", "explosives"];
    static COUNTER_INDEX = "tickets"+ElasticConfig.INDEX_MODULATION;
    static COUNTER_TYPE = "ticket";
    static REPAIR_INDEX = "repairs"+ElasticConfig.INDEX_MODULATION;
    static REPAIR_TYPE = "repair";
    static REPAIRER_INDEX = "repairers"+ElasticConfig.INDEX_MODULATION;
    static REPAIRER_TYPE = "repairer";
    static ES_URL = ElasticConfig.ES_URL;
    static ES_USER = "rcuser";
    static ES_PASSWORD = "ginko!2017RC";
    static UPDATE_INTERVAL = 5000;
    //Global variables
    static ADVANCED = true;
    static FILTER = "";

    static COMMON_REPAIRS = {
        "tinkerer": ["N/A", "Replace Fuse", "Cleaning", "Replace Cord", "Soldering", "Adhesive Repair"],
        "tailor": ["N/A", "Replace Button", "Fix Zipper", "Mend Tear"],
        "bike": ["N/A", "Change Wheel", "Do Bike Things"],
        "soil": ["N/A", "Seed Microbes"]
    };
}
