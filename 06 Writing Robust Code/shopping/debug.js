
'use strict'

const list = require('./modules/shopping')
debugger
list.add('bread')
list.add('butter')
debugger
list.add('cheese')
list.add('bread')
list.add('bread')
list.add('butter')
debugger
try {
	list.decrement('bread', 2)
	list.decrement('butter', 4)
	list.decrement('jam', 3)
} catch(err) {
	console.log('ERROR: '+err.message)
}

const items = list.getAll()
items.forEach( (element, index) => {
	console.log(index+'. '+element.title+'\t x'+element.qty)
})