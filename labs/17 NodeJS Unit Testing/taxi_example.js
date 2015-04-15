
var taxi = require('./modules/taxi');

console.time('setHome');
taxi.setHome('Coventry University', function(data) {
	console.log('Coventry University');
	console.log(data);
	console.timeEnd('setHome');
});

taxi.getFare('30 Grasmere Avenue, Coventry', function(data) {
	console.log(data);
});