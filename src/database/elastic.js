//import {Repair} from "./models/repair"
import {Config} from "../config.js"

export class Elastic {
    /**
     * Elastic search interface code
     * @param api_url_snippet: snippet of the API
     * @param type: type of the document
     * @param method: http method
     * @param data: data to submit with post
     */
    static elastic(api_url_snippet,type123,method,data) {
        return new Promise(function(success,error) {
            try
            {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function()
                {
                    if (this.readyState === 4 && this.status >= 200 && this.status <= 299)
                    {
                        //console.log("[INFO] Response text: '"+this.responseText+"'")
                        var response = JSON.parse(this.responseText);
                        success(response);
                    }
                    else if (this.readyState === 4)
                    {
                        let response = JSON.parse(this.responseText);
                        let error_type = ((response.error || {}).root_cause || [{}])[0].type;
                        let reason = ((response.error || {}).root_cause || [{}])[0].reason;
                        if (error_type !== "resource_already_exists_exception" &&
                            reason !== "No mapping found for [_id] in order to sort on") {
                            console.log("[ERROR] ES Errored with: " + this.responseText);
                            error(new Error(this.responseText));
                        }
                    }
                };
                //Id is not valid for ES, so we should post directly to the URL
                var url = Config.ES_URL + "/" + api_url_snippet;
                console.log("[INFO] Opening: '"+url+"' with "+method);
                xhttp.open(method, url , true);
                if (Config.ES_USER != null && Config.ES_PASSWORD != null) {
                    xhttp.setRequestHeader("Authorization", "Basic " + btoa(Config.ES_USER + ":" + Config.ES_PASSWORD));
                }
                console.log("[INFO] Sending data: "+JSON.stringify(data));
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.setRequestHeader("Cache-Control", "no-cache");
                if (method === "POST" || method === "PUT")
                {
                    xhttp.send(JSON.stringify(data), true);//,Config.ES_USER,Config.ES_PASSWORD);
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
    /**
     * Elastic Search interaction - POST / create
     * @param index - index to POST to
     * @param type - type of object to create
     * @param metadata - metadata blob to post a creation for
     */
    static elasticPost(index,type,metadata)
    {
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
