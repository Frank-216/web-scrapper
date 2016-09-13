/* Showing Mongoose's "Populated" Method (18.3.8)
 * INSTRUCTOR ONLY
 * =============================================== */

// dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
// Notice: Our scraping tools are prepared, too
var request = require('request'); 
var cheerio = require('cheerio');

var PORT = process.env.PORT || 3000;

// use morgan and bodyparser with our app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

// make public a static dir
app.use(express.static('public'));

//Set Handlebars 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars')
// Database configuration with mongoose
mongoose.connect('mongodb://heroku_0rsng7jf:1nigkf4b6dr486ps57crmffcrr@ds019956.mlab.com:19956/heroku_0rsng7jf');


var db = mongoose.connection;

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
// once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// And we bring in our Note and Article models
var Article = require('./models/article.js');
var Note = require('./models/Notes.js');
// Routes
// ======

// Simple index route
app.get('/', function(req, res) {
  res.render("index");
});

// A GET request to scrape the echojs website.
app.get('/scrape', function(req, res) {
// first, we grab the body of the html with request
	request("https://www.entrepreneur.com/us", function (error, response, html) {
	// load the html into cheerio
	var $ = cheerio.load(html);
	// make an empty array for saving our scraped info
	var result = {};
	// with cheerio, look at each award-winning site, 
	// enclosed in "figure" tags with the class name "site"
	$("#more-art .pl").each(function(i, element){

		/* Cheerio's find method will "find" the first matching child element in a parent.*/
		result.title = $(element).find('h3').find('a').text();
		result.link = "https://www.entrepreneur.com/" + $(element).find('h3').find('a').attr('href');
		result.description = $(element).find(".deck").text();
		author = $(element).find('.byline').find('a').text();
		result.status = true;

		var entry = Article(result);
		// going into article and checking if title exists.  if title exists we do not add it if it does not exist we add it. 
		var check = Article.findOne({title:result.title});
		if(check === null){
		entry.save(function(err, doc) {
			// log any errors
			  if (err) {
			    console.log(err);
			  } 
			  // or log the doc
			  else {

			    console.log(doc);
			  }
			});
		}else(
			console.log("value not added. Already exists. ")
			)
		});
	});
  // tell the browser that we finished scraping the text.
  res.redirect("articles");
});

// this will get the articles we scraped from the mongoDB
app.get('/articles', function(req, res){
	// grab every doc in the Articles array
	Article.find({}).limit(10).exec(function(err, doc){
		// log any errors
		if (err){
			console.log(err);
		} 
		// or send the doc to the browser as a json object
		else {
			res.render("articles",{
				data:doc
			})
		}

	});
});

// grab an article by it's ObjectId
app.get('/articles/:id', function(req, res){
	// using the id passed in the id parameter, 
	// prepare a query that finds the matching one in our db...
	Article.findOne({'_id': req.params.id}).limit(1)
	// and populate all of the notes associated with it.
	// .populate('note')
	// now, execute our query
	.exec(function(err, doc){
		// log any errors
		if (err){
			console.log(err);
		} 
		// otherwise, send the doc to the browser as a json object
		else {
			// res.JSON(data);
			console.log(doc);
			console.log(true);
			res.render("single",{
				data:doc
			});
		}
	});
});

app.get("/single", function(req,res){
	console.log(false);
	console.log(req.doc);
})
// app.get("/save",function(req,res){

// 	var newNote = new Note (req.body)
// 	Article.populate('note').exec(function(err,data){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			res.json(data);
// 		}
// 	})
// })
// replace the existing note of an article with a new one
// // or if no note exists for an article, make the posted note it's note.
app.post('/save', function(req, res){
	// create a new note and pass the req.body to the entry.
	console.log(req.body);
	var newNote = {};
	newNote.comments = req.body;
	var item = new Note(newNote);	
	// and save the new note the db
	item.save(function(err, doc){
		// log any errors
		if(err){
			console.log(err);
		} 
		// otherwise
		else {
			// using the Article id passed in the id parameter of our url, 
			// prepare a query that finds the matching Article in our db
			// and update it to make it's lone note the one we just saved
			Article.findOneAndUpdate({'_id': req.params.id}, {'note':doc._id})
			// execute the above query
			.exec(function(err, doc){
				// log any errors
				if (err){
					console.log(err);
				} else {
					// or send the document to the browser
					res.json(doc);
				}
			});
		}
	});
});







// listen on port 3000
app.listen(PORT, function() {
  console.log('App running on port 3000!');
});