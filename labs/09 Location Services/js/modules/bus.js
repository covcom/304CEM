
var bus = (function(){
	//http://transportapi.com/v3/uk/bus/stops/near.json?{lon=0.1275&lat=51.5072}&api_key=d8090232050619162ac4cf6b765c5aa6&app_id=151b292d
	var baseUrl = 'http://transportapi.com/v3/uk/bus/stops/near.json?{lon=';
	var key = 'd8090232050619162ac4cf6b765c5aa6';
	var app = '151b292d';

	return {
		stops: function(lat, lon, callback) {
			var url = baseUrl+lon+'&lat='+lat+'}&api_key='+key+'&app_id='+app;
			console.log(url);
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.onload = function (e) {
				if (xhr.readyState === 4 && xhr.status === 200) {
					//console.log(xhr.responseText);
					callback(JSON.parse(xhr.responseText).stops.map(function(obj) {
						return({
							name: obj.name, 
							atcocode: obj.atcocode, 
							lat: obj.latitude, 
							lon: obj.longitude
						});
					}));
				}
			};
			xhr.send(null);
		}
	};
}());