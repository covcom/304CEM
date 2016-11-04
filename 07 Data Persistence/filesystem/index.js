
'use strict'

const file = require('./storage')

// passing a valid ISBN
file.addBook('0596517742', (err, result) => {
	if(err) {
		console.log('ERROR')
		console.log(err.message)
	} else {
		console.log('NO ERROR')
		console.log(result)
	}
})

// passing an invalid ISBN
file.addBook('059651774', (err, result) => {
	if(err) {
		console.log('ERROR')
		console.log(err.message)
	} else {
		console.log('NO ERROR')
		console.log(result)
	}
})
