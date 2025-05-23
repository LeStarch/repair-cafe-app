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
    static USE_LOCAL_STORAGE = false;
    static types = ["Tinkerer", "Stitch", "Knife", "Jewelry", "Computer", "Woodwork", "Adhesive", "Bike", "Gardening"];
    static skills = [
        "adhesives",
        "appliances",
        "electronics",
        "mechanical",
        "sharpening",
        "stitching (hand)",
        "stitching (machine)",
        "verrückt"
    ];
    // Ticket counter configuration
    static COUNTER_INDEX = "tickets"+ElasticConfig.INDEX_MODULATION;
    static COUNTER_TYPE = "ticket";
    // Index configuration
    static REPAIR_INDEX = "repairs"+ElasticConfig.INDEX_MODULATION;
    static REPAIR_TYPE = "repair";
    static REPAIRER_INDEX = "repairers"+ElasticConfig.INDEX_MODULATION;
    static REPAIRER_TYPE = "repairer";
    // ES User configuration
    static ES_URL = ElasticConfig.ES_URL;
    static ES_USER = "rcuser";
    static ES_PASSWORD = "ginko!2017RC";
    // Time in milliseconds between updates to repair/repairer lists
    static UPDATE_INTERVAL = 1000;

    static COMMON_REPAIRS = {
        "tinker":  ["N/A", "Replace Fuse", "Cleaning", "Replace Cord", "Soldering", "Adhesive Repair"],
        "stitch": ["N/A", "Replace Button", "Fix Zipper", "Mend Tear"],
        "knife": ["N/A"],
        "bike": ["N/A", "Change Wheel", "Do Bike Things"],
        "soil": ["N/A", "Seed Microbes"]
    };
}
