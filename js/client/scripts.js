var io = io('/');
var CUR_FILTER = 'bestKills';
var PLAYER_LIST = [];

document.addEventListener('DOMContentLoaded', function(){
    io.on('UPDATE_PLAYERS', function(data){
        PLAYER_LIST = data;
        updatePlayers();
    });

    //  Sort By
    var sortBy = document.getElementById('ddlSelect');
    sortBy.addEventListener("change", function(){
        CUR_FILTER = this.options[this.selectedIndex].value;
        updatePlayers();
    });
});

function updatePlayers(){
    var players = document.getElementById('playerlist');
    players.innerHTML = '';
    PLAYER_LIST = sortArrayOfObjects(PLAYER_LIST, CUR_FILTER);
    PLAYER_LIST.forEach(function(PLAYER){
        players.appendChild(createPlayerCard(PLAYER));
    });
}

function createPlayerCard(player){
    var card = document.createElement('li');
    card.id = player.name.replace(/ /g, '-');
    //  Top Row (Basic info and record stats)
    var bests = [
        {key: player.name, value: player.gamertag},
        {key: 'Best Kills', value: player.bestKills},
        {key: 'Worst Deaths', value: player.worstDeaths},
        {key: 'Best SPM', value: player.bestSPM.toLocaleString()},
        {key: 'Best Score', value: player.bestScore.toLocaleString()},
        {key: 'Best KillStreak', value: player.bestKillstreak},
        {key: 'Best WinStreak', value: player.bestWinStreak}
    ];
    var top = document.createElement('div');
    top.className = 'top ml-2';
    var best = createList(bests);
    best.style.width = 'calc(100% - 50px)';
    var iconli = document.createElement('li');
    iconli.className = 'ta-c pl-0-5';
    iconli.title = getPlatformName(player.platform);
    var icon = document.createElement('i');
    icon.innerHTML = '&nbsp;'
    icon.className = `fab fa-${getPlatformIcon(player.platform)}`;

    iconli.appendChild(icon);
    best.insertAdjacentElement('afterbegin', iconli);
    top.appendChild(best);
    card.appendChild(top);
    //  Insert list item: getPlatform(player.platform) at begining of list.
    //  Middle Row (Rank Progress)
    var rank = document.createElement('div');
    rank.className = 'rank';
    var curRank = document.createElement('div');
    curRank.className = 'playerrank';
    curRank.title = 'Current Level';
    insertKeyValue(curRank, 'Level', player.level);

    rank.appendChild(curRank);
    if(player.level < 155){
        var nextRank = document.createElement('div');
        nextRank.className = 'playerrank next';
        nextRank.title = 'Next Level';
        insertKeyValue(nextRank, 'Next Level', (player.level + 1));
        rank.appendChild(nextRank);
    }

    var progress = document.createElement('div');
    progress.className = 'progress';
    progress.style.width = ((player.XPRemain / (player.XPRemain + player.XPGained)) *100).toFixed(2) + "%";
    rank.appendChild(progress);

    card.appendChild(rank);
    //  Bottom Row (Totals and Averages)
    var totals = [
        {key: 'Kills', value: player.kills.toLocaleString()},
        {key: 'Deaths', value: player.deaths.toLocaleString()},
        {key: 'K/D Ratio', value: player.kdRatio.toFixed(2)},
        {key: 'Hits', value: player.hits.toLocaleString()},
        {key: 'Misses', value: player.misses.toLocaleString()},
        {key: 'SPM', value: player.scorePerMin.toFixed(2)},
        {key: 'Headshots', value: player.headshots.toLocaleString()},
        {key: 'Assists', value: player.assist.toLocaleString()},
        {key: 'Wins', value: player.wins.toLocaleString()},
        {key: 'Losses', value: player.losses.toLocaleString()},
        {key: 'W/L Ratio', value: player.WLRatio.toFixed(2)},
        {key: 'Games Played', value: player.played.toLocaleString()}
    ];
    var bottom = document.createElement('div');
    bottom.appendChild(createList(totals));
    card.appendChild(bottom);

    return card;
}

function createList(arr){
    var list = document.createElement('ul');
    list.className = 'list stretch';
    arr.forEach(function(item){
        list.appendChild(createItem(item.key, item.value));
    });
    return list;
}

function createItem(key, value, className = null){
    var li = document.createElement('li');
    insertKeyValue(li, key, value);
    return li;
}
function insertKeyValue(element, key, value){
    var val = document.createElement('span');
    val.className = 'dataVal';
    val.innerHTML = value;
    element.appendChild(val);
    var title = document.createElement('span');
    title.className = 'dataTitle';
    title.innerHTML = key;
    element.appendChild(title);
}

function getPlatformName(p){
    return p == 'xbl' ? 'XBOX' : p == 'psn' ? 'Playstation' : p == 'battle' ? 'Battle Net' : 'Activision';
}

function getPlatformIcon(p){
    return p == 'xbl' ? 'xbox' : p == 'psn' ? 'playstation' : 'battle-net';
}

function sortArrayOfObjects(arr, key){
    return arr.sort((a, b) => {
      return b[key] - a[key];
    });
  }





// document.addEventListener('DOMContentLoaded', function(){
//     var players = document.getElementsByClassName('players')[0];
//     io.on('listPlayers', function(data){
//         console.log(data);
//         players.innerHTML = '';
//         for(var p in data){
//             players.appendChild(buildPlayerCard(data[p]));
//         }
//     });
//     io.emit('getStats', {data: 'test'});
//     io.on('recievedStats', function(data){
//         console.log(data);
//     });
    
//     function addPlayer(player){
//         var li = document.createElement('li');
//         li.className = player.status;
//         var name = document.createElement('div');
//         name.className = 'name';
//         name.innerHTML = player.name;
//         var plat = document.createElement('span');
//         plat.className = player.platform == 'xbl' ? 'fab fa-xbox' : player.platform == 'psn' ? 'fab fa-playstation' : 'fab fa-battle-net';
//         name.appendChild(plat);
//         li.appendChild(name);
//         var gamertag = document.createElement('div');
//         gamertag.className = 'gamertag';
//         gamertag.innerHTML = player.ign == '' ? 'undefined' : player.ign;
//         var rank = document.createElement('span');
//         rank.className = 'rank';
//         rank.innerHTML = '32';
//         gamertag.appendChild(rank);
//         li.appendChild(gamertag);
//         li.onmouseover = function(){
//             var active = players.querySelector('.active');
//             if(active) active.classList.remove('active');
//             this.classList.add('active');
//         };
//         //  Game Icon far-right,
//         //  In game level?
//         //  Ign small bottom?
//         players.appendChild(li);
//         players.querySelector('li').classList.add('active');
//     }
// });

// function buildPlayer(player){
//     var player = document.getElementById('playerCard');
// }

// function buildPlayerCard(player){
//     var card = document.createElement('li');
//     //  Top Row - Name, Gamertag & Platform
//     var name = document.createElement('div');
//     name.className = 'name';
//     name.innerText = `${player.name} - ${player.gamertag}`;
//     var platform = document.createElement('span');
//     platform.className = 'platform ';
//     // console.log(player.platform);
//     var icon = document.createElement('i');
//     icon.className = 'fab ' + (player.platform == 'xbl' ? 'fa-xbox' : player.platform == 'psn' ? 'fa-playstation' : 'fa-battle-net');
//     platform.appendChild(icon);
//     name.appendChild(platform);
//     //  Second Row - Basic Stats(Rank, Kills, Deaths, Ratio, Score Per Min, Accuracy)
//     card.appendChild(name);
//     var stats = document.createElement('ul');
//     stats.className = 'list stretch';
//     stats.appendChild(statItem('Level', player.level, `${player.name}'s Level`));
//     stats.appendChild(statItem('Kills', player.kills.toLocaleString(), `${player.name}'s Kills`));
//     stats.appendChild(statItem('Deaths', player.deaths.toLocaleString(), `${player.name}'s Deaths`));
//     stats.appendChild(statItem('KD Ratio', player.kdRatio.toFixed(2), `${player.name}'s KD Ratio`));
//     stats.appendChild(statItem('SPM', player.scorePerMin.toFixed(2), `Score Per Minute`));
//     card.appendChild(stats);
//     // card.onmouseover = function(){
//     //     var players = document.getElementsByClassName('players')[0];
//     //     var active = players.querySelector('.active');
//     //     if(active) active.classList.remove('active');
//     //     this.classList.add('active');
//     // };
//     card.onclick = function(){
//         var title = document.getElementById('statsTitle');
//         var firstName = player.name.split(' ')[0];
//         title.innerText = `${firstName}'s Stats`;
//         io.emit('getStats', {data: player.gamertag});
//     };
//     return card;
// }
// //  name, gamertag, platform, level, kills, deaths, kdRatio, scorePerMin
// function statItem(text, value, hover){
//     var li = document.createElement('li');
//     var val = document.createElement('span');
//     val.className = 'statValue';
//     val.innerText = value;
//     li.appendChild(val);

//     var txt = document.createElement('span');
//     txt.className = 'stat';
//     txt.innerText = text;
//     li.appendChild(txt);
//     li.title = hover;
//     return li;
// }