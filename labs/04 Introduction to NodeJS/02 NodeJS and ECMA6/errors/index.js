
var books = require('./books.js')

const input = process.openStdin()

input.on('data', chunk => {
  const text = chunk.toString().trim()
  const space = text.indexOf(' ')
  const item = text.substring(space).trim()
  if (text.indexOf('search ') === 0) {
    console.log('searching for "'+item+'"')
    /* Notice how the callback takes two parameters, an error and the data where a non-null error parameter indicates an error has ocurred. */
    books.search(item, (err, data) => {
      if (err) {
        /* the message property contains the string passed to the error object. */
        console.log(err.message)
        return
      }
      console.log(JSON.stringify(data, null, 2))
    })
  }
  if (text.indexOf('add ') === 0) {
    console.log('adding "'+item+'"')
    /* we call the synchronous function and assign its return value to a variable. */
    const result = books.add(item)
    /* we can then see if the returned object is an Error. */
    if (result instanceof Error) {
      console.log(result.message)
    } else {
      console.log(result)
    }
  }
})