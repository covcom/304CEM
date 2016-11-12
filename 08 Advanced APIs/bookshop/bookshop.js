
'use strict'

const google = require('./modules/google')
const persistence = require('./modules/persistence')

exports.search = (query, host) => {
	google.searchByString(query).then( data => {
		console.log('query complete')
		console.log(JSON.stringify(data, null, 2))
		return data
	}).error( err => {
		console.log('ERROR')
		console.log(err)
		throw new Error(err.message)
	})
}
