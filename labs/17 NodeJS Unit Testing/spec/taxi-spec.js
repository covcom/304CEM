
var taxi = require("../modules/taxi");

describe("Taxi Module", function () {
	it('should set Birmingham as the current location', function(done) {
		taxi.setHome('Birmingham', function(data) {
			expect(data.lat).toEqual(52.486243);
			expect(data.lng).toEqual(-1.890401);
			done();
		});
	});
	
	it('should calculate the fare to Coventry', function(done) {
		taxi.getFare('Coventry', function(data) {
			expect(data.distance).toEqual(37.0);
			expect(data.duration).toEqual(31);
			expect(data.cost).toEqual(40.1);
			done();
		});
	});
	
	it('should set Coventry Cathedral as the current location', function(done) {
		taxi.setHome('Coventry Cathedral', function(data) {
			expect(data.lat).toEqual(52.40831);
			expect(data.lng).toEqual(-1.507118);
			done();
		});
	});
	
	it('should return a minimum fare of 3.2 for a short journey', function(done) {
		taxi.getFare('Coventry University', function(data) {
			expect(data.cost).toEqual(3.2);
			done();
		});
	});
	
});