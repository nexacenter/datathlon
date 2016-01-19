module.exports = (function() {
    
   /** 
     * Check bad characters in string
     *
     * @param   {String}       string               String to check
     *
     */
    this.checkBadCharacters = function (string) {

    	// Match everything except a-z, A-Z, 0-9, _
    	var badCharacterReg = /^\W/;

    	switch (string) {
    		case ((string.match(badCharacterReg)) ? string : undefined):
    		    return removeBadCharAtTheBeginning(string);
    		default:
                return string;
        }
    }

    return this;

})();

var removeBadCharAtTheBeginning = function (string) {
    string = string.replace(string[0], "");
	return string;
}