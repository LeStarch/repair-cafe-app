/**
 * TestHelper:
 *
 *  Defines convience methods to help write turce unit tests by abstracting
 *  common functionality.
 *
 * @author lestarch
 */
export class TestHelper {
    /**
     * Checks list of fields on object and checks it against a supplied list of
     * expected values. The following properties are checked for the ith field:
     *   1. Defined (typeof != "undefined")
     *   2. Is equal to expected[i] unless typeof(expected[i]) is "undefined" or
     *      field[i] is callable. Then checks against return value.
     * In addition, the lengths of both parameters are asserted to be equal.
     * @param object: object to test
     * @param fields: list of field names as strings
     * @param expected: list of expected values
     */
     static expect_expected_fields(object, fields, expected) {
        expect(fields.length).toEqual(expected.length);
        for (let i = 0; i < fields.length; i++) {
            //Get value, and if function call it
            let value = object[fields[i]];
            if (typeof(value) == "function") {
                value = object[fields[i]]();
            }
            expect(value).toBeDefined();
            //Only forced null values allow null value
            if (expected[i] != null) {
                expect(value).not.toBeNull();
            }
            //If expected is defined, check it to
            if (typeof(expected[i]) != "undefined") {
                expect(value).toEqual(expected[i]);
            }
        }
    }
    /**
     * Searches for getters on an object and checks results against a supplied
     * list of expected values. The following properties are checked for the ith
     * field:
     *   1. Getter defined (starts with get<field>)
     *   2. Getter is callable
     *   3. Return value defined (typeof != "undefined")
     *   4. Return value is equal to expected[i] unless typeof(expected[i]) is
     *      "undefined"
     * In addition, the lengths of both parameters are asserted to be equal.
     * @param object: object to test
     * @param fields: list of field names as strings
     * @param expected: list of expected values
     */
    static expect_expected_getters(object, fields, expected) {
        let callables = [];
        //For each field, search for getters
        for (let i = 0; i < fields.length; i++) {
            for (var key in object) {
                let prefix = ("get" + fields[i].replace("_", "")).toUpperCase();
                if (key.toUpperCase().startsWith(prefix)) {
                    callables.push(key);
                    expect(object[key]).toBeDefined();
                    expect(object[key]).not.toBeNull();
                    expect(typeof(object[key])).toEqual("function");
                }
            }
        }
        //Check found "getters"
        TestHelper.expect_expected_fields(object, callables, expected);
    }
}
