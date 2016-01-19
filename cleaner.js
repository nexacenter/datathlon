module.exports = (function() {
    
   /** 
     * Check bad characters in string
     *
     * @param   {String}       string               String to check
     *
     */
    this.checkBadCharacters = function (string) {

    	// Match <![CDATA[...]]>
    	var cdataReg = /<!\[CDATA\[.*?\]\]>/;

    	// Match everything except a-z, A-Z, 0-9, _
    	var badCharacterReg = /^\W/;

    	switch (string) {
    		case ((string.match(cdataReg)) ? string : undefined):
    		    return removeCdata(string);
    		case ((string.match(badCharacterReg)) ? string : undefined):
    		    return removeBadCharAtTheBeginning(string);
    		default:
                return string;
        }
    }

    return this;

})();

var removeCdata = function (string) {
	string = string.replace("<![CDATA[", "").replace("]]>", "");
	return string;
}

var removeBadCharAtTheBeginning = function (string) {
    string = string.replace(string[0], "");
	return string;
}