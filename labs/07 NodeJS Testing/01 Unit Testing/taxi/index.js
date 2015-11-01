
var taxi = require('./modules/taxi')
debugger

console.time('set ecb as home')
taxi.setHome('Gulson Road, Coventry', function(data) {
	console.log('Setting ECB as home')
	console.log(data)
	console.log(data.lat)
	console.timeEnd('set ecb as home')
})

console.time('standard fare')
taxi.getFare('University Road, Coventry', function(data) {
	console.log(data)
	console.timeEnd('standard fare')
})

console.time('set cathedral as home')
taxi.setHome('Coventry Cathedral', function(data) {
	console.log('Coventry Cathedral')
	console.log(data)
	console.log(data.lat)
	console.timeEnd('set cathedral as home')
})

console.time('long fare');
taxi.getFare('Warwick Castle', function(data) {
	console.log(data)
	console.timeEnd('long fare')
})

console.time('short fare')
taxi.getFare('Broadgate, Coventry', function(data) {
	console.log(data)
	console.timeEnd('short fare')
})
