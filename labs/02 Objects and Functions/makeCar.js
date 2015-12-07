
function makeCar() {
	const makes = ["Chevy", "GM", "Fiat", "Webville Motors", "Tucker"]
	const models = ["Cadillac", "500", "Bel-Air", "Taxi", "Torpedo"]
	const years = [1955, 1957, 1948, 1954, 1961]
	const colors = ["red", "blue", "tan", "yellow", "white"]
	const convertible = [true, false]

	const rand1 = Math.floor(Math.random() * makes.length)
	const rand2 = Math.floor(Math.random() * models.length)
	const rand3 = Math.floor(Math.random() * years.length)
	const rand4 = Math.floor(Math.random() * colors.length)
	const rand5 = Math.floor(Math.random() * 5)
	const rand6 = Math.floor(Math.random() * convertible.length)
	
	var car = {
		make: makes[rand1],
		model: models[rand2],
		year: years[rand3],
		color: colors[rand4],
		passengers: rand5,
		convertible: convertible[rand6],
		mileage: 0
	}
	return car
}

function displayCar(car) {
	console.log('your new car is a '+car.year+' '+car.make+' '+car.model)
}

const carToSell = makeCar()
displayCar(carToSell)
