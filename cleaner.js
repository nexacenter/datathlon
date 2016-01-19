module.exports = (function() {

    /** 
     * Check bad characters in a string
     *
     * @param   {String}       string               String to check
     *
     */
    this.cleanString = function(string) {

        // Match <![CDATA[...]]>
        var cdataReg = /<!\[CDATA\[.*?\]\]>/;

        // Match html tags
        var htmlReg = /.*(<([^>]+)>).*/;

        // Match everything except a-z, A-Z, 0-9, _
        var badCharacterReg = /^\W/;

        switch (string) {
            case ((string.match(cdataReg)) ? string : undefined):
                return removeCDATA(string);
            case ((string.match(htmlReg)) ? string : undefined):
                return removeHTMLTags(string);
            case ((string.match(badCharacterReg)) ? string : undefined):
                return removeBadCharAtTheBeginning(string);
            default:
                return string;
        }
    }
    return this;
})();

var removeHTMLTags = function(string) {
    string = string.replace(/(<([^>]+)>)/g, "");
    return string;
}

var removeCDATA = function(string) {
    string = string.replace("<![CDATA[", "").replace("]]>", "");
    return string;
}

var removeBadCharAtTheBeginning = function(string) {
    string = string.replace(string[0], "");
    return string;
}