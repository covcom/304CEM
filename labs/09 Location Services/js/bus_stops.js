
window.onload = function() {
	console.log('onLoad');
	bus.stops(51.5072, 0.1275, function(data) {
		console.log(data);
	});
};