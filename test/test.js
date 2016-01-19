/**
 *
 * Datathlon test
 * 
 */

var assert = require("assert");
var stringCleaner = require(__dirname + "/../cleaner.js");

// String cleaner test

describe("String cleaning test", function () {
    it("Invalid string: input <![CDATA[abcd]]> should return abcd", function () {
        assert.deepEqual("abcd", cleanString("<![CDATA[abcd]]>"));
    });
    it("Invalid string: input <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:263px\"><tbody><tr><td style=\"height:104px; width:263px\">abcd should return abcd", function () {
        assert.deepEqual("abcd", cleanString("<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:263px\"><tbody><tr><td style=\"height:104px; width:263px\">abcd"));
    });
    it("Invalid string: input *abcd should return abcd", function () {
        assert.deepEqual("abcd", cleanString("*abcd"));
    });
});
