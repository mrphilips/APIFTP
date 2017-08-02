#!/usr/bin/nodejs
var debug = require('debug')('my-application');
var app = require('../app');
var http = require('http');
var https = require('https');
var fs = require('fs');

app.set('port', process.env.PORT || 3000);

/*var sslOptions = {
    key: fs.readFileSync('ssl/ca.key'),
    cert: fs.readFileSync('ssl/ca.crt')
};*/

var sslOptions = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cer')
};

var server = https.createServer(sslOptions, app).listen(3000, function() {
  console.log('Express server listening on port ' + server.address().port);
});