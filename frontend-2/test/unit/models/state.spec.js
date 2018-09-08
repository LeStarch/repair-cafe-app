import {State} from "models/state"
import {TestHelper} from "../test-helper.js"
/**
 * state-test:
 *
 *  Tests the basic functionality of the state object, including the ability
 *  to retrieve all three expected fields.
 */
describe('State: basic object test', () => {
    it('check a newly constucted state', () =>
    {
        let fields = ["name", "message", "time_in", "time_out"];
        let state = new State("Snazzy", "Super message");
        //Check fields defined
        TestHelper.expect_expected_fields(state, fields,
                                          ["Snazzy", "Super message",
                                          null, null]);
        TestHelper.expect_expected_getters(state, fields,
                                           ["Snazzy", "Super message",
                                           null, null]);
        //Check entering sets a field
        state.enter();
        TestHelper.expect_expected_fields(state, fields,
                                          ["Snazzy", "Super message",
                                          undefined, null]);
        TestHelper.expect_expected_getters(state, fields,
                                           ["Snazzy", "Super message",
                                           undefined, null]);
        //Now exit
        state.exit();
        TestHelper.expect_expected_fields(state, fields,
                                          ["Snazzy", "Super message",
                                          undefined, undefined]);
        TestHelper.expect_expected_getters(state, fields,
                                           ["Snazzy", "Super message",
                                           undefined, undefined]);
    });
});
describe('State: basic in-out test', () => {
    it('check state for in-out time stamps', () =>
    {
        //Create a new state and run basic smoke-test
        let fields = ["time_in", "time_out"]
        let state = new State("Snazzy1", "Super message2");
        TestHelper.expect_expected_fields(state, fields, [null, null]);
        //Enter in the state and ensure it sets "now"
        state.enter();
        var first = new Date();
        TestHelper.expect_expected_fields(state, fields, [undefined, null]);
        expect(state.time_in.toString()).toEqual(first.toString());
        //Waste time, exit, and make sure exit is "now"
        for (let i = 0; i < 2000000000; i++) {} //Waste time
        state.exit();
        var second = new Date();
        expect(second.toString()).not.toEqual(first.toString());
        expect(state.time_in.toString()).toEqual(first.toString());
        expect(state.time_out.toString()).toEqual(second.toString());
        //Wait some time and test reentrancy protection
        for (let i = 0; i < 2000000000; i++) {} //Waste time
        state.enter();
        expect(state.time_in.toString()).toEqual(first.toString());
        expect(state.time_out.toString()).toEqual(second.toString());
        state.exit();
        expect(state.time_in.toString()).toEqual(first.toString());
        expect(state.time_out.toString()).toEqual(second.toString());
        //Test reentrancy
        state.enter(true);
        var first = new Date();
        TestHelper.expect_expected_fields(state, fields, [undefined, null]);
        expect(state.time_in.toString()).toEqual(first.toString());
        for (let i = 0; i < 2000000000; i++) {} //Waste time
        state.exit();
        var second = new Date();
        expect(first.toString()).not.toEqual(second.toString());
        expect(state.time_in.toString()).toEqual(first.toString());
        expect(state.time_out.toString()).toEqual(second.toString());
    });
});
