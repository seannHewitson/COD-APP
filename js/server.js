//  Dependencies
var app = require(__dirname + '/app');
var request = require('request');
var https = require('https');
var http = require('http');
var path = require('path');
var fs = require('fs');

//  Set Server port
var port = process.env.PORT == null ? 1337 : process.env.PORT;
// port = 443;
app.set('port', port);

//  Create Server
// var server = https.createServer({
//   key: fs.readFileSync(__dirname + '/../ssl/client-key.pem'),
//   cert: fs.readFileSync(__dirname + '/../ssl/client-cert.pem')
// }, app);

var server = http.createServer(app);

// app.listen(port, '0.0.0.0');






function fetchStats(){
  // console.log("Fetching Stats");
  players.forEach(function(player){
    var uri = `https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${player.platform}/gamer/${player.ign}/profile/type/mp`;
    request.get(uri, function(error, response, body){
      if(!error){
        var resp = JSON.parse(response.body).data;
        if(resp){
          var lifetime = resp.lifetime.all;
          //  Add Weekly
          var weekly = resp.weekly.all;
          stats[resp.username] = {
            //  Basic
            info: {
              level: resp.level,
              prestige: resp.prestige,
              kills: lifetime.properties.kills,
              deaths: lifetime.properties.deaths,
              kdRatio: lifetime.properties.kdRatio,
              hits: lifetime.properties.hits,
              misses: lifetime.properties.misses,
              scorePerMin: lifetime.properties.scorePerMinute,
              headshots: lifetime.properties.headshots,
              assist: lifetime.properties.assists,
            },
            best: {
              confirms: lifetime.properties.Confirmed,
              assists: lifetime.properties.Assists,
              score: lifetime.properties.Score,
              scorePerMin: lifetime.properties.SPM,
              kdRatio: lifetime.properties.KD,
              InfectedKills: lifetime.properties.killsKillsAsInfected,
              stabs: lifetime.properties.Stabs,
              survvorKills: lifetime.properties.KillsAsSurvivor,
              rescues: lifetime.properties.Rescues,
              plants: lifetime.properties.Plants,
              deaths: lifetime.properties.Deaths,
              defends: lifetime.properties.Defends,
              kills: lifetime.properties.Kills,
              defuses: lifetime.properties.Defuses,
              captures: lifetime.properties.Captures,
              killstreak: lifetime.properties.KillStreak,
              denies: lifetime.properties.Denied
            },
          };
          // console.log(resp);
        }
      }
    });
  });
}


var io = require('socket.io').listen(server);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

io.on('connection', function(socket){
  //  Send initial data.
  // socket.emit('listPlayers', sortArrayOfObjects(stats, 'scorePerMin'));

  socket.on('getStats', function(data){
    socket.emit('recievedStats', data);
  });
});


function sortArrayOfObjects(arr, key){
  return arr.sort((a, b) => {
    return b[key] - a[key];
  });
}

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