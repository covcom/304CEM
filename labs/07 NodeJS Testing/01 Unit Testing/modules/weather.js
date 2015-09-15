// weather.js

var request = require('request');
var sync = require('sync-request');
storage = require('node-persist');
storage.initSync();

//var exports = module.exports = {};

exports.getGeo = function(city, callback) {
	var data = getData(city);
	callback(data.forecast.city.coord);
};

function dayStr() {
	var d= new Date();
	var dStr = d.toISOString().substring(0, 10);
	return dStr;
}

function getLiveData(city) {
	var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=5&q=';
	var res = sync('GET', url+city);
	data = JSON.parse(res.getBody().toString('utf8'));
	return data;
}

function getData(city) {
	var data;
	if (storage.getItemSync(city)) {
		// CACHE FOUND
		data = storage.getItemSync(city);
		if (data.date < dayStr()) {
			// CACHE OUT OF DATE
			data = getLiveData(city);
			return saveData(city, data);
		} else {
			// CACHE UP TO DATE
			return storage.getItemSync(city);
		}
	} else {
		// NO CACHE
		data = getLiveData(city);
		return saveData(city, data);
	}
}

function saveData(city, data) {
	//console.log(city);
	//console.log(data);
	var d = dayStr();
	//console.log(d);
	var obj = {date: d, forecast: data};
	storage.setItem(city, obj);
	return obj;
}
