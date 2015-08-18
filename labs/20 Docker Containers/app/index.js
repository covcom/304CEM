var restify = require('restify');
var server = restify.createServer();
server.listen(8080, function() {
    console.log('incoming request being handled');

    server.get('/', function(req, res) {
        console.log('GET request received');
        res.setHeader('content-type', 'application/json');
        res.send({msg: 'Docker is Great!'});
        res.end();
    });
});
