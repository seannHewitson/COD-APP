module.exports = function(){
    var router = require('express').Router();
    var request = require('request');
    var URL = require('url');

    router.get('/', function(req, res, next){
        res.send("Hello?<br>Looks like someone hit the wrong page....");
    });

    router.get('/:platform/:player/', function(req, res){
        var gamertag = encodeURI(req.params.player).replace('#', '%23');
        // console.log(req.protocol + '://' + req.get('host'));
        // res.send(`/API/Stats/${req.params.platform}/${gamertag}`);
        request.get(`${req.protocol}://${req.get('host')}/API/Stats/${req.params.platform}/${gamertag}`, function(err, response, body){
            if(err) return res.send(err);
            // res.send('asdbalkjsbdlkjsad');
            res.send(response.body);
        });
    });


    return router;
};

