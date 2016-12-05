
'use strict'

const lists = require('./lists')

const list = {
	name: 'colours',
	list: [
		'red',
		'orange',
		'yellow'
	]
}

lists.add(list, (err, data) => {
	if (err) console.log(err)
	console.log(data)
	lists.count( (err, count) => {
		if (err) console.log(err)
		console.log(`${count} documents found`)
	})
})
