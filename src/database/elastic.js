/**
 * ElasticSearch and REST API interface code
 * 
 * This code is used to interface with the ElasticSearch, and REST APIs.
 */
import {Config} from "../config.js"

/**
 * WebApi class: interact with asynchronous web APIs
 */
export class WebApi {
    /**
     * AJAX helper function used to make AJAX calls to a backend server
     * 
     * This function is used to make AJAX calls to a backend server. It uses the XMLHttpRequest object to make the call
     * and returns a promise that resolves with the response data.
     * 
     * Users can supply the url, HTTP method, user and password for basic authentication, and the data to be sent.
     * 
     * @param {string} url: url to call via AJAX 
     * @param {string} method: HTTP method to use (GET, POST, PUT, DELETE) 
     * @param {string} user: user name for basic authentication 
     * @param {string} password: password for basic authentication
     * @param {Object} data: data to be sent with the request (will be stringified) 
     * @returns Promise: a promise that resolves with the response data
     */
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
                xhttp.open(method, url , true);
                if (typeof(user) !== "undefined" && user != null &&
                    typeof(password) != "undefined" && password != null) {
                    xhttp.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + password));
                }
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
/**
 * Elastic class: interface with the ElasticSearch API
 * 
 * Extends the WebApi class to provide a more specific interface for the ElasticSearch API.
 */
export class Elastic extends WebApi{
    // Known errors to exclude when making Elastic calls
    static KNOWN_ERRORS = {
        "resource_already_exists_exception": /.*/,
        "query_shard_exception": /No mapping found for \[.*\] in order to sort on$/
    };
    // Throttles for known errors types
    static THROTTLES = {};
    
    /**
     * Calls the ElasticSearch API using AJAX
     * 
     * This function is used to make AJAX calls to the ElasticSearch API. It uses the WebApi class to make the calls
     * based on the configuration settings in the Config class.
     * 
     * @param api_url_snippet: snippet URL of the API (e.g. "index/type/id")
     * @param type: type of the document. Unused in modern ES.
     * @param method: http method to use (GET, POST, PUT, DELETE)
     * @param data: data to submit with post
     * @return Promise: a promise that resolves with the response data
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
                        // Matching errors will result in a warning log message that is throttled
                        if (known_error_type == error_type &&
                            Elastic.KNOWN_ERRORS[known_error_type].test(reason)) {
                            // Throttle error messages
                            if ((Elastic.THROTTLES[reason] || 0) < 1) {
                                console.log(`[WARNING] Error '${reason}' (${error_type}} occured. This happens at start-up.`);
                                Elastic.THROTTLES[reason] = (Elastic.THROTTLES[reason] || 0) + 1;
                            }
                            // Discard known errors
                            return;
                        }
                    }
                    // Not a known error, pass it up the stack
                    console.log(`[ERROR] ES Errored with: ${reason} (${error_type})`);
                    error(new Error(response.error));
                });
        });
    }
    /**
     * Elastic Search interaction - POST / create
     * 
     * This function will create a new document in the ElasticSearch index. It will use the POST method to create the
     * document resulting in a new document being created in the index. The id of the document will be set to the id
     * supplied otherwise it will be set to a new UUID.
     * 
     * @param index - index to POST to
     * @param type - type of object to create. Unused in modern ES.
     * @param metadata - metadata blob to post a creation for
     */
    static elasticPost(index,type,metadata) {
        let id = ("id" in (metadata || {})) ? metadata.id : "";
        let snippet = `${index}/_doc/${id}`;
        return Elastic.elastic(snippet,type,"POST",metadata);
    };
    /**
     * List entries in the index
     * 
     * List all entries in the index. This will use the GET method to retrieve the documents in the index. Entries will
     * be sorted by the numerical_id field. The size of the result set is limited to 1000 documents.
     * 
     * @param index: elastic search index
     * @param type: type for elastic search
     */
    static elasticList(index,type) {
        let snippet = `${index}/_search?size=1000&version=true`;
        snippet += "&sort=numerical_id";
        return Elastic.elastic(snippet,type,"GET",{});
    }
    /**
     * Get an item from elastic search by id
     * 
     * This function will retrieve a document from the ElasticSearch index using the GET method. The id of the document
     * will be used to retrieve the document. The id must be supplied as an argument to the function.
     * 
     * @param index: elastic search index
     * @param type: elastic search type
     * @param id: identitiy to get
     */
    static elasticGet(index,type,id) {
        let snippet = `${index}/_doc/${id}`
        return Elastic.elastic(snippet,type,"GET",{});
    }
    /**
     * Delete an item from elastic search by id
     * 
     * This function will delete a document from the ElasticSearch index using the DELETE method. The id of the
     * document will be used to delete the document. The id must be supplied as an argument to the function.
     * 
     * @param index: elastic search index
     * @param type: elastic search type
     * @param id: identitiy to get
     */
    static elasticDelete(index, type, id) {
        let snippet = `${index}/_doc/${id}`
        return Elastic.elastic(snippet,type,"DELETE",{"id":id});
    }
}
