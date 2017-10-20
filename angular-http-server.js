#!/usr/bin/env node

var http = require("http");
var fs = require("fs");
var mime = require("mime-types");

// function sendFile(fname) {}

var server = http.createServer(function (req, res) {
    // console.log(req.url);
    var url = req.url.split('?')[0]
    var possibleFilename = url.slice(1) || "dummy";

    fs.stat(possibleFilename, function (err, stats) {

        var fileBuffer;

        if (!err && stats.isFile()) {

            var fileExtension = possibleFilename.split('.');
            // we need last part of array in case of e.g. xxxx.min.css
            fileExtension = fileExtension[fileExtension.length - 1];

            console.log("Sending file: %s", possibleFilename);
            fileBuffer = fs.readFileSync(possibleFilename);
            res.writeHead(200, { 
                'Content-Type': mime.lookup(fileExtension),
                'Cache-Control': 'public, max-age=432000'
            });            
        }
        else {
            fileBuffer = fs.readFileSync("index.html");
            res.writeHead(200, { 'Content-Type': 'text/html' });
        }

        res.write(fileBuffer);
        res.end();
    });
});


server.listen(4200, function () { return console.log("Server listening on 4200"); });
