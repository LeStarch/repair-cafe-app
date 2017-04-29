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
    static COUNTER_INDEX = "tickets";
    static COUNTER_TYPE = "ticket";
    static REPAIR_INDEX = "repairs";
    static REPAIR_TYPE = "repair";
    static ES_URL = "<es-goes-here>";
    //Global variables
    static ADVANCED = false;
    static FILTER = "";
}
