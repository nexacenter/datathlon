/**
 *
 * Datathlon test
 * 
 */
 
var assert = require("assert");
var stringCleaner = require(__dirname + "/../cleaner.js");

// String cleaner test

describe("String cleaning test", function () {
    it("Invalid string: input *abcd should return abcd", function () {
        assert.deepEqual("abcd", checkBadCharacters("*abcd"));
    });
});
