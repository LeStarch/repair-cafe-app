import {TestDB} from "database/test-db"
import {ConfigurablePipelineLifecycle} from "models/lifecycle"
/**
 * Config:
 *
 * This class represents the configuration values that run this system.
 *
 * @author lestarch
 */
export class Config {
    /**
     * System properties:
     *
     * Properties pertaining to the system as a whole. This allows the user to
     * configure things like databases etc.
     */
    SYS_DB = TestDB;
    LIFECYCLE_CLASS = ConfigurablePipelineLifecycle;
    PIPELINE_STATES = [
        {"name": "check-in", "message": "Item to be checked-in"}
    ];
    OFFNOMINAL_STATES = [
        {"name": "unfixable", "message": "Item could not be fixed"}
    ];
    /**
     * Model properties:
     *
     * These properties affect the underlying data models of the system. When a
     * model needs a configurable type property they can be specified here.
     */
    ORDER_TYPES = ["Tinkerer", "Tailor", "Soldier", "Spy"];
    /**
     * Display properties:
     *
     * These properties affect the display of various strings in the system.
     * This is used to customize types for the user without affecting the
     * underlying codebase.
     */
    SHORT_DISPLAY = "Repair Item"; //Displayed name for short desc
    LONG_DISPLAY = "Problem Description"; //Displayed name for long desc
    TICKET_DISPLAY = "Repair"; //Displayed name of "Ticket" object
    APP_TITLE = "Repair Cafe App"; //Title added to the display
    /**
     * FORM_* properties:
     *
     * Used to set the various classes that applied to the form and controls.
     * The as-shipped values seen here are used to setup bootstrap classes,
     * however; users can reconfigure this section to use different classes
     * to change the displays.
     */
     FORM_CLASS = "form-group";
     FORM_CONTROL_CLASS = "form-control";
     FORM_SUBMIT_CLASS = "btn btn-success";
     /**
      * Testing properties:
      *
      * Properties set for testing purposes.
      */
      TEST_DB_DELAY = 500;
      TEST_FORCE_ERROR = false;
}
