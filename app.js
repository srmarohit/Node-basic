const yargs = require('yargs');
const { addNotes, removeNotes, listNotes, readNotes} = require('./notes.js');


yargs.command({
  command:'add',
  describe:'listing a note',
  builder:{
		title:{
			describe:"A Note Title",
			demandOption:true,
			type:"string"
		},
		body :{
			describe:"Describe your desription",
			demandOption:true,
			type:"string"
		}
  },
  handler : function(argv) {
		addNotes(argv.title, argv.body);
  }
});

yargs.command({
  command:"remove",
  describe:"remove the note",
  builder:{
		title:{
			describe:"A note Title",
			demandOption:true,
			type:"string"
		}
  },
  handler : function(argv){
		removeNotes(argv.title);
  }
});

yargs.command({
  command:"list",
  describe:"Show all listed notes",
  handler(argv){
		listNotes();
  }
});

yargs.command({
  command:"read",
  describe:"Reading the Note",
  builder:{
		title:{
			describe:"title of the Note",
			demandOption:true,
			type:"string"
		}
  },
  handler(argv){
		readNotes(argv.title);
  }
});

yargs.parse();