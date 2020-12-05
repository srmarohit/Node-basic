const request = require('request');
const geoCode = require('./utils/geocode');
const weatherInfo = require('./utils/weatherinfo');
const address = process.argv[2]; // Address contains 2 element like raipur chhattisgarh
              // use command node app.js "raipur chhattisgarh"
if(address){
geoCode(address,(error, data)=>{
      if(error){
            console.log(error);
      }  else{
             console.log(data.place);
            weatherInfo(data.longitude, data.latitude,(error, data)=>{
               if(error){
                console.log(error);
               }else{
                      console.log('Temperature :',data.temperature);
                      console.log('Feels Like :',data.feelslike);
               }
            });
      }
});
}else{
    console.log("Please Provide Address to find weather of there.");
}
