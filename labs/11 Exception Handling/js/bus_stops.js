
window.onload = function() {
	console.log('onLoad');
	
	var mapProp = {
		center:new google.maps.LatLng(51.5072, -0.01),
		zoom:16,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
	
	var infowindow = new google.maps.InfoWindow({
		content:"Hello World!"
	});
	
	bus.stops(51.5072, 0.1275, function(data) {
		console.log(data);
		data.forEach(function(element) {
			var marker=new google.maps.Marker({
				position:new google.maps.LatLng(element.lat, element.lon)
			});
			marker.setMap(map);
			google.maps.event.addListener(marker, element.name, function() {
				infowindow.open(map, marker);
			});
		});
	});
	
};