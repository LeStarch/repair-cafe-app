
import {Marshallable} from "./marshall.js"
/**
 * A repairer class representing repairer data
 */
export class Repairer extends Marshallable {
    static MARSHALL_FIELDS = ["name", "email", "skills"];
    /**
     * Construct a new repairer
     * @param name: name of person getting repairer
     * @param email: e-mail of repairer
     * @param skills: skills
     */
    constructor(name,email,skills) {
        super();
        this.name = name;
        this.email = email;
        this.skills = skills;
    }
}
