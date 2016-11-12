
'use strict'

const google = require('./modules/google')
//const persistence = require('./modules/persistence')

exports.search = (request, callback) => {
	this.extractParam(request, 'q').then( query => {
		console.log(query)
		return google.searchByString(query)
	}).then( data => {
		console.log('search query complete')
		console.log(data)
		callback(null, data)
	}).catch( err => {
		console.log('ERROR')
		console.log(err)
		callback(err)
  })
}

exports.extractParam = (request, param) => new Promise( (resolve, reject) => {
	console.log(request.param)
	if (request.params === undefined || request.params[param] === undefined) reject(new Error(`${param} parameter missing`))
	resolve(request.params[param])
})
