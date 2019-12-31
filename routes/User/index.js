module.exports = function(){
    var router = require('express').Router();
    var request = require('request');

    router.get('/', function(req, res, next){
        res.send("Hello?<br>Looks like someone hit the wrong page....");
    });

    router.get('/:platform/:player/', function(req, res){
        var gamertag = encodeURI(req.params.player).replace('#', '%23');
        request.get(`/API/Stats/${req.params.platform}/${gamertag}`, function(err, response, body){
            if(err) return res.send(err);
            res.send(response.body);
        });
    });


    return router;
};

