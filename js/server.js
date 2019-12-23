//  Dependencies
var app = require(__dirname + '/app');
var https = require('https');
var fs = require('fs');

//  Set Server port
var port = 443;
app.set('port', port);

//  Create Server
var server = https.createServer({
  key: fs.readFileSync(__dirname + '/../ssl/client-key.pem'),
  cert: fs.readFileSync(__dirname + '/../ssl/client-cert.pem')
}, app);


var players = [
  {name: 'Sean Hewitson', platform: 'xbl', ign: 'SeannnKiely', status: 'online'},
  {name: 'David Shipley', platform: 'xbl', ign: 'DShipley93', status: 'offline'},
  {name: 'Zack Butcher', platform: 'xbl', ign: 'Buttcher97', status: 'offline'},
  {name: 'Jamie Cox', platform: 'battle', ign: '', status: 'offline'},
  {name: 'Chee Tse', platform: 'xbl', ign: 'neoicg', status: 'offline'},
  {name: 'Jamie Collins', platform: 'xbl', ign: '', status: 'offline'},
  {name: 'Donald Bury', plattform: 'battle', ign: '', status: 'offline'},
  {name: 'Mindaugas Lukosevicius', platform: 'battle', ign: '', status: 'offline'}
];


var io = require('socket.io').listen(server);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

io.on('connection', function(socket){
  socket.emit('listPlayers', players);
});

function onError(error){
    if(error.syscall !== 'listen')
      throw error;
  
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch(error.code){
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
}

function onListening(){
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Server Listening on ' + bind);
}