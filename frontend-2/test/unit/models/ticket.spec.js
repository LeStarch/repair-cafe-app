import {Ticket} from "models/ticket"
import {Order} from "models/ticket"
import {Client} from "models/client"
import {TestHelper} from "../test-helper.js"

/**
 * order-test:
 *
 *  Tests the basic functionality of the order object, including the ability
 *  to retrieve both short and long descritions.
 */
describe('Order: basic object test', () => {
    it('check a newly constructed order', () => {
        let fields = ["short", "long"];
        let order = new Order();
        TestHelper.expect_expected_fields(order, fields,
                                          [undefined, undefined]);
        TestHelper.expect_expected_getters(order, fields,
                                           [undefined, undefined]);
    });
    it('check "getter" functions', () => {
        let fields = ["short", "long"];
        let order = new Order();
        order.short = "shortDescriptionTest";
        order.long = "long description for test";
        TestHelper.expect_expected_fields(order, fields,
                                          ["shortDescriptionTest",
                                          "long description for test"])
        TestHelper.expect_expected_getters(order, fields,
                                           ["shortDescriptionTest",
                                           "long description for test"]);
    });
});
/**
 * ticket-test:
 *
 *  A test of the Ticket model, used to ensure that it functions correctly
 *  after constuction.
 */
describe('Ticket: basic object test', () => {
    it('check a newly constucted ticket', () =>
    {
        let fields = ["client", "order", "status", "workers"];
        //Construct required order and client information then ticket
        let order = new Order();
        order.short = "short";
        order.short = "long desc";
        let client = new Client();
        let ticket = new Ticket(client, order);
        TestHelper.expect_expected_fields(ticket, fields,
                                          [client, order, undefined, []]);
    });
});
