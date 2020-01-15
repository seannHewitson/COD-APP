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

//  Players..
var players = [
  {name: 'Sean Hewitson', platform: 'xbl', ign: 'SeannnKiely'},
  {name: 'David Shipley', platform: 'xbl', ign: 'DShipley93'},
  {name: 'Zack Butcher', platform: 'xbl', ign: 'Buttcher97'},
  {name: 'Jamie Cox', platform: 'battle', ign: 'cnc96#2904'},
  {name: 'Chee Tse', platform: 'xbl', ign: 'neoicg'},
  {name: 'Jamie Collins', platform: 'xbl', ign: 'JamieCollins95'},
  {name: 'Donald Bury', platform: 'battle', ign: 'Don5ki#2623'},
  {name: 'Mindaugas Lukosevicius', platform: 'uno', ign: 'Minluko#9735505'}
];

global.playerstats = getStats();

setTimeout(function(){
  global.playerstats = getStats();
}, 60000);


var io = require('socket.io').listen(server);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

io.on('connection', function(socket){
  //  Send initial data.
  socket.emit('UPDATE_PLAYERS', global.playerstats);

  socket.on('getStats', function(data){
    socket.emit('recievedStats', global.playerstats);
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

function getStats(){
  stats = [];
  players.forEach(function(player){
    var uri = `https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${player.platform}/gamer/${player.ign.replace('#', '%23')}/profile/type/mp`;
    // console.log(uri);
    request.get(uri, function(err, response, body){
      if(err){
        console.log(`${err}`.red);
        return {error: err};
      } else {
        var data = JSON.parse(response.body).data;
        if(data){
          if(data.lifetime){
            if(data.lifetime.all){
              var lifetime = data.lifetime.all;
            //  name, gamertag, platform, level, kills, deaths, kdRatio, scorePerMin
            return stats.push({
              name: player.name,
              gamertag: data.username,
              platform: player.platform,
              level: data.level,
              kills: lifetime.properties.kills,
              deaths: lifetime.properties.deaths,
              kdRatio: lifetime.properties.kdRatio,
              hits: lifetime.properties.hits,
              misses: lifetime.properties.misses,
              scorePerMin: lifetime.properties.scorePerMinute,
              headshots: lifetime.properties.headshots,
              assist: lifetime.properties.assists,
              scorePerMin: lifetime.properties.scorePerMinute,
              bestKills: lifetime.properties.recordKillsInAMatch,
              worstDeaths: lifetime.properties.recordDeathsInAMatch,
              bestSPM: lifetime.properties.bestSPM,
              bestScore: lifetime.properties.bestScore,
              bestKillstreak: lifetime.properties.recordKillStreak,
              levelXP: lifetime.properties.levelXpGained,
              levelXPRemain: lifetime.properties.levelXpRemainder,
              bestWinStreak: lifetime.properties.recordLongestWinStreak,
              wins: lifetime.properties.wins,
              losses: lifetime.properties.losses,
              WLRatio: lifetime.properties.winLossRatio,
              played: lifetime.properties.gamesPlayed,
              XPRemain: data.levelXpRemainder,
              XPGained: data.levelXpGained
            });
            } else { console.log("Could not find all for: " + player.name);}
          } else { console.log("Could not find lifetime for: " + player.name);}
        } else { console.log("Could not find data for: " + player.name);}
      }
    });
  });

  return stats;
}