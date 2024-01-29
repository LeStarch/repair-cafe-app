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
    static types = ["Tinker", "Stitch", "Knife", "Jewelry", "Computer", "Woodwork", "Adhesive", "Bike", "Gardening"];
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
    static PRINTER_MAP = {
        "P2": "86:67:7a:03:98:e0",
        "P1": "86:67:7a:8d:eb:63",
        "P3": "86:67:7a:8a:b7:ac"
    };
    static COUNTER_INDEX = "tickets"+ElasticConfig.INDEX_MODULATION;
    static COUNTER_TYPE = "ticket";
    static REPAIR_INDEX = "repairs"+ElasticConfig.INDEX_MODULATION;
    static REPAIR_TYPE = "repair";
    static REPAIRER_INDEX = "repairers"+ElasticConfig.INDEX_MODULATION;
    static REPAIRER_TYPE = "repairer";
    static ES_URL = ElasticConfig.ES_URL;
    static ES_USER = "rcuser";
    static ES_PASSWORD = "ginko!2017RC";
    static UPDATE_INTERVAL = 1000;

    static COMMON_REPAIRS = {
        "tinker":  ["N/A", "Replace Fuse", "Cleaning", "Replace Cord", "Soldering", "Adhesive Repair"],
        "stitch": ["N/A", "Replace Button", "Fix Zipper", "Mend Tear"],
        "knife": ["N/A"],
        "bike": ["N/A", "Change Wheel", "Do Bike Things"],
        "soil": ["N/A", "Seed Microbes"]
    };
}
