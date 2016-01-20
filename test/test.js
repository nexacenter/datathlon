/**
 *
 * Datathlon test
 * 
 */

var assert = require("assert");
var stringCleaner = require(__dirname + "/../cleaner.js");

// String cleaner test

describe("String cleaning test", function () {
    it("Valid string: input (abcd) efg should return (abcd) efg", function () {
        assert.deepEqual("(abcd) efg", cleanString("(abcd) efg"));
    });
    it("Valid string: input [abcd] efg should return [abcd] efg", function () {
        assert.deepEqual("[abcd] efg", cleanString("[abcd] efg"));
    });
    it("Valid string: input @abcd should return @abcd", function () {
        assert.deepEqual("@abcd", cleanString("@abcd"));
    });
    it("Invalid string: input \'\' should return false", function () {
        assert.deepEqual(false, cleanString(""));
    });

    var badChars = ["+", "‒", "–", "—", "―", ":", "\n", "\r", "*", "!", "?", "/", "\\", ".", "#", "%", "=", "~"];
    for (var i in badChars) {
        it("Invalid string: input " + badChars[i] + "abcd should return abcd", function () {
            assert.deepEqual("abcd", cleanString(badChars[i] + "abcd"));
        });
    }
    it("Invalid string: input <![CDATA[abcd]]> should return abcd", function () {
        assert.deepEqual("abcd", cleanString("<![CDATA[abcd]]>"));
    });
    it("Invalid string: input <h1>abcd</h1> should return abcd", function () {
        assert.deepEqual("abcd", cleanString("<h1>abcd</h1>"));
    });
    it("Invalid string: input <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:263px\"><tbody><tr><td style=\"height:104px; width:263px\">abcd should return abcd", function () {
        assert.deepEqual("abcd", cleanString("<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:263px\"><tbody><tr><td style=\"height:104px; width:263px\">abcd"));
    });
});

describe("Pipeline cleaning test", function () {
    it("Invalid string: input *abcd# should return abcd", function () {
        var cleanedString = cleanString("*abcd#");
        assert.deepEqual("abcd", cleanedString);
    });
    it("Invalid string: input *   abcd  § # should return abcd", function () {
        var cleanedString = cleanString("*   abcd  § #");
        assert.deepEqual("abcd", cleanedString);
    });
});
