module.exports = function(){
    //  Dependencies
    var express = require('express');
    var router = express.Router();
    var request = require('request');
    require('colors');
    
    router.get('/', function(req, res, next){
        res.render('index.ejs', {
            title: "Home",
            version: global.version,
            content: 'asdaskjd naklsjhd lakjsh dlkjsh dlkash dkj'
        });
        // request.get('https://someplace', options, function(err,res,body){
        //     if(err){
        //         console.log(`${err}`.red);
        //         res.status(err.status || 500);
        //         res.render('error.ejs', {title: "Error", error: err});
        //     } else if(res.statusCode === 200 ){
                
        //     } else {
        //         res.status(err.status || 123);
        //         res.render('error.ejs', {title: "Error", error: "Undefined Error"});
        //     }
        // });
            
    });
    return router;
};