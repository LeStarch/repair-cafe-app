import {TEMPLATE} from "./event-config.template.js"
import {WebApi} from "../../database/elastic.js";

export let COMPONENT = {
    template: TEMPLATE,
    inject: ["event_info", "local_data"],
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
        // Bootstrap until printer data loaded
        this.local_data.printer = {"name": "Unknown"};
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
                if (this.local_data.printer.name == "Unknown" && this.event_info.printers.length > 0) {
                    this.local_data.printer = this.event_info.printers[0];
                }
            }
            // Errors result
            ).catch((error) => {
                this.event_configuration_error = error.error || error.responseText || "Unknown error";
            });
        },
        setLocationInfo: function () {
            // Get the event location and host information
            WebApi.ajax("/app/set-location-info", "POST", null, null, this.event_info || {}).then((response) => {
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
            // Set time on the backing server
            WebApi.ajax("/app/set-time", "POST", null, null, {
                "time": eventTime
            }).then((response) => {
                this.getTime();
            }).catch((error) => {
                console.error("Error setting time: " + error);
                this.time_error = error.error || error.responseText || "Unknown error";
                this.time_error = null;
            });
        },
        testTicket: function() {
            WebApi.ajax("/app/print-ticket", "POST", null, null,
                {
                    "id": "STARCH-42",
                    "name": "Scoops The Magnificant",
                    "team": "Starch",
                    "item": "Yellow Toaster",
                    "problem": "Once upon a midnight dreary, as I pined for toast all smeary, there came a crack-crack-cracking from my toaster that twas no more.",
                    "printer": this.local_data.printer.mac
                }
            );
        }
    },
};