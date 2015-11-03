var restify = require('restify')
var server = restify.createServer()

/* import the required plugins to parse the body and auth header. */
server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())

var recipes = ['Recipe 1: milk, eggs, flour', 'Recipe 2: eggs, ham, bread'];

server.get('/recipes', function (request, response) {
    // this is where you access the DB OR access an external API for data
    var data = recipes;
    var dataJson = JSON.stringify(data);
    response.setHeader('content-type', 'application/json');
    response.send(200, dataJson);
    response.end();
});

server.post('/recipes', function (request, response) {
    const body = request.body;
    console.log(body);
    response.send(201, "");
    response.end();
})


var port = process.env.PORT || 8080;
server.listen(port, function (err) {
  if (err) {
      console.error(err);
  } else {
    console.log('App is ready at : ' + port);
  }
})
