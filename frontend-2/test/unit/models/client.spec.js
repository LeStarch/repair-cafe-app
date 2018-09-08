import {Client} from "models/client"
import {Order} from "models/ticket"
import {TestHelper} from "../test-helper.js"

/**
 * client-test:
 *
 *  Tests the basic functionality of the client object, including the ability
 *  to retrieve all three expected fields.
 */
describe('Client: basic object test', () => {
    it('check a newly constucted ticket', () =>
    {
        let fields = ["name", "email", "phone"];
        let client = new Client();
        //Check fields, defined with phone optional
        TestHelper.expect_expected_fields(client, fields,
                                          [undefined, undefined, null]);
        TestHelper.expect_expected_getters(client, fields,
                                           [undefined, undefined, null]);
        client.name = "Test Jose";
        client.email = "tester@example.com";
        client.phone = "555-555-555";
        TestHelper.expect_expected_fields(client, fields,
                                          ["Test Jose", "tester@example.com",
                                          "555-555-555"]);
        TestHelper.expect_expected_getters(client, fields,
                                           ["Test Jose", "tester@example.com",
                                           "555-555-555"]);
    });
});
