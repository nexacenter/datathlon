/*
* 
* A simple script to convert XML files located in a directory to JSON files.  
*
*/

var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var output = './';

module.exports = (function () {
    /**
     * Convert in JSON all XML files located in a specific folder
     *
     * @param   {String}    inputDir      Directory of input XML files
     * @param   {String}    outputDir     Directory of output JSON files
     *
     */
    this.xmlToJson = function (inputDir, outputDir) {
        fs.readdir(inputDir, function (err, files) {
        if (err) throw err;
        files.forEach(function (file) {
            if (path.extname(file) == ".xml") {
                fs.readFile(inputDir + file, 'utf-8', function (err, xml) {
                    if (err) {
                        console.log(err)
                    }
                    createJSON(file, xml, outputDir);
                });
            }
        });
    });
}
    return this;
})();

var createJSON = function (file, xml, outputDir) {
    parser.parseString(xml, function (err, result) {
        if (err) throw err;
        var outputFilename = outputDir + file.split(".xml")[0] + '.json';
        fs.writeFile(outputFilename, JSON.stringify(result, null, 4), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + outputFilename);
            }
        });
    });
}