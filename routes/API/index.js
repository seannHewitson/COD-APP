module.exports = function(){
    var router = require('express').Router();
    var request = require('request');
    var cod = require(`${__dirname}/cod.js`);
    
    var XSRF = 'XOXknnBMkIsl6Fz0HPOAAKNadbL1oTXqeqaWF7ubJRWXYuJmyVhjEnT6-Twi2He5';
    var UTKN = null;
    var RTKN = null;

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
    router.get('/Test/:platform/:player/', function(req, res){
        
        var gamertag = encodeURI(req.params.player);
        res.send(cod.test(req.params.platform, gamertag));
    });

    router.get('/Friends/:platform/:player/', function(req, res){
        var gamertag = encodeURI(req.params.player);
        var uri = getAPIString('stats', req.params.platform, gamertag).replace('/profile/type', '/profile/friends/type');
        request.get(uri, function(err, response, body){
            if(err)
                return res.send(err);
            res.send(response.body);
        });
    });

    router.get('/Maps/:platform/', function(req, res){
        var uri = getAPIString('ce', req.params.platform).replace('/profile/type', '/profile/friends/type');
        request.get(uri, function(err, response, body){
            if(err)
                return res.send(err);
            res.send(response.body);
        });
    });


    router.get('/Auth/', function(req, res){
        var uri = 'https://profile.callofduty.com/cod/login';
        request.get(uri, function(err, response, body){
            if(err)
                return res.send(err);
            res.send(response.body);
        });
    });

    // router.get('/Recents/:platform/:player/', function(req, res){
    //     var gamertag = encodeURI(req.params.player);
    //     var uri = getAPIString('crm', platform, gamertag).replace('/profile/type', '/profile/friends/type');
    //     //  request post.
    //     if(UTKN == null || RTKN == null){
    //         authenticate();
    //     }
    //     request.get({
    //         headers: {'Cookie': `utkn=${UTKN}; rtkn=${RTKN};`},
    //         url: uri
    //     });


    //     request.get(uri, function(err, response, body){
    //         if(err)
    //             return res.send(err);
    //         res.send(response.body);
    //     });
    // });

    function getAPIString(type, platform, gamertag = null){
        //  Possible types: stats, ce, crm, 
        var base = `https://my.callofduty.com/api/papi-client/${type}/cod/v1/title/mw/platform/${platform}/`;
        if(type == "ce")    base += "gameType/mp/communityMapData/availability";
        else {
            if(gamertag != null)
                base += `gamer/${gamertag.replace('#', '%23')}`;
            if(type == "stats")
                base += "/profile/type/mp";
            else base += "matches/mp/start/0/end/0/details?";
            //first 0 is start second is end
            //  "utcStartSeconds": 1574621539,
            //  "utcEndSeconds": 1574622145,
        }
        return base;
    };

    function authenticate(){
        //  Get CSRF-Token -> Get Auth token.
        request.get('https://profile.callofduty.com/cod/login', function(error, response){
            if(error)   return error;
            return response;
        });
        // authToken = result;
    };

    return router;
};

