// Simple Restify API Server
// Coventry University Findland Visit 2015
// Colin Stephen

// Import modules
// PREREQUISITE: Remember to do "npm install" for both 'restify' and 'nano' modules
var restify = require('restify'); 
var server = restify.createServer();
var nano = require('nano')('http://localhost:5984');

// Set up DB access
// PREREQUISITE: Use CouchDB web interface to create an "articles" database beforehand
var articles = nano.use('articles');

// Configure Restify middleware
server
    .use(restify.fullResponse())
    .use(restify.bodyParser())
 
// Define Article API route endpoints
// TASK: uncomment the middle 3 routes and write their handlers below
server.post("/articles", createArticle);
//server.get("/articles", listArticles);
//server.put("/articles/:id", updateArticle);
//server.del("/articles/:id", deleteArticle);
server.get("/articles/:id", viewArticle);

// Launch the API server
// TASK: Run the server with "node index.js" in the terminal
var port = process.env.PORT || 3000;
server.listen(port, function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
});

// Define API route handlers
function createArticle(req, res, next) {
    articles.insert(req.body, function(err, body) {
        if (!err) {
            console.log("article added, returning data to client");
            res.json({result: "success", data: body});
        } else {
            console.log("error adding article");
            res.json(err);
        }
        res.send();
    });
}

function viewArticle(req, res, next) {
    articles.get(req.params.id, function(err, body) {
        if (!err) {
            console.log("article found, returning data to client");
            res.json({result: "success", data: body});
        } else {
            console.log("error finding the article");
            res.json(err);
        }
        res.send();
    });
}
