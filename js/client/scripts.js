var io = io('/');


document.addEventListener('DOMContentLoaded', function(){
    io.on('listPlayers', function(data){
        players.innerHTML = '';
        for(var p in data){
            addPlayer(data[p]);
        }
    });
    console.log('Content Loaded')
    var playerStats = [];
    var players = document.getElementsByClassName('players')[0];
    
    
    function addPlayer(player){
        var li = document.createElement('li');
        li.className = player.status;
        var name = document.createElement('div');
        name.className = 'name';
        name.innerHTML = player.name;
        var plat = document.createElement('span');
        plat.className = player.platform == 'xbl' ? 'fab fa-xbox' : player.platform == 'psn' ? 'fab fa-playstation' : 'fas fa-mouse';
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