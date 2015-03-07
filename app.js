var express = require('express')
  , app = express()
  , swig = require('swig')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , os = require('os')
  , display = null;

io.set('log level', 1);

// Set up our template engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
// don't forget to re-enable caching in production!
app.set('view cache', false);
swig.setDefaults({ cache: false });

// Start up the server
var interfaces = os.networkInterfaces();
var addresses = [];
for (k in interfaces) {
    for (k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family == 'IPv4' && !address.internal && k[0] != 'v') {
            addresses.push(address.address)
        }
    }
}

console.log('http://' + addresses[0] + ':8081/activeloop');

server.listen(8081);
app.get('/', function (req, res) {
	res.render('index', {host:addresses[0]});
});
app.get('/activeloop', function (req, res) {
	res.render('display', {host:addresses[0]});
});
app.use('/static', express.static(__dirname + '/static'));

// Configure the socket.io
io.sockets.on('connection', function (socket) {
	
	// If this is the display socket, keep a reference to it
	socket.on('display', function (data) {
		display = socket;
	});

	if (display != null) {
		display.emit('connected', {id:socket.id});
	}

	socket.on('tilt', function (data) {
		//console.log('Tilt ' + data.x + ' ' + data.y + ' ' + data.z);
		if (data.r != null) {
			//console.log('Rotate ' + data.r.alpha + ' ' + data.r.beta + ' ' + data.r.gamma);
		}
		if (display != null) {
			display.emit('tilted', {id:socket.id, x:data.x, y:data.y});
		}
	});
	
	socket.on('disconnect', function (data) {
		if (display === socket) {
			display = null;
		} else {
			if (display != null) {
				display.emit('disconnected', {id:socket.id});
			}
		}
	});
});
