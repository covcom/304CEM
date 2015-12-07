
require(['modules/time'], function(TheTime) {
	document.getElementById('show').onclick = function() {
		var time = new TheTime();
		var currentTime = time.showTime();
		console.log(currentTime);
		document.getElementById('time').innerHTML = currentTime;
	};
});
