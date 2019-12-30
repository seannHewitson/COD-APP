var io = io('/');


document.addEventListener('DOMContentLoaded', function(){
    var players = document.getElementsByClassName('players')[0];
    io.on('listPlayers', function(data){
        players.innerHTML = '';
        for(var p in data){
            players.appendChild(buildPlayerCard(data[p]));
        }
    });
    io.emit('getStats', {data: 'test'});
    io.on('recievedStats', function(data){
        console.log(data);
    });
    
    function addPlayer(player){
        var li = document.createElement('li');
        li.className = player.status;
        var name = document.createElement('div');
        name.className = 'name';
        name.innerHTML = player.name;
        var plat = document.createElement('span');
        plat.className = player.platform == 'xbl' ? 'fab fa-xbox' : player.platform == 'psn' ? 'fab fa-playstation' : 'fab fa-battle-net';
        name.appendChild(plat);
        li.appendChild(name);
        var gamertag = document.createElement('div');
        gamertag.className = 'gamertag';
        gamertag.innerHTML = player.ign == '' ? 'undefined' : player.ign;
        var rank = document.createElement('span');
        rank.className = 'rank';
        rank.innerHTML = '32';
        gamertag.appendChild(rank);
        li.appendChild(gamertag);
        li.onmouseover = function(){
            var active = players.querySelector('.active');
            if(active) active.classList.remove('active');
            this.classList.add('active');
        };
        //  Game Icon far-right,
        //  In game level?
        //  Ign small bottom?
        players.appendChild(li);
        players.querySelector('li').classList.add('active');
    }
});



function buildPlayerCard(player){
    var card = document.createElement('li');
    //  Top Row - Name, Gamertag & Platform
    var name = document.createElement('div');
    name.className = 'name';
    name.innerText = `${player.name} - ${player.gamertag}`;
    var platform = document.createElement('span');
    platform.className = 'platform ';
    // console.log(player.platform);
    var icon = document.createElement('i');
    icon.className = 'fab ' + (player.platform == 'xbl' ? 'fa-xbox' : player.platform == 'psn' ? 'fa-playstation' : 'fa-windows');
    platform.appendChild(icon);
    name.appendChild(platform);
    //  Second Row - Basic Stats(Rank, Kills, Deaths, Ratio, Score Per Min, Accuracy)
    card.appendChild(name);
    var stats = document.createElement('ul');
    stats.className = 'list stretch';
    stats.appendChild(statItem('Level', player.level, `${player.name}'s Level`));
    stats.appendChild(statItem('Kills', player.kills.toLocaleString(), `${player.name}'s Kills`));
    stats.appendChild(statItem('Deaths', player.deaths.toLocaleString(), `${player.name}'s Deaths`));
    stats.appendChild(statItem('KD Ratio', player.kdRatio.toFixed(2), `${player.name}'s KD Ratio`));
    stats.appendChild(statItem('SPM', player.scorePerMin.toFixed(2), `Score Per Minute`));
    card.appendChild(stats);
    // card.onmouseover = function(){
    //     var players = document.getElementsByClassName('players')[0];
    //     var active = players.querySelector('.active');
    //     if(active) active.classList.remove('active');
    //     this.classList.add('active');
    // };
    card.onclick = function(){
        var title = document.getElementById('statsTitle');
        var firstName = player.name.split(' ')[0];
        title.innerText = `${firstName}'s Stats`;
        io.emit('getStats', {data: player.gamertag});
    };
    return card;
}
//  name, gamertag, platform, level, kills, deaths, kdRatio, scorePerMin
function statItem(text, value, hover){
    var li = document.createElement('li');
    var val = document.createElement('span');
    val.className = 'statValue';
    val.innerText = value;
    li.appendChild(val);

    var txt = document.createElement('span');
    txt.className = 'stat';
    txt.innerText = text;
    li.appendChild(txt);
    li.title = hover;
    return li;
}