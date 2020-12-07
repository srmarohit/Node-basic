const express = require('express');
const path  = require('path');
const app  = express();
const port = 3000 ;

//console.log(path.join(__dirname,'..'));
const pubDir = path.join(__dirname,'../public');


// set method to use for setting views
app.set('view engine','hbs');

//use methos is used a static directory public for static content.
app.use(express.static(pubDir));


//get method is used to access template pages.
app.get('',(req,res)=>{
res.render('index');
});

app.get('/signin',(req,res)=>{
res.render('signIn');
});

app.listen(port,()=>{
  console.log('Server is running on ',port);
});