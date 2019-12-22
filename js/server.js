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

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

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