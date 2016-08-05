
const Dog = require('./dog')

const fido = new Dog('Fido', 'Mixed', 38)
const fluffy = new Dog('Fluffy', 'Poodle', 30)
const spot = new Dog('Spot', 'Chihuahua', 10)
const barnaby = new Dog('Barnaby', 'Basset Hound', 55)

spot.bark = function() {
	console.log(`${this.name} says WOOF!`)
}

fido.bark()
fido.run()
fido.wag()

fluffy.bark()
fluffy.run()
fluffy.wag()

spot.bark()
spot.run()
spot.wag()

barnaby.sit()
barnaby.sit()
spot.sit()
spot.sit()

console.log(`Does spot have a sitting property? ${spot.hasOwnProperty('sitting')}`)
console.log(`Does fido have a sitting property? ${fido.hasOwnProperty('sitting')}`)
