import {Worker} from "models/worker"
import {TestHelper} from "../test-helper.js"

/**
 * worker-test:
 *
 *  Tests the basic functionality of the worker object, including the ability
 *  to retrieve all four expected fields.
 */
describe('Worker: basic object test', () => {
    it('check a newly constucted ticket', () =>
    {
        let fields = ["name", "email", "phone", "skills"];
        let worker = new Worker();
        //Check fields, defined with phone optional
        TestHelper.expect_expected_fields(worker, fields,
                                          [undefined, undefined, null, []]);
        TestHelper.expect_expected_getters(worker, fields,
                                           [undefined, undefined, null, []]);
        worker.name = "Test Sam";
        worker.email = "sammer@example.com";
        worker.phone = "555-505-005";
        worker.skills = ["debauchery", "heavy drinking"];
        TestHelper.expect_expected_fields(worker, fields,
                                          ["Test Sam", "sammer@example.com",
                                          "555-505-005",
                                          ["debauchery", "heavy drinking"]]);
        TestHelper.expect_expected_getters(worker, fields,
                                           ["Test Sam", "sammer@example.com",
                                           "555-505-005",
                                           ["debauchery", "heavy drinking"]]);
    });
});
