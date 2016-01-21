module.exports = (function() {

    /** 
     * Check bad characters in a string
     *
     * @param   {String}       string               String to check
     *
     */
    this.cleanString = function (string) {

    	//console.log(string);

        // Match <![CDATA[...]]>
        var cdataReg = /<!\[CDATA\[.*?\]\]>/;

        // Match html tags
        var htmlReg = /.*(<([^>]+)>).*/;

        // Match everything at the beginning except a-z, A-Z, 0-9, _
        var badCharBeginningReg = /^\W/;

        // Match everything at the end except a-z, A-Z, 0-9, _, ., !, ?, €, %
        var badCharEndReg = /[^\w\.?!€%]$/;

        // Match (), [], @
        var goodCharsReg = /^(\(|\[|@).*/

        switch (string) {
            case ((string.match(cdataReg)) ? string : undefined):
                string = removeCDATA(string);
                string = cleanString(string);
                break;
            case ((string.match(htmlReg)) ? string : undefined):
                string = removeHTMLTags(string);
                string = cleanString(string);
                break;
            case ((string.match(badCharEndReg)) ? string : undefined):
                string = removeBadCharAtTheEnd(string);
                string = cleanString(string);
                break;
            case ((string.match(goodCharsReg)) ? string : undefined):
                return string;
            case ((string.match(badCharBeginningReg)) ? string : undefined):
                string = removeBadCharAtTheBeginning(string);
                string = cleanString(string);
                break;
            default:
                return string;
        } return string;
    }
    return this;
})();

// Clean strings

var removeHTMLTags = function (string) {
    string = string.replace(/(<([^>]+)>)/g, "");
    return string;
}

var removeCDATA = function (string) {
    string = string.replace("<![CDATA[", "").replace("]]>", "");
    return string;
}

var removeBadCharAtTheBeginning = function (string) {
    string = string.replace(string[0], "");
    return string;
}

var removeBadCharAtTheEnd = function (string) {
	string = string.replace(string[string.length-1], "");
	return string;
}
