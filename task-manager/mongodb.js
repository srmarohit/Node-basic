const mongodb = require('mongodb');
const {MongoClient, ObjectID} = mongodb ;
const uri = 'mongodb://localhost:27017' ;
const dbName = "task-manager";

MongoClient.connect(uri ,{useNewUrlParser:true},(error, client)=>{
   if(error){
		  console.log("Unable to Connect "+error);
   }else{
		  console.log("Connected Succesfuly..");
		  const db = client.db(dbName);

	/*	  db.collection('users').insertOne({
		       name :"Rahul",
			   age:32
		   },(error, result)=>{
		      if(error){
					console.log(error +" error in inserting document ..")
			  }else{
					console.log(result.ops);
			  }
		   }); 
		   

		   db.collection('tasks').insertMany([
		       {
					  task : "Bathing at 6:00 AM",
					  completed: true
			   },
			   {
			         task : "Press Cloth",
					 completed : true
			   }
		   ],(error, result)=>{
		      if(error)
			     return console.log("Error in storing data of using insertMany() method..");

			console.log(result.ops);
		   });
		   

		   db.collection('tasks').find({}).toArray((error, task)=>{   // it gives all data in a Array
		       if(error)
			     return console.log("Error in finding data of using find({}).toArray() method..");
 
				  console.log(task);
		   });

		    db.collection('tasks').find({completed:true}).count((error, count)=>{  // it gives counts of fetched data
		       if(error)
			     return console.log("Error in finding data of using find({}).toArray() method..");
 
				  console.log(count);
		   });
		   

		   db.collection('tasks').updateMany({
		       completed : true
		   },
		   {
		         $set : {
				    completed : false
				 }
		   }
		   ).then(result =>{
		         console.log(result.modifiedCount);
		   }).catch(error => console.log("Error in updating File.."));

		   */

		   db.collection("users").deleteOne({age : 89}).then(result=>console.log(result)).catch(error=>console.log(error));
		   client.close();
   }
});