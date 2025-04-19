import {TEMPLATE} from "./event-config.template.js"
import {WebApi} from "../../database/elastic.js";

export let COMPONENT = {
    template: TEMPLATE,
    data: function () {
        return {
            "server_count": 1,
            "time_error": null,
            "remaining": 0,
        };
    },
    methods: {
        setTime: function () {
            this.time_error = null;
            // Get the current time in seconds since the epoch
            let eventTime = Math.round(Date.now() / 1000.0);
            // Disable the button while the request is being processed
            let button = document.getElementById("set-time");
            button.disabled = true;
            // Set time on the backing server
            console.log("Setting event time to: " + eventTime);
            this.remaining = this.server_count;
            for (let i = 0; i < this.server_count; i++) {
                WebApi.ajax("/set-time", "POST", null, null, {
                    "time": eventTime
                }).then((response) => {
                    this.remaining = this.remaining - 1;
                    console.log("Set times remaining: " + this.remaining);
                    // Check if this is the last response before re-enabling the button
                    if (this.remaining == 0) {
                        button.disabled = false;
                    }
                }).catch((error) => {
                    this.remaining = this.remaining - 1;
                    console.error("Error setting time: " + (error.error || "unknown") +
                                  " remaining: " + this.remaining);
                    this.time_error = error.error || "Unknown error";
                    // Check if this is the last response before re-enabling the button
                    if (this.remaining == 0) {
                        button.disabled = false;
                    }
                });
            }
        }
    },
};