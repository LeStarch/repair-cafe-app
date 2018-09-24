/**
 * Client:
 *
 *  The client represents the customer requesting the work. Specifically it
 *  represents the contact information for the customer including: name, email,
 *  and the (optional) phone number. Oprional fields can be null, but should
 *  never be undefined.
 *
 *  Example: (repair cafe application) a basic repairee. In this application,
 *           phone number should be entirely oprional.
 *
 * @author lestarch
 */
export class Client {
    /**
     * Builds an empty client with blank contact information. This is needed to
     * allow binding to the object's properties when building it directly from a
     * form. It also ensures that the fields are defined.
     */
    constructor() {
        this.name = "";
        this.email = "";
        this.phone = null;
    }
    /**
     * Returns the name description of the client.
     * @return: client name
     */
    getName() {
        return this.name;
    }
    /**
     * Returns the email of the client.
     * @return: client email
     */
    getEmail() {
        return this.email;
    }
    /**
     * Returns the phone of the client.
     * @return: client phone
     */
    getPhone() {
        return this.phone;
    }
}
