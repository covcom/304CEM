// jshint unused:false

var directions = (function() {
    
    var location;
    
    function getData(origin, destination, callback) {
        var url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+origin+'&destination='+destination;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function(e) {
                if (xhr.status === 200) {
                    var forecast = JSON.parse(xhr.responseText);
                    callback(forecast.city);
                }
            }
            xhr.onerror = function(e) {
                callback(xhr.statusText);
            }
            xhr.send();
    }
    
    return {
        
        getDuration: function(origin, destination, callback) {
            getData(origin, destination, function(data) {
                callback(data);
            });
        },
        getLocation: function(callback) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log('location found');
                console.log(position.coords.latitude+' '+position.coords.longitude);
                callback(position.coords);
            },
            function(err) {
                console.log('ERROR: '+JSON.stringify(err));
                callback(err);
            });
        }
        
    }
}());