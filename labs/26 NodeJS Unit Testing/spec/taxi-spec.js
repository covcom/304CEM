
var taxi = require("../modules/taxi");

describe("Taxi Module", function () {
	
	xit('should set Birmingham as the current location', function(done) {
		taxi.setHome('Birmingham', function(data) {
			expect(data.lat).toEqual(52.486243);
			expect(data.lng).toEqual(-1.890401);
			done();
		});
	});
	
	xit('should calculate the fare to Coventry', function(done) {
		taxi.getFare('Coventry', function(data) {
			expect(data.distance).toEqual(37.0);
			expect(data.duration).toBeGreaterThan(30);
			expect(data.duration).toBeLessThan(40);
			expect(data.cost).toBeGreaterThan(40.0);
			expect(data.cost).toBeLessThan(44.0);
			done();
		});
	});
	
	xit('should set Coventry Cathedral as the current location', function(done) {
		taxi.setHome('Coventry Cathedral', function(data) {
			expect(data.lat).toEqual(52.40831);
			expect(data.lng).toEqual(-1.507118);
			done();
		});
	});
	
	xit('should return a minimum fare of 3.2 for a short journey', function(done) {
		taxi.getFare('Coventry University', function(data) {
			expect(data.cost).toEqual(3.2);
			done();
		});
	});
	
});
