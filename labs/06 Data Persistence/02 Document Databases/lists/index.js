/* the mongo connectivity and schemas are best kept in a separate file. */
var mongo = require('./mongo.js')

const stdin = process.openStdin()

stdin.on('data', function(chunk) {
  console.log(typeof chunk)
  var text = chunk.toString().trim()
  console.log(typeof text)
  
  if (text.indexOf('add ') === 0) {
    var space = text.indexOf(' ')
    var item = text.substring(space+1).trim()
    console.log('adding "'+item+'"')
    /* notice the use of 'arrow function' syntax to define the anonymous function parameter. */
    mongo.addList(item, data => {
        console.log('returned: '+data)
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
