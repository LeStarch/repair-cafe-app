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
    static types = ["Tinker", "Stitcher", "Speciality"];
    static skills = ["electrical", "electronics","mechanical","computer", "stitching"];
    static reservations = ["none", "eventbrite", "volunteer", "friends"];
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
    static TELE_URL="/flask";
    //Global variables
    static ADVANCED = false;
    static FILTER = "";
    //Wireless providers
    static PROV_MAP = {
        "AllTel":"number@text.wireless.alltel.com",
        "AT&T":"number@txt.att.net",
        "Boost Mobile":"number@myboostmobile.com",
        "Cricket":"number@sms.mycricket.com",
        "Sprint":"number@messaging.sprintpcs.com",
        "T-Mobile":"number@tmomail.net",
        "US Cellular":"number@email.uscc.net",
        "Verizon":"number@vtext.com",
        "Virgin Mobile":"number@vmobl.com"
    };
}
