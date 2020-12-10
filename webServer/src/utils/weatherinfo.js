const request = require('request');

const weatherInfo = (longitude, latitude, callback) => {
       const url = 'http://api.weatherstack.com/current?access_key=d1540b3562a9932dba8c29e58e7ebf16&query='+latitude+','+longitude+'&units=m' ;
       request({url:url, json:true},(error,response)=>{
                  if(error){
                        callback('Unable to retrieve Weather Information..', undefined);
                  }else if(response.body.error){
                        callback('Unable to find out this location where you search for..', undefined);
                  }else{
                        callback(undefined,{
                          temperature : response.body.current.temperature,
                          feelslike : response.body.current.feelslike
                        });
                  }
       });
}

module.exports = weatherInfo ;