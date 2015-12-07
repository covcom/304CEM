/* the mongo connectivity and schemas are best kept in a separate file. */
var neo4j = require('./neo4j.js')

const stdin = process.openStdin()

stdin.on('data', function(chunk) {
  console.log(typeof chunk)
  var text = chunk.toString().trim()
  console.log(typeof text)
  
  if (text.indexOf('addfilm ') === 0) {
    var space = text.indexOf(' ')
    var name = text.substring(space+1).trim()
    console.log('adding "'+item+'"')
    const query = 'CREATE (FILM { name : name }) RETURN a'
    /* notice the use of 'arrow function' syntax to define the anonymous function parameter. */
    neo4j.runCypherQuery(query, {}, (err, res) => {
        
    })
  }
  
  if (text.indexOf('get ') === 0) {
    var space = text.indexOf(' ')
    var item = text.substring(space+1).trim()
    console.log('finding: ID "'+item+'"')
    mongo.getById(item, data => {
        console.log(data)
    })
  }
  
  if (text.indexOf('list') === 0) {
    mongo.getAll( data => {
        console.log(data)
    })
  }
  
  if (text.indexOf('clear') === 0) {
    mongo.clear( data => {
        console.log(data)
    })
  }
})
