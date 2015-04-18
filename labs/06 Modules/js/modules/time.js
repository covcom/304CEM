
define(function () {
    var returnedModule = function () {
        this.showTime = function () {
			return 'the time is '+new Date().toLocaleTimeString();
        };
    };
    return returnedModule; 
});

