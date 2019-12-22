module.exports = function(){
    //  Dependencies
    var express = require('express');
    var router = express.Router();
    require('colors');

    router.get('/', function(req, res, next){
        res.render('index.ejs', {
            title: "Home",
            version: global.version,
            content: 'asdaskjd naklsjhd lakjsh dlkjsh dlkash dkj'
        });
    });5
    return router;
};