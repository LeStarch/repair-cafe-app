
import {Marshallable} from "./marshall.js"
/**
 * A repairer class representing repairer data
 */
export class Repairer extends Marshallable {
    static MARSHALL_FIELDS = ["numerical_id", "id", "name", "email", "team", "skills"];
    /**
     * Construct a new repairer
     * @param name: name of person getting repairer
     * @param email: e-mail of repairer
     * @param team: team of repairer
     * @param skills: skills
     */
    constructor(name, email, team, skills) {
        super();
        this.name = name;
        this.email = email;
        this.team = team;
        this.skills = skills;
    }
}
