
'use strict'

const mysql = require('./mysql')

// passing a valid ISBN
mysql.addBook('0596517742', (err, result) => {
	if(err) {
		console.log('ERROR')
		console.log(err.message)
	} else {
		console.log('NO ERROR')
		console.log(result)
	}
})

// passing an invalid ISBN
mysql.addBook('059651774', (err, result) => {
	if(err) {
		console.log('ERROR')
		console.log(err.message)
	} else {
		console.log('NO ERROR')
		console.log(result)
	}
})
