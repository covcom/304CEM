
/* this is a private variable that is not visible outside the module. */
var items = []

/* this is a private function that is only visible within this module. */
function add(data) {
  console.log('adding item')
  var text = data.toString().trim()
  console.log('text: '+text)
  var space = text.indexOf(' ')
  var item = text.substring(space+1).trim()
  console.log('item: '+item)
  console.log('adding "'+item+'"')
  items.push(item)
}

function list() {
  console.log('listing items')
  items.forEach(function(item, index) {
    console.log(index+'. '+item)
  })
}

/* this defines a **command** property that stores this anonymous function. It is accessible when this module is imported. */
exports.command = function(data) {
  /* convert the object into a string and remove whitespace */
  var text = data.toString().trim()
  /* checking for the **keyword** at the start of the string */
  if (text.indexOf('add ') === 0) {
    add(data)
  }
  if (text.indexOf('list') === 0) {
    list()
  }
}
