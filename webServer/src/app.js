const express = require('express');
const path  = require('path');
const hbs  = require('hbs');
const app  = express();
const geoCode = require('./utils/geocode');
const weatherInfo = require('./utils/weatherinfo');
const port = 3000 ;

//console.log(path.join(__dirname,'..'));
const pubDir = path.join(__dirname,'../public');
const partialDir = path.join(__dirname,'../views/partials')

// set method to use for setting views
app.set('view engine','hbs');
hbs.registerPartials(partialDir);

//use methos is used a static directory public for static content.
app.use(express.static(pubDir));


//get method is used to access template pages.
app.get('',(req,res)=>{
res.render('index',{title :'home page'});
});

app.get('/signin',(req,res)=>{
res.render('signIn',{title :'Sign In page'});
});

app.get('/weather',(req,res)=>{
    if(!req.query.address)
       return res.send("Please provide a address by typing at URL like ?address=raipur ");
    
    geoCode(req.query.address, (error, {place, longitude, latitude} = {})=>{
           if(error)
              return res.send({error : 'Address not found'});

            weatherInfo(longitude, latitude, (error, {temperature, feelslike})=>{
                if(error)
                  return res.send({error : 'weatherInfo error'});

                  res.send({place, temperature, feelslike});
            });
    });
    
});


app.listen(port,()=>{
  console.log('Server is running on ',port);
});