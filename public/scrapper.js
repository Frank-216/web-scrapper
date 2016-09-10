// $(document).ready(function(){
//   /* Scraper: Server #3  (18.2.1) 
//  * ========================= */

// 	// Dependencies:
// 	var request = require('request'); // Snatches html from urls
// 	var cheerio = require('cheerio'); // Scrapes our html


// 	// first, tell the console what server3.js is doing
// 	console.log("\n******************************************\n" +
// 	"Look at the image of every award winner in \n" +
// 	"one of the pages of https://www.entrepreneur.com/us. Then,\n" +
// 	"grab the image's source url." +
// 	"\n******************************************\n")


// 	// run request to grab the html from awwards's clean website section
// 	request("https://www.entrepreneur.com/us", function (error, response, html) {
// 	// load the html into cheerio
// 	var $ = cheerio.load(html);
// 	// make an empty array for saving our scraped info
// 	var result = {};
// 	// with cheerio, look at each award-winning site, 
// 	// enclosed in "figure" tags with the class name "site"
// 	$("#more-art .pl").each(function(i, element){

// 		 Cheerio's find method will "find" the first matching child element in a parent.
// 		result.title = $(element).find('h3').find('a').text();
// 		result.link = $(element).find('h3').find('a').attr('href');
// 		result.description = $(element).find(".deck").text()
// 		result.author = $(element).find('.byline').find('a').text();
// 		result.status = true;

// 		var entry = Article(result);

// 	 entry.save(function(err, doc) {
// 			// log any errors
// 		  if (err) {
// 		    console.log(err);
// 		  } 
// 		  // or log the doc
// 		  else {
// 		    console.log(doc);
// 		  }
// 		});
// 	});

// 	// push the image's url (saved to the imgLink var) into the result array
// 	// result.push({
// 	// "Title": title,
// 	// "Link": "https://www.entrepreneur.com/" +link,
// 	// "Description": description,
// 	// "Author": author
// 	// }
// 	// );
// 	// });

// 	// with each link scraped, log the result to the console
// 	console.log(result);
// 	console.log("+++++++++++++++++++++++++++++++++++++++")
// 	for(var i = 0; i < result.length;i++){
// 	console.log(result[i]);

// 	}
// 	});

// });
