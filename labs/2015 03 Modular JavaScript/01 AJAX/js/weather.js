
var weather = (function() {
    var town;       // stores the name of the town
    var forecast;   // stores the JSON response data from the API call

    return {
        setTown: function(t, callback) {
            town = t;
            var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=7&q='+t;
            var xhr = new XMLHttpRequest;
            xhr.open('GET', url, true);
            xhr.onload = function(e) {
                if (xhr.status === 200) {
                    forecast = JSON.parse(xhr.responseText);
                    callback(forecast.city);
                }
            }
            xhr.onerror = function(e) {
                callback(xhr.statusText);
            }
            xhr.send();
        },
        getForecast: function() {
            return forecast;
        }
    }
}());