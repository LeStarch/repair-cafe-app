/**
 * models/marshall.js:
 *
 * Classes and functions used to represent an object that can be marshalled/demarshalled into ElasticSearch.
 */

/**
 * A object that can be marshalled and stored in the elasticsearch database. If a subclass defines MARSHALL_FIELDS then
 * the marshall function will save those and only those.
 */
export class Marshallable {
    static MARSHALL_FIELDS = [];
    /**
     * Marshall the data as defined in marshall fields.
     */
    static marshall_from(marshallable) {
        let fields = marshallable.constructor.MARSHALL_FIELDS;
        if (fields) {
            let marshalled = {};
            for (let i = 0; i < fields.length; i++) {
                marshalled[fields[i]] = Marshallable.marshall_from(marshallable[fields[i]]);
            }
            return marshalled;
        } else if (marshallable instanceof Array) {
            return marshallable.map(Marshallable.marshall_from);
        }
        return marshallable;
    }

    /**
     * Demarshall the data per the fields defined by the given type.
     * @param marshalled: marshalled object
     * @param filled: object to demarshall into
     */
    static demarshall_into(marshalled, filled) {
        let keys = Object.keys(marshalled);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            // Check for recursive demarshall, otherwise straight-copy
            if (filled[key] instanceof Marshallable || filled[key] instanceof Array) {
                Marshallable.demarshall_into(marshalled[key], filled[key]);
            } else {
                filled[key] = marshalled[key];
            }
        }
    }

    /**
     * Marshall the data of this particular class.
     */
    marshall() {
        return Marshallable.marshall_from(this);
    }

    /**
     * Demarshall into "this" based on the supplied object.
     * @param object: object to demarshall from
     */
    demarshall(object) {
        Marshallable.demarshall_into(object, this);
        return this; // For chaining
    }

    /**
     * Copy into this repair the fields from the supplied repair. This allows us to use the repair as a data class and
     * copy it into a supplied repair when finished. Note: copying is ignored if dolly is not set to a real repair.
     * Returns "this" repair for chaining.
     *
     * @param dolly: the repair to be copied
     * @return this, after copy
     */
    copy_from(dolly) {
        let fields = this.constructor.MARSHALL_FIELDS;
        // Check the input before attempting a repair
        if (dolly && typeof(dolly) !== "undefined") {
            for (let i = 0; i < fields.length; i++) {
                this[fields[i]] = dolly[fields[i]];
            }
        }
        return this;
    }

    /**
     * Does the given object match the filter supplied? This uses marshall and the JSON to convert the object to string,
     * lowercases it and then compares it to the filter. The filter is converted to lower case and broken up via the " "
     * token. The lowercase string must match all split filters.
     */
    matches(filter) {
        //Gatecheck the filter before continuing
        if (!filter) {
            return true;
        }
        // Converts the input objects into lowercase split items
        let tokens = filter.toLowerCase().split(" ");
        let text = JSON.stringify(this).toLowerCase().replace(new RegExp("\":\"?","g"),":");

        return tokens.filter((token) => text.indexOf(token) >= 0).length === tokens.length;
    }

}