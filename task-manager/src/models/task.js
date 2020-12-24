const mongoose = require('mongoose');
const validator = require('validator');

const Task = mongoose.model('Task', {
              title: {
                 type: String,
                 minlength: 4,
                 required: true,
                 trim :true
              },
              description : {
                  type : String,
                  minlength : 8,
                  required:true
              },
              completed :{
                type : Boolean,
                default : false
              }
});

module.exports = Task;