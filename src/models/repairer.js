
import {Marshallable} from "./marshall.js"
/**
 * A repairer class representing repairer data
 */
export class Repairer extends Marshallable {
    static MARSHALL_FIELDS = ["numerical_id", "id", "name", "email", "team"];
    /**
     * Construct a new repairer
     * @param name: name of person getting repairer
     * @param email: e-mail of repairer
     * @param team: team of repairer
     */
    constructor(name, email, team) {
        super();
        this.numerical_id = -1;
        this.name = name;
        this.email = email;
        this.team = team;
    }
}
