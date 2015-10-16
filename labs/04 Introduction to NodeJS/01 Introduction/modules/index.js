
const stdin = process.openStdin()

var todo = require('./todo.js')

/* this is the same event handler as in the previous example. */
stdin.on('data', function(chunk) {
  /* we call the command property of the todo object and pass the data */
  todo.command(chunk)
})
