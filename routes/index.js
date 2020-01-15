module.exports = function(stats){
    //  Dependencies
    var express = require('express');
    var router = express.Router();
    var path = require('path');
    var fs = require('fs');

    router.get('/', function(req, res, next){
        res.render('index.ejs', {
            title: "Home",
            version: global.version
        });            
    });

    router.get('/Test', function(req, res, next){
      res.send(fs.readFileSync(path.resolve(global.root_path + '/newcard.html'), {encoding: 'utf8'}));
    });

    return router;
};