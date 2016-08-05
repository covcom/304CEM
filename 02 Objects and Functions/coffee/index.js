
const Coffee = require('./coffee')
try {
	const coffee = new Coffee('House Blend', 12)
	console.log(coffee.order())

	const darkRoast = new Coffee('Dark Roast', 16)
	console.log(darkRoast.order())

	const specialBlend = new Coffee('Special Blend', 200)
	console.log(specialBlend.order())

	const kenyan = new Coffee('Kenyan')
	console.log(kenyan.order())

	const anon = new Coffee()
	console.log(anon.order())
} catch(err) {
	console.log(`ERROR: ${err}`)
}
