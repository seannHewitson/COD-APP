//  API Index route to be used for page requests (Searches, Autocomplete, Dropdowns ect.)

module.exports = function(){
    //  Dependencies
    var router = require('express').Router();
    var path = require('path');
    router.get('/', function(req, res, next){
        //  Redirect to main page?
        var obj = {key: "value"};
        res.send(JSON.stringify(obj));
    });
    
    // For Creating New DOM Elements on the web pages.
    // router.use('/GetDom', require('./GetDom')());

    return router;
};