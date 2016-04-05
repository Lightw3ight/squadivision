// app.js
var http = require('http');
var https = require('https');
var fs = require('fs');
var feathers = require('feathers'),
	app = module.exports.app = feathers();

var httpsSettings = {
    key: fs.readFileSync(__dirname + '/SSLConfig/server.key'),
    cert: fs.readFileSync(__dirname + '/SSLConfig/server.crt'),
    ca: fs.readFileSync(__dirname + '/SSLConfig/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false
};

var bodyParser = require('body-parser');
var morgan = require('morgan');
//var todoService = require('./todos');

//var server = https.createServer(app);
var server = https.createServer(httpsSettings, app);

var io = require('socket.io').listen(server);
var services = require('./services.js')(io);

app.configure(feathers.rest());
app.use(morgan('dev'));
app.use(bodyParser.json());
//app.use('/todos', todoService);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/connection.html');
});

server.listen(3000, function() {
    console.log("WebServer is up and running on http://localhost:3000/");
});