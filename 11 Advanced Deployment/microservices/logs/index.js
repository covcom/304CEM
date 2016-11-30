var fs = require('fs');
var redis = require('ioredis');
var port = process.env.REDIS_PORT_6379_TCP_PORT;
var ip = process.env.REDIS_PORT_6379_TCP_ADDR;

var client = redis.createClient(port, ip, {});

console.log('REDIS PORT: '+port);
console.log('REDIS IP:   '+ip);
console.log('subscribed to "test" channel');

client.subscribe('logs');

client.on('message', function(channel, message) {
  console.log('MESSAGE RECEIVED');
  console.log('CHANNEL: '+channel);
  console.log('MESSAGE: '+message);
  var json = JSON.parse(message);
  var data = json.timestamp+',"'+json.name+'","'+json.message+'"'+"\n";
  console.log('LOG DATA: '+data);
  fs.appendFile('data/logs.csv', data, function () {
    console.log('DATA APPENDED TO LOG');
  });
});
