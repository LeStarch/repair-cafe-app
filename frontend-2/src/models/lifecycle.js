import {Config} from "adaptation/config"
import {State} from "models/state"
/**
 * Lifecycle:
 *
 *  A generic class which holds the lifecycle of a ticket. A lifecycle is
 *  composed of states. Specific lifecycles can be a single state, multiple
 *  states, linear or nonlinear.
 *
 *  Example: (repair cafe application) this would represent the status of the
 *           repair, including a message, and state name. Likely it will defer
 *           to the ConfigurablePipelineStatus to supply a list of states.
 *
 * @author lestarch
 */
export class Lifecycle {
    /**
     * Returns a new lifecycle whose implementing subclass is driven from
     * adaptation configuration.
     * @return: configured, constructed lifecycle
     */
    static newObject() {
        switch (Config.LIFECYCLE_CLASS) {
            case "ConfigurablePipelineLifecycle":
                return new ConfigurablePipelineLifecycle();
                break;
            default:
                throw new Error("[ERROR] " + Config.LIFECYCLE_CLASS +
                                " does not exist");
                break;
        }
    }
}
/**
 * ConfigurablePipelineStatus:
 *
 *  A configurable version of the status used to create a basic pipeline of
 *  states with optional non-pipeline end states representing non-traditional
 *  end states like "will-not-fix". The pipeline states transition linearly
 *  while the offnominal end states do not allow normal transitions.
 *
 *  Example: (repair cafe application) this will be confiugred with the states:
 *            "check-in", "triage", "in-repair", "finished", and "checkout". It
 *            would have the out-of-band end state of "won't-fix".
 */
class ConfigurablePipelineLifecycle extends Lifecycle {
    /**
     * Constucts new lifecycle pipeline from two lists: pipeline, and offnominal
     * states. Pipeline states are normal linear in-band states representing
     * a pipeline, and offnominal represent abnormal ending states. If not
     * provided, then these values will be read from adaptation configuration
     * using the PIPELINE_STATES/OFFNOMINAL_STATES. These configurations, either
     * passed in or from the aforementioned configuration keys, consist of a
     * list of anonymous objects containing "name": <name>, "message": <message>
     * key/value pairs from which the states will be built.
     * @param pipeline: (optional)linear normal pipeline state names
     * @param offnominal: abnormal ending state state name
     * @throws Exception on bad pipeline config
     */
    constructor(pipeline, offnominal) {
        super();
        this.index = 0;
        //Check if supplied, if not read from configuration
        if (typeof(pipeline) == "undefined") {
            pipeline = Config.PIPELINE_STATES;
        }
        if (typeof(offnominal) == "undefined") {
            offnominal = Config.OFFNOMINAL_STATES;
        }
        //Check for defined
        if (!Array.isArray(pipeline) || !Array.isArray(offnominal)) {
            throw new Error("[ERROR] ConfigurablePipelineLifecycle " +
                            "improperly configured. Found: " +
                             typeof(pipeline) + " and " + typeof(offnominal));
        }
        //Loop through our lists converting objects to states
        var inputs = [pipeline, offnominal];
        var outputs = [[], []];
        for (var i = 0; i < inputs.length; i++) {
            for (var j = 0; j < inputs[i].length; j++) {
                outputs[i].push(new State(inputs[i].name, inputs[i].message));
            }
        }
        //Assign the converted pipelines
        this.pipeline = outputs[0];
        this.offnominal = outputs[1];
    }
    /**
     * Gets the current state from this pipeline. This method should be
     * implemented for each variant of status.
     * @throws Exception when the index is in invalid state
     * @return: current state
     */
    getState() {
        //If the index is outside the pipeline, use offnominal
        if (index >= (this.pipeline.length + this.offnominal.length)) {
            throw Error("[ERROR] Invalid state index: " + this.index);
        } else if (index >= this.pipeline.length) {
            return this.ofnominal[index - this.pipeline.length];
        } else {
            return this.pipeline[index]
        }
    }
    /**
     * Get the pipeline stages
     * @return: pipelined states
     */
     getPipeline() {
         return this.pipeline;
     }
     /**
      * Get the offnominal stages
      * @return: offnominal states
      */
      getOffnominal() {
          return this.offnominal;
      }
}
