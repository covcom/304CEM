
var list = require('./modules/todo')

const stdin = process.openStdin()

stdin.on('data', chunk => {
  const text = chunk.toString().trim()
  if (text.indexOf('add ') === 0) {
    const item = text.substring(4)
    list.add(item)
  }
  if (text.indexOf('list') === 0) {
    const items = list.getAll()
    items.forEach(function(item, index) {
      console.log(index+'. '+JSON.stringify(item))
    })
  }
  if (text.indexOf('del ') === 0) {
    const index = parseInt(text.substring(4))
    list.removeIndex(index)
  }
  if (text.indexOf('clear') === 0) {
    list.clear()
  }
})
