import {TEMPLATE} from "./event-config.template.js"
import {WebApi} from "../../database/elastic.js";

export let COMPONENT = {
    template: TEMPLATE,
    props: ["event_info"],
    data: function () {
        return {
            "time_error": null,
            "time_response": null,
            "error": null,
        };
    },
    created: function() {
        // Initialize the component
        this.getTime();
        this.getLocationInfo();
    },
    methods: {
        setEventConfig: function () {
            this.setTime();
            this.setLocationInfo();
        },
        getLocationInfo: function () {
            // Get the event location and host information
            WebApi.ajax("/app/get-location-info", "GET", null, null, null).then((response) => {
                this.event_configuration_error = null
                Object.assign(this.event_info, response);
            }
            // Errors result
            ).catch((error) => {
                this.event_configuration_error = error.error || error.responseText || "Unknown error";
            });
        },
        setLocationInfo: function () {
            // Get the event location and host information
            WebApi.ajax("/app/set-location-info", "POST", null, null, this.event_configuration || {}).then((response) => {
                this.getLocationInfo();
            }
            // Errors result
            ).catch((error) => {
                this.event_configuration_error = error.error || error.responseText || "Unknown error";
            });
        },
        getTime: function () {
            WebApi.ajax("/app/get-time", "GET", null, null, null).then((response) => {
                // Set the time response to the current time
                let current_server_time = new Date(Math.round(response.current_time * 1000));
                if (Math.abs(new Date() - current_server_time) > 60000) {
                    this.time_response = null;
                    this.time_error = `Server time is out of sync: ${current_server_time.toString()}`;
                } else {
                    this.time_error = null;
                    this.time_response = `Server time in-sync: ${current_server_time.toString()}`;
                }
            }
            // Errors result
            ).catch((error) => {
                this.time_error = error.error || error.responseText || "Unknown error";
                this.time_response = null;
            });
        },
        setTime: function () {
            // Get the current time in seconds since the epoch
            let eventTime = Math.round(Date.now() / 1000.0);
            // Disable the button while the request is being processed
            let button = document.getElementById("update-config");
            button.disabled = true;
            // Set time on the backing server
            WebApi.ajax("/app/set-time", "POST", null, null, {
                "time": eventTime
            }).then((response) => {
                this.getTime();
                button.disabled = false;
            }).catch((error) => {
                console.error("Error setting time: " + error);
                // Re-enable the button after the request is processed
                button.disabled = false;
                this.time_error = error.error || error.responseText || "Unknown error";
                this.time_error = null;
            });
        }
    },
};