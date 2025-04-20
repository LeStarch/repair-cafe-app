//import {Repair} from "./models/repair"
import {Config} from "../config.js"

function elastic_error(response) {
    response = JSON.parse(this.responseText);

}

export class WebApi {
    static ajax(url, method, user, password, data) {
        return new Promise(function(success,error) {
            try {
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState === 4 ) {
                        let response = JSON.parse(this.responseText);
                        if (this.status >= 200 && this.status <= 299) {
                            success(response);
                        }
                        else {
                            error(response);
                        }
                    }
                };
                //ID is not valid for ES, so we should post directly to the URL
                //console.log("[INFO] Opening: '" + url + "' with " + method);
                xhttp.open(method, url , true);
                if (typeof(user) !== "undefined" && user != null &&
                    typeof(password) != "undefined" && password != null) {
                    xhttp.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + password));
                }
                //console.log("[INFO] Sending data: " + JSON.stringify(data));
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.setRequestHeader("Cache-Control", "no-cache");
                if (method === "POST" || method === "PUT")
                {
                    xhttp.send(JSON.stringify(data), true);
                } else {
                    xhttp.send(null, true);
                }
            }
            catch (e)
            {
                console.log("[ERROR] "+e);
                error(new Error(e));
            }
        });
    }
}

export class Elastic extends WebApi{
    // Known errors to exclude when making Elastic calls
    static KNOWN_ERRORS = {
        "resource_already_exists_exception": /.*/,
        "query_shard_exception": /No mapping found for \[.*\] in order to sort on$/
    };
    // Throttles for known errors types
    static THROTTLES = {};
    
    /**
     * Elastic search interface code
     * @param api_url_snippet: snippet of the API
     * @param type: type of the document
     * @param method: http method
     * @param data: data to submit with post
     */
    static elastic(api_url_snippet,type,method,data) {
        return new Promise(function(success,error) {
            WebApi.ajax(Config.ES_URL + "/" + api_url_snippet, method, Config.ES_USER, Config.ES_PASSWORD, data)
                .then(success)
                .catch((response) => {
                    // Filter out known errors and add a single console message for each
                    let error_type = ((response.error || {}).root_cause || [{}])[0].type;
                    let reason = ((response.error || {}).root_cause || [{}])[0].reason;
                    // Iterate over known errors looking for matching errors
                    for (let known_error_type in Elastic.KNOWN_ERRORS) {
                        let reason_matcher = Elastic.KNOWN_ERRORS[error_type];
                        if (reason_matcher.test(reason)) {
                            // Throttle error messages
                            if ((Elastic.THROTTLES[reason] || 0) < 1) {
                                console.log(`[WARNING] Error '${reason}' (${error_type}} occured. This happens at start-up.`);
                                Elastic.THROTTLES[reason] = (Elastic.THROTTLES[reason] || 0) + 1;
                            }
                            // Discard known errors
                            return;
                        }
                    }
                    // Not a known error
                    console.log(`[ERROR] ES Errored with: ${reason} (${error_type})`);
                    error(new Error(response.error));
                });
        });
    }
    /**
     * Elastic Search interaction - POST / create
     * @param index - index to POST to
     * @param type - type of object to create
     * @param metadata - metadata blob to post a creation for
     */
    static elasticPost(index,type,metadata) {
        let id = ("id" in (metadata || {})) ? metadata.id : "";
        let snippet = `${index}/_doc/${id}`;
        return Elastic.elastic(snippet,type,"POST",metadata);
    };
    /**
     * List entries in the index
     * @param index: elastic search index
     * @param type: type for elastic search
     */
    static elasticList(index,type) {
        let snippet = `${index}/_search?size=1000&version=true`;
        snippet += "&sort=numerical_id";
        return Elastic.elastic(snippet,type,"GET",{});
    }
    /**
     * Get an item from elastic search
     * @param index: elastic search index
     * @param type: elastic search type
     * @param id: identitiy to get
     */
    static elasticGet(index,type,id) {
        let snippet = `${index}/_doc/${id}`
        return Elastic.elastic(snippet,type,"GET",{});
    }
    /**
     * Delete an item from elastic search
     * @param index: elastic search index
     * @param type: elastic search type
     * @param id: identitiy to get
     */
    static elasticDelete(index, type, id) {
        let snippet = `${index}/_doc/${id}`
        return Elastic.elastic(snippet,type,"DELETE",{"id":id});
    }
}
