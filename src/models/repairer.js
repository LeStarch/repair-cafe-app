/**
 * A repairer class representing repairer data
 */
export class Repairer {
    static MARSHALL_FIELDS = ["name","email","skills"];
    static demarshall(object) {
        var repairer = new Repairer();
        repairer.id = object.id;
        for (var i = 0; i < Repairer.MARSHALL_FIELDS.length; i++) {
            repairer[Repairer.MARSHALL_FIELDS[i]] = object[Repairer.MARSHALL_FIELDS[i]];
        }
        return repairer;
    }
    marshall() {
        var repairer = {};
        if ("id" in this) {
            repairer.id = this.id;
        }
        for (var i = 0; i < Repairer.MARSHALL_FIELDS.length; i++) {
            repairer[Repairer.MARSHALL_FIELDS[i]] = this[Repairer.MARSHALL_FIELDS[i]];
        }
        return repairer;
    }
    /**
     * Construct a new repairer
     * @param name: name of person getting repairer
     * @param email: e-mail of repairer
     * @param skills: skills
     */
    constructor(name,email,skills) {
        this.name = name;
        this.email = email;
        this.skills = skills;
    }

    /**
     * Does this repair match a string filter
     */
    matches(filter) {
        //Gatecheck
        if (typeof(filter) == "undefined" || filter === "") {
            return true;
        }
        var tokens = filter.toLowerCase().split(" ");
        var ret = true;
        var text = JSON.stringify(this).toLowerCase();
        //Remove ":" from the text
        text = text.replace(new RegExp("\":\"?","g"),":");
        for (var i = 0; i < tokens.length; i++) {
            ret = ret && text.indexOf(tokens[i]) >= 0;
        }
        return ret;
    }
}
