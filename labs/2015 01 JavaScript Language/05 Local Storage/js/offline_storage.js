console.log('page loaded');

var url = 'http://api.openweathermap.org/data/2.5/forecast?&mode=json&q=';

document.querySelector('input').onkeyup = search;

function search(element) {
	console.log('search');
	var criteria = document.querySelector('input').value;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url+criteria, true);
	xhr.onload = function (e) {
		console.log('connected');
		if (xhr.readyState === 4 && xhr.status === 200) {
			data = JSON.parse(xhr.responseText);
			if (data.cod == '404') {
				console.log('city not found');
			} else if (data.cod == '200') {
				console.log('city found');
				var forecast = data.list;
				var weather = [];
				for (var i=0; i<forecast.length; i++) {
					var date = new Date(forecast[i].dt * 1000).toUTCString();
					var desc = forecast[i].weather[0].description;
					var entry = {date: date, description: desc};
					weather.push(entry);
				}
				sessionStorage[criteria] = JSON.stringify({
														city: data.city.name, 
														country: data.city.country, 
														weather: weather}
													);
				console.log(JSON.parse(sessionStorage[criteria]).city);
				console.log(JSON.parse(sessionStorage[criteria]).country);
			}
		}
	};
	xhr.onerror = function (e) {
		console.log("Not Connected");
		if (sessionStorage[criteria]) {
			console.log(JSON.parse(sessionStorage[criteria]).city);
			console.log(JSON.parse(sessionStorage[criteria]).country);
		} else {
			console.log('city not found');
		}
	};
	xhr.send();
}