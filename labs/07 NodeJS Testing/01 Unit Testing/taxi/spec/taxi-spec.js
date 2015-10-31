
var rewire = require('rewire')
var taxi = rewire('../modules/taxi')

describe('Taxi Module', function () {

	/* the routedata comes from an external API that is not guaranteed to return consistent data. We substitute a different function for testing that returns a fixed object. */
	taxi.__set__('getRouteData', function(start, end) {
		console.log('REPLACEMENT')
		console.log(start+' to '+end)
		const data = {routes:[{legs:[{distance:{text:'0.3 km',value:325},duration:{text:'1 min',value:66}}]}]}
		return data
	})

	it('should set Birmingham as the current location', function(done) {
		taxi.setHome('Birmingham', function(data) {
			expect(data.lat).toEqual(52.486243)
			expect(data.lng).toEqual(-1.890401)
			done()
		})
	})

	it('should calculate the fare to Coventry', function(done) {
		taxi.getFare('Coventry', function(data) {
			console.log(data)
			expect(data.distance).toEqual(325)
			expect(data.duration).toEqual(66)
			//expect(data.duration).toBeGreaterThan(30)
			//expect(data.duration).toBeLessThan(40)
			//expect(data.cost).toBeGreaterThan(40.0)
			//expect(data.cost).toBeLessThan(44.0)
			done()
		})
	})

	xit('should set Coventry Cathedral as the current location', function(done) {
		taxi.setHome('Coventry Cathedral', function(data) {
			expect(data.lat).toEqual(52.40831)
			expect(data.lng).toEqual(-1.507118)
			done()
		})
	})

	xit('should return a minimum fare of 3.2 for a short journey', function(done) {
		taxi.getFare('Coventry University', function(data) {
			expect(data.cost).toEqual(3.2)
			done()
		})
	})

})
