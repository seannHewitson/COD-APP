//  API Index route to be used for page requests (Searches, Autocomplete, Dropdowns ect.)

module.exports = function(){
    //  Dependencies
    var router = require('express').Router();
    var request = require('request');
    var path = require('path');
    router.get('/', function(req, res, next){
        //  Redirect to main page?
        var obj = {key: "value"};
        res.send(JSON.stringify(obj));
    });
    // var player = [
    //     {name: 'Sean', platform: 'xbl', ign: 'SeannnKiely'},
    //     {name: 'Dave', platform: 'xbl', ign: 'DShipley93'},
    // ];
    
      

    router.use('/:platform/:player/', function(req, res){
        var name = encodeURI(req.params.player);
        var uri = `https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${req.params.platform}/gamer/${name.replace('#', '%23')}/profile/type/mp`;
        console.log(uri);
        request.get(uri, function(error, response, body){
            if(error){
                var obj = {error: "Please specify an autocomplete type."};
                res.send(JSON.stringify(obj));
            } else {
                // level, 
                res.send(response.body);
            }
        });
    });

    router.use('/Friends/:platform/:player/', function(req, res){
        var name = encodeURI(req.params.player);
        var uri = `https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${req.params.platform}/gamer/${name.replace('#', '%23')}/profile/friends/type/mp`;
        console.log(uri);
        request.get(uri, function(error, response, body){
            if(error){
                var obj = {error: "Please specify an autocomplete type."};
                res.send(JSON.stringify(obj));
            } else {
                // level, 
                res.send(response.body);
            }
        });
    });
    
    // For Creating New DOM Elements on the web pages.
    // router.use('/GetDom', require('./GetDom')());

    return router;
};