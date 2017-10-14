var express = require('express');
var http = require('http');
var app = express();
var os = require('os');
app.use(function(req, res, next) {
    console.log('Time: %d', Date.now());
    console.log(req.originalUrl); // '/admin/new'
    console.log(req.baseUrl); // '/admin'
    console.log(req.path); // '/new'

    next();
});

var network = os.networkInterfaces();
var eth0=network[Object.keys(network)[0]];
for (var i = 0; i < eth0.length; i++) {
    var json = eth0[i];
    if (json.family == 'IPv4') {
        console.log(json.address);
    }
}


var router = express.Router();
router.get('/', function(req, res, next) {
    res.redirect('index.html');
    next();
})
app.use(router);


app.use(express.static(__dirname));
http.createServer(app).listen("9999", function() {
    console.log('Express server listening on port 9999');
});