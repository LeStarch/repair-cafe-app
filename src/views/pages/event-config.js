import {TEMPLATE} from "./event-config.template.js"
import {WebApi} from "../../database/elastic.js";

export let COMPONENT = {
    template: TEMPLATE,
    data: function () {
        return {
            "time_error": null,
            "time_response": null
        };
    },
    methods: {
        setTime: function () {
            // Get the current time in seconds since the epoch
            let eventTime = Math.round(Date.now() / 1000.0);
            // Disable the button while the request is being processed
            let button = document.getElementById("set-time");
            button.disabled = true;
            // Set time on the backing server
            console.log("Event time set to: " + eventTime);
            WebApi.ajax("/app/set-time", "POST", null, null, {
                "time": eventTime
            }).then((response) => {
                // Re-enable the button after the request is processed
                button.disabled = false;
                this.time_response = new Date(Math.round(response.new_time * 1000));
                this.time_error = null;
            }).catch((error) => {
                console.error("Error setting time: " + error);
                // Re-enable the button after the request is processed
                button.disabled = false;
                this.time_error = error.error || "Unknown error";
                this.time_error = null;
            });
        }
    },
};