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

    this.publishJSON = function (file, outputDir) {
        parser.parseString(file, function (err, result) {
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

    this.convertToJSON = function (file, callBack) {
        fs.readFile(file, 'utf-8', function (err, xml) {
            if (err) console.log(err)
            parser.parseString(xml, function (err, result) {
                if (err) throw err;
                callBack(result);
            });
        });
    }
    return this;
})();
