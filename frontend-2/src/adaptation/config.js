/**
 * Config:
 *
 *  This class holds all the configuration for the specific adaptation of this
 *  code. This allows the generic ticketing engine to be adapted rapidly for a
 *  specific purpose.
 *
 *  Example: (repair cafe application) this is where most of the code goes to
 *           make this the "repair cafe application".
 * @author lestarch
 */
export class Config {
    static LIFECYCLE_CLASS = "ConfigurablePipelineLifecycle";
    static PIPELINE_STATES = [
        {"name": "check-in", "message": "Item to be checked-in"}
    ];
    static OFFNOMINAL_STATES = [
        {"name": "unfixable", "message": "Item could not be fixed"}
    ];
}
