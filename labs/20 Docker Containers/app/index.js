var fs = require('fs');
var restify = require('restify');
var server = restify.createServer();
server.listen(8080, function() {
    console.log('incoming request being handled');

    server.get('/', function(req, res) {
      console.log('GET request received');
      var filename = 'data/'+Math.round(+new Date()/1000)+'.json';
      console.log(filename);
      fs.writeFile(filename, {msg: 'Docker is Great!'}, function() {
        console.log("The file was saved!");
        res.setHeader('content-type', 'application/json');
        res.send({msg: 'Hello World!'});
        res.end();
      });
    });
});
