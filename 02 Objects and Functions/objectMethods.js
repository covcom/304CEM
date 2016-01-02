
var fiat = { 
	make: 'Fiat',
	model: '500',
	year: 1957, 
	color: 'Medium Blue',
	passengers: 2,
	convertible: false,
	mileage: 88000,
	fuel: 0,
	started: false,
	start: function() {
		console.log('trying to start car...')
		if (this.fuel == 0) {
			console.log('The car is on empty, fill up before starting!')
		} else {
			console.log('car started')
			this.started = true
		}
	},
	stop: function() {
		console.log('car stopping...')
		this.started = false
	},
	drive: function() {
		if (this.started) {
			if (this.fuel > 0) {
				console.log(this.make+' '+this.model + ' goes zoom zoom!')
				this.fuel = this.fuel - 1;
			} else {
				console.log('Uh oh, out of fuel.')
				this.stop()
			} 
		} else {
			console.log('You need to start the engine first.')
		}
	},
	addFuel: function(amount) {
		console.log('adding '+amount+' units of fuel')
		this.fuel = this.fuel+amount
	}
}

fiat.start()
fiat.drive()
fiat.addFuel(2)
fiat.start()
fiat.drive()
fiat.drive()
fiat.drive()
