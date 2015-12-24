// jshint unused:false

var geocoder = (function() {
    
    var geo = new google.maps.Geocoder();
    
    function getGeoData(addr, callback) {
        geo.geocode( { 'address': addr}, function(results, status) {
            console.log('STATUS: '+status);
            if (status === 'OK') {
                callback({status: 'success', records: results.length, results: results});
            } else {
                callback({status: 'error'});
            }
        });
    }
    
    return {
        getAddress: function(addr, callback) {
            getGeoData(addr, function(data) {
                console.log('DATA: '+JSON.stringify(data, null, 2));
                callback(data);
            });
        }
    }
    
}());