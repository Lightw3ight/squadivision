// app.js
var config = require('./config.js');
var http = require('http');
//var https = require('https');
var fs = require('fs');
var feathers = require('feathers'),
	app = module.exports.app = feathers();
var signallingSockets = require('signal-master/sockets');

var httpsSettings = {
    key: fs.readFileSync(__dirname + '/SSLConfig/server.key'),
    cert: fs.readFileSync(__dirname + '/SSLConfig/server.crt'),
    ca: fs.readFileSync(__dirname + '/SSLConfig/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false
};

var bodyParser = require('body-parser');
var morgan = require('morgan');

//var server = https.createServer(httpsSettings, app);
var server = http.createServer(app);

var io = require('socket.io').listen(server);
var services = require('./services.js')(io);
signallingSockets(io, config);

app.configure(feathers.rest());
app.use(morgan('dev'));
app.use(bodyParser.json());
//app.use('/todos', todoService);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/connection.html');
});

server.listen(config.server.port, function() {
    console.log(`WebServer is up and running on http://localhost:${config.server.port}/`);
});