
'use strict'

const list = require('./modules/shopping')

list.add('bread')
list.add('butter')
list.add('cheese')
list.add('bread')

const items = list.getAll()
items.forEach( (element, index) => {
	console.log(index+'. '+element.title+'\t x'+element.qty)
})