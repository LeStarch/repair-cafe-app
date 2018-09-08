import {Ticket} from "models/ticket"
import {Order} from "models/ticket"

/**
 * order-test:
 *
 *  Tests the basic functionality of the order object, including the ability
 *  to retrieve both short and long descritions.
 */
describe('Order: basic object test', () => {
    it('check a newly constructed object', () => {
        let order = new Order();
        //Short and long existance checks
        expect(order.getShortDescription()).toBeDefined();
        expect(order.getShortDescription()).not.toBeNull();
        expect(order.getLongDescription()).toBeDefined();
        expect(order.getLongDescription()).not.toBeNull()
    });
    it('check "getter" functions', () => {
        let order = new Order();
        order.short = "shortDescriptionTest";
        order.long = "long description for test purposes";
        //Short and long existance and validity tests
        expect(order.getShortDescription()).toBeDefined();
        expect(order.getShortDescription()).not.toBeNull();
        expect(order.getShortDescription()).toBe("shortDescriptionTest");

        expect(order.getLongDescription()).toBeDefined();
        expect(order.getLongDescription()).not.toBeNull()
        expect(order.getLongDescription()).toBe(
            "long description for test purposes"
        );
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
        //Construct required order and client information
        let order = new Order();
        order.short = "short";
        order.short = "long desc";
        let client = "ABCD"; //TODO: fix me, client needs to be an object

        let ticket = new Ticket(client, order);
        //Loop fields looking for expected values
        let fields = ["client", "order", "status", "workers"];
        let expected = [client, order, undefined, []];
        expect(fields.length).toEqual(expected.length);
        for (let i = 0; i < fields.length; i++) {
            expect(ticket[fields[i]]).toBeDefined();
            expect(ticket[fields[i]]).not.toBeNull();
            //If expected is defined, check it to
            if (typeof(expected[i]) != "undefined") {
                expect(ticket[fields[i]]).toEqual(expected[i]);
            }
        }
    });
});
