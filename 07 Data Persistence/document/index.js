
'use strict'

const mongodb = require('./mongodb')

// passing a valid ISBN
mongodb.addBook('0596517742', (err, result) => {
	if(err) {
		console.log('ERROR')
		console.log(`valid isbn: ${err.message}`)
	} else {
		console.log('NO ERROR')
		console.log(result)
		console.log('retrieve all books')
		mongodb.getAll()
	}
})

// passing an invalid ISBN
// mongodb.addBook('059651774', (err, result) => {
// 	if(err) {
// 		console.log('ERROR')
// 		console.log(`invalid isbn: ${err.message}`)
// 	} else {
// 		console.log('NO ERROR')
// 		console.log(result)
// 	}
// })
