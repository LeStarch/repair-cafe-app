/**
 * Worker:
 *
 *  The worker represents the individual performing the work. Specifically it
 *  represents the contact information for the worker including: name, email,
 *  and the (optional) phone number. Oprional fields can be null, but should
 *  never be undefined. It also keeps track of relevant skills in order to aide
 *  in assigning tickets to workers.
 *
 *  Example: (repair cafe application) a basic repairer. In this application,
 *           phone number should be entirely oprional, as workers are not
 *           typically tracked apart from e-mail. skills represent repair
 *           skills.
 *
 * @author lestarch
 */
export class Worker {
    /**
     * Builds an empty client with blank contact information. This is needed to
     * allow binding to the object's properties when building it directly from a
     * form. It also ensures that the fields are defined.
     */
    constructor() {
        this.name = "Anonymouse Alex";
        this.email = "anonanon@example.com";
        this.phone = null;
        this.skills = [];
    }
    /**
     * Returns the name description of the worker.
     * @return: worker name
     */
    getName() {
        return this.name;
    }
    /**
     * Returns the email of the worker.
     * @return: worker email
     */
    getEmail() {
        return this.email;
    }
    /**
     * Returns the phone of the worker.
     * @return: worker phone
     */
    getPhone() {
        return this.phone;
    }
    /**
     * Returns the skills of the worker.
     * @return: worker skills
     */
    getSkills() {
        return this.skills;
    }
}
