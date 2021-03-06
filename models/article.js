// require mongoose
var mongoose = require('mongoose');
// create a schema class
var Schema = mongoose.Schema;

// create the article schema
var ArticleSchema = new Schema({
  // just a string
  title: {
    type:String
  },
  // just a string
  link: {
    type:String
  },
   description: {
    type:String
  },
  Author: {
    type:String
  },
  Status:{
  	type:Boolean
  },
   dateAdded:{
    type:Date
  }

});

// Remember, Mongoose will automatically save the ObjectIds of the notes.
// These ids are referred to in the Article model.

// create the Note model with the NoteSchema
var Article = mongoose.model('Article', ArticleSchema);

// export the Note model
module.exports = Article;