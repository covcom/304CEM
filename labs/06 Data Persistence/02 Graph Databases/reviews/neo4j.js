
var request  = require('request')

/* the key connection parameters are stored in private variables. This allows the automated tests to point the connection to a test server and avoid using the live data. */
const server = process.env.DB_PORT_1337_TCP_ADDR
const username = 'username'
const password = 'password'

var uri = 'http://'+username+':'+password+'@'+server+':7474/db/data/transaction/commit'
console.log('neo4j url: '+uri)

exports.runCypherQuery = function(query, params, callback) {
  request.post({
      uri: uri,
      json: {statements: [{statement: query, parameters: params}]}
    },
    function (err, res, body) {
      callback(err, body);
    });
}