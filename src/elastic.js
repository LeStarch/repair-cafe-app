import {Repair} from "./models/repair"
import {Config} from "./config"

export class Elastic {
    /**
     * Elastic search interface code
     * @param index: index of elastic Search
     * @param type: type of the document
     * @param method: http method
     * @param data: data to submit with post
     */
    static elastic(index,type,method,data) {
        return new Promise(function(success,error) {
            try
            {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function()
                {
                    if (this.readyState == 4 && this.status >= 200 && this.status <= 299)
                    {
                        console.log("[INFO] Response text: '"+this.responseText+"'")
                        var response = JSON.parse(this.responseText);
                        success(response);
                    }
                    else if (this.readyState == 4)
                    {
                        console.log("[ERROR] ES Errored with: "+this.responseText);
                        error(new Error(this.responseText));
                    }
                };
                //Id is not valid for ES, so we should post directly to the URL
                var url = Config.ES_URL + "/" + index + "/" + type;
                if ("id" in data)
                {
                    url = url + "/" +data["id"];
                }
                console.log("[INFO] Opening: '"+url+"' with "+method);
                xhttp.open(method, url , true);
                if (Config.ES_USER != null && Config.ES_PASSWORD != null) {
                    xhttp.setRequestHeader("Authorization", "Basic " + btoa(Config.ES_USER + ":" + Config.ES_PASSWORD));
                }
                console.log("[INFO] Sending data: "+JSON.stringify(data));
                xhttp.send(JSON.stringify(data),true);//,Config.ES_USER,Config.ES_PASSWORD);
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
        return Elastic.elastic(index,type,"POST",metadata);
    };
    /**
     * List entries in the index
     * @param index: elastic search index
     * @param type: type for elastic search
     */
    static elasticList(index,type) {
        return Elastic.elastic(index+"/_search","?size=1000","GET",{});
    }
    /**
     * Get an item from elastic search
     * @param index: elastic search index
     * @param type: elastic search type
     * @param id: identitiy to get
     */
    static elasticGet(index,type,id) {
        return Elastic.elastic(index,type,"GET",{"id":id});
    }
    /**
     * Delete an item from elastic search
     * @param index: elastic search index
     * @param type: elastic search type
     * @param id: identitiy to get
     */
    static elasticDelete(index,type,id) {
        return Elastic.elastic(index,type,"DELETE",{"id":id});
    }
}
