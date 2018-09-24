import {Config} from "config"
import {bindable, inject} from 'aurelia-framework';
/**
 * EditOrder:
 *
 * Backend for edit-order view used to inject configuration fields to change the
 * displayed labels. In addition it sets up the bound fields in order to
 * show/hide the long description entry field.
 *
 * @author lestarch
 */
@inject(Config)
export class EditOrderCustomElement {
     @bindable order; //Order, used for editing the order fields
     @bindable minimal; //bool, used to hide the long description field
    /**
     * Inject the configuration and use it to inform the view.
     * @param config: configuration object
     */
    constructor(config) {
        this.CONFIG=config;
    }
}
