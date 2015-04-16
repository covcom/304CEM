
var taxi = require('./modules/taxi');

console.time('setHome');
taxi.setHome('Birmingham', function(data) {
	console.log('Birmingham');
	console.log(data);
	console.log(data.lat);
	console.timeEnd('setHome');
});

console.time('getFare');
taxi.getFare('Coventry', function(data) {
	console.log(data);
	console.timeEnd('getFare');
});

console.time('setHome');
taxi.setHome('Coventry Cathedral', function(data) {
	console.log('Coventry Cathedral');
	console.log(data);
	console.log(data.lat);
	console.timeEnd('setHome');
});

console.time('getFare');
taxi.getFare('Coventry University', function(data) {
	console.log(data);
	console.timeEnd('getFare');
});

/*
Coventry University
{ lat: '52.486243', lng: '-1.890401' }
setHome: 265ms
{ distance: '23.0 mi', duration: '31 mins', cost: NaN }
getFare: 564ms
*/