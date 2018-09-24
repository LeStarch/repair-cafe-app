import {Config} from "config"
import {bindable, inject} from 'aurelia-framework';
/**
 * EditClient:
 *
 * Backend for edit-client view used to inject configuration fields to change
 * the displayed labels. In addition it sets up the bound fields in order to
 * show/hide the long description entry field.
 *
 * @author lestarch
 */
@inject(Config)
export class EditClientCustomElement {
     @bindable client; //Client, used for editing the order fields
    /**
     * Inject the configuration and use it to inform the view.
     * @param config: configuration object
     */
    constructor(config) {
        this.CONFIG=config;
    }
}
