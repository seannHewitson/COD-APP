var fetch = require('node-fetch');


async function call(type, platform, gamertag = null){
    var uri = `https://my.callofduty.com/api/papi-client/${type}/cod/v1/title/mw/platform/${platform}/`;
    if(type == 'ce') uri += 'gameType/mp/communityMapData/availability';
    else {
        uri += gamertag == null ? "" : `gamer/${gamertag.replace('#', '%23')}`;
        uri += type == "stats" ? "/profile/type/mp" :
        "matches/mp/start/0/end/0/details?";
    }
    var response = await fetch(uri);
    var obj = await response.json();
    console.log(obj);
    return await obj;
}

exports.newtest = module.exports.newtest = async function(platform, gamertag){
    try {
        return call("stats", platform, gamertag);
    } catch(e) {
        return 'error';
    }
};


exports = module.exports = function(){
    console.log("Loaded COD Module");
};

exports.test = module.exports.test = async function(platform, gamertag){
    return await call("stats", platform, gamertag);
};

exports.test2 = module.exports.test2 = async function(platform, gamertag, type='stats'){
    var uri = `https://my.callofduty.com/api/papi-client/${type}/cod/v1/title/mw/platform/${platform}/`;
    if(type == 'ce') uri += 'gameType/mp/communityMapData/availability';
    else {
        uri += gamertag == null ? "" : `gamer/${gamertag.replace('#', '%23')}`;
        uri += type == "stats" ? "/profile/type/mp" :
        "matches/mp/start/0/end/0/details?";
    }
    try {
        const response = await fetch(uri);
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log(error);
      }
};