const request = require('request');
const geoCode = require('./utils/geocode');
const weatherInfo = require('./utils/weatherinfo');
const address = process.argv[2]; // Address contains 2 element like raipur chhattisgarh
              // use command node app.js "raipur chhattisgarh"
if(address){
geoCode(address,(error, {place, longitude, latitude})=>{
      if(error){
            console.log(error);
      }  else{
             console.log(place);
            weatherInfo(longitude, latitude,(error, {temperature, feelslike})=>{
               if(error){
                console.log(error);
               }else{
                      console.log('Temperature :',temperature);
                      console.log('Feels Like :',feelslike);
               }
            });
      }
});
}else{
    console.log("Please Provide Address to find weather of there.");
}
