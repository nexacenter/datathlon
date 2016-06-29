/*
*
* A simple script to create (or print) a JSON file from an XML file
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
                if (err) throw err
                console.log("JSON saved to " + outputFilename);
            });
        });
    }

    this.convertToJSON = function (file, callBack) {
        fs.readFile(file, 'utf-8', function (err, xml) {
            if (err) console.log(err)
            try {
              parser.parseString(xml, function (err, result) {
                  if (err) callBack("Error!");
                  else callBack({"result": result, "file": file});
              });
            }
            catch (err) {
                callBack("Error!");
            }
        });
    }

    this.convertToJSONSync = function (file) {
        fs.readFile(file, 'utf-8', function (err, xml) {
            if (err) console.log(err)
            parser.parseString(xml, function (err, result) {
                if (err);
                else return {"result": result, "file": file};
            });
        });
    }

    return this;
})();
