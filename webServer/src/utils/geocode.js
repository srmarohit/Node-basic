const request = require('request');

const geoCode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicmRzMTEwNyIsImEiOiJjazd1cmN6bnUxMXRtM29tcm9taHgwNjBlIn0.2-RCqlmz6DJ-F4d_6G5Jew&limit=1' ;
     request({url:url, json:true},(error, response)=>{
        if(error){
            callback('Unable to retrieve Location !', undefined);
        }else if(response.body.features.length == 0){
            callback('Unable to Find this Location! Try another location..', undefined);
        }else {
            const data = {
              place : response.body.features[0].place_name,
              longitude :response.body.features[0].center[0],
              latitude: response.body.features[0].center[1]
            };
            callback(undefined, data);
        }
     });
}

module.exports = geoCode ;