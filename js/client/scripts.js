var io = io('/');


io.on('listPlayers', function(data){
    for(var p in data){
        console.log(data[p]);
    }
});