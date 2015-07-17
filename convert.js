var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var input = './xml/';
var output = './json/';

var convertXMLtoJSON = function (dir) {
    fs.readdir(dir, function (err, files) {
        if (err) throw err;
        files.forEach(function(file) {
            fs.readFile(dir + file, 'utf-8', function (err, xml) {
                if (err) {
                    console.log(err)
                }
                createJSON(file, xml);
            });
        });
    });
}

var createJSON = function (file, xml) {
    parser.parseString(xml, function (err, result) {
        if (err) throw err;
        var outputFilename = output + file.split(".xml")[0] + '.json';
        fs.writeFile(outputFilename, JSON.stringify(result, null, 4), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + outputFilename);
            }
        });
    });
}

convertXMLtoJSON(input);