var redis = require('ioredis');
/* linking to the redis container (in the docker-compose.yml file)
   provides a number of environment variable prefixed BROKER_*/
var port = process.env.REDIS_PORT_6379_TCP_PORT;
var ip = process.env.REDIS_PORT_6379_TCP_ADDR;
/* connecting to the redis broker so we can publish to the logs channel */
var broker = redis.createClient(port, ip, {});

/* linking to the mysql database container in the docker-compose.yml file
   provides a number of environment variables to connect to the database */
var mysql = require('mysql-promise')();
var host = process.env.DB_PORT_3306_TCP_ADDR;
var user = process.env.DB_ENV_MYSQL_USER;
var pass = process.env.DB_ENV_MYSQL_PASSWORD;
var db = process.env.DB_ENV_MYSQL_DATABASE;
mysql.configure({ "host": host, "user": user, "password": pass, "database": db });

var sql_create = 'CREATE TABLE IF NOT EXISTS message (id INT AUTO_INCREMENT primary key NOT NULL, name VARCHAR(30), message TEXT, timestamp int(11));'
mysql.query(sql_create)
  .then(function() {
    console.log(sql_create);
    console.log('message table created');
});

var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser());

server.listen(8080, function() {
    console.log('incoming request being handled');
    // lets list alll the env vars for the mysql database container
    console.log(process.env);

    server.get('/', function(req, res) {
      console.log('GET request received');
      res.setHeader('content-type', 'application/json');
      res.send(200, {msg: 'Docker is Great!'});
      res.end();
    });

    server.post('/', function(req, res) {
      var data = {
        name: req.params.name,
        message: req.params.message,
        timestamp: Math.round(+new Date()/1000)
      };
      console.log('message received');
      console.log(JSON.stringify(data, null, 2));
      var sql_insert = 'INSERT INTO message(name, message, timestamp) values("'+data.name+'", "'+data.message+'", '+data.timestamp+');';
      console.log(sql_insert);
      mysql.query(sql_insert)
        .then(function() {
          console.log('data inserted');
          /* we publish to the logs channel */
          broker.publish('logs', JSON.stringify(data, null, 2));
          res.setHeader('content-type', 'application/json');
          res.send(201, data);
          res.end();
        });
    });
});
