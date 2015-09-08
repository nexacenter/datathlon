var http = require('http');
var https = require('https');
var fs = require('fs');
var csv = require('csv');

var input_filename = "input.csv";
var output_path = "cordis/";
var output_filename = "";
var log_filename ="log.txt";

var main = function(){
    fs.readFile(input_filename, "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        csv.parse(data, function(err, rows) {
            for (var i = 0; i < rows.length; i++) {
                var host = rows[i][0];
                var path = rows[i][1];
                var match = [];
                var c = 0;
                if (match = findRange(rows[i][2])) {
                    for (var j = match[1]; j <= match[2]; j++) {
                        var code = match[0].replace(/\[.*\]/,"");
                        trigger(i+c, host, path, j+code);
                        c++;
                    }
                } else {
                    var code = rows[i][2];
                    trigger(i, host, path, code);
                }
            }
        });
    });
}

function findRange(string) {
    var regexp = /.*\[([0-9]+)\-([0-9]+)\].*/g;
    var match = regexp.exec(string);
    return match;
}

function trigger(i, host, path, code) {
    setTimeout(function() {
        var options = {
            host: host,
            path: path + code
        };
        getData(options, function(callback) {
            if (callback === "Not found") {
                fs.appendFileSync(output_path + log_filename, "Not found\r\n");
            } else {
                fs.appendFileSync(output_path + output_filename + code, callback);
            }
        });
    }, 1000 * i);
}

function getData(options, cb) {
    console.log("[" + getNow() + "] GET " + options.path);
    http.request(options).on("response", function(res) {
        var str = '';

        res.on('data', function(chunk) {
            str += chunk.toString('utf8');
        });

        res.on('end', function() {
            cb(str);
        });
    }).end();
}

function getNow() {
    return new Date().toISOString();
}

exports.getFromURL = function (url, cb) {
    var data = {};
    data.payload = "";

    var protocol = (url.substring(0, 6).toUpperCase() == 'HTTPS:' ? https : http);
    var request = protocol.get(url, function(res) {
        res.on('data', function(chunk) {
            data.payload += chunk;
        });
        res.on('end', function() {
            data.status = res.statusCode;
            cb(data);
        })
    });
    request.on('error', function(e) {
        console.log("Got error: " + e.message + " for " + url);
        fs.writeFileSync("error.log", e.message + " for " + url);
    });
};

if (require.main === module) {
    main();
}
