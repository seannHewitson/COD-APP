module.exports = function(){
    //  Dependencies
    var express = require('express');
    var router = express.Router();
    var request = require('request');
    require('colors');

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
      
    var stats = getStats();

    setTimeout(function(){
        stats = getStats();
    }, 60000);

    router.get('/', function(req, res, next){
        res.render('index.ejs', {
            title: "Home",
            version: global.version,
            players: stats
        });            
    });
    return router;

    function getStats(){
        stats = [];
        players.forEach(function(player){
          var name = encodeURI(player.ign);
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
                    played: lifetime.properties.gamesPlayed
                  });
                  } else { console.log("Could not find all for: " + player.name);}
                } else { console.log("Could not find lifetime for: " + player.name);}
              } else { console.log("Could not find data for: " + player.name);}
            }
          });
        });
      
        return stats;
      }
};