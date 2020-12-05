
const fs = require('fs');
const chalk = require('chalk');


                        // Remove Notes Code --->
 function removeNotes(title){
	const notes = loadNotes();

	const keepingNotes = notes.filter((note)=> note.title !== title );
	      
	  if(notes.length > keepingNotes.length){
	  	   saveNotes(keepingNotes);
		console.log(chalk.green.inverse('Successfully removed..'));
		   return ;
	  }
	  console.log(chalk.red.inverse('Such type of title is not found..'))
	}


	                        // Add Notes Code -->
function addNotes(title, body){
	const notes = loadNotes();

	const duplicateNotes = notes.filter((note)=>note.title === title ); // return subset of matched array ...
	     
	   if(duplicateNotes.length > 0){
	      return console.log(chalk.red.inverse("This Title is already taken"));
	   }

	notes.push({
	   title, body
	});

	saveNotes(notes);
	console.log(chalk.green.inverse("This note is added.."));
}

                     // Display all listed Notes Code..
function listNotes(){
	const notes = loadNotes();
	notes.forEach((note)=>{
	  console.log("<--"+chalk.green.inverse(note.title)+"-->");
	  console.log(chalk.inverse(note.body));
	});
}	                          

                  // Read a prticular notes
function readNotes(title){
     const notes = loadNotes();
	 const note = notes.find(note => note.title === title);

	 if(!note){
		  console.log(chalk.red.inverse("Sorry, this title of note is not found.."));
		  return ;
	 }
	  console.log("<--"+chalk.green.inverse(note.title)+"-->");
	  console.log(chalk.inverse(note.body));	 
}

                 // Save And Update Notes code ------->
function saveNotes(note){
  const notes = JSON.stringify(note);
  fs.writeFileSync('notes.json',notes);
}


                       // Load Notes From Source path --------->
const loadNotes = function(){
	try{
	  const bufNote = fs.readFileSync('notes.json');
	  const note = bufNote.toString();
	  const jsonNote = JSON.parse(note);
	  return jsonNote ;
	}
	catch(e){
	    return [] ;
	}
}

module.exports = { addNotes, removeNotes, listNotes, readNotes} ;