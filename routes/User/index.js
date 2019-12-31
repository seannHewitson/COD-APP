module.exports = function(){
    var router = require('express').Router();
    var request = require('request');

    router.get('/', function(req, res, next){
        res.send("Hello?<br>Looks like someone hit the wrong page....");
    });

    router.get('/Stats/:platform/:player/', function(req, res){
        var gamertag = encodeURI(req.params.player);
        var uri = getAPIString('stats', req.params.platform, gamertag);
        request.get(uri, function(err, response, body){
            if(err)
                return res.send(err);
            res.send(response.body);
        });
    });


    return router;
};

