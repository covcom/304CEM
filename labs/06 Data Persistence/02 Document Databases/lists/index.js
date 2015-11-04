
/* here we create an **immutable variable** (constant) holding a reference to **stdin** (defaults to the keyboard) */
const stdin = process.openStdin()

// this array will hold the list items
var items = []

/* this is an event handler. The second parameter is a callback function that runs when the event is fired. */
stdin.on('data', function(chunk) {
  /* chunk is of type *Object* and needs to be converted into a String */
  console.log(typeof chunk)
  var text = chunk.toString().trim()
  console.log(typeof text)
  /*  */
  if (text.indexOf('add ') === 0) {
    var space = text.indexOf(' ')
    var item = text.substring(space+1).trim()
    console.log('adding "'+item+'"')
    items.push(item)
  }
  if (text.indexOf('list') === 0) {
    items.forEach(function(item, index) {
      console.log(index+'. '+item)
    })
  }
})
