var fetch = require('node-fetch');


function call(type, platform, gamertag = null){
    var uri = `https://my.callofduty.com/api/papi-client/${type}/cod/v1/title/mw/platform/${platform}/`;
    if(type == 'ce') uri += 'gameType/mp/communityMapData/availability';
    else {
        uri += gamertag == null ? "" : `gamer/${gamertag.replace('#', '%23')}`;
        uri += type == "stats" ? "/profile/type/mp" :
        "matches/mp/start/0/end/0/details?";
    }
    return fetch(uri)
    .then(function(response){   response.json() })
    .then(function(response){
        const { status, data: error } = response;
        if(status !== 'success')
            throw new Error(`API Error: ${error.message}`);
        return response;
    }).catch(function(){
        console.log("UNDEFINED ERROR");
    });
}

// module.exports = function(){
//     this.test = function(platform, gamertag){
//         return call("stats", platform, gamertag);
//     };
// };


test = function(platform, gamertag){
    return call("stats", platform, gamertag);
};

exports = module.exports = function(){
    console.log("Loaded COD Module");
};

exports.test = module.exports.test = function(platform, gamertag){
    return call("stats", platform, gamertag);
};