
'use strict'

/* eslint no-magic-numbers: 0 */

function Coffee(roast, ounces = 8) {

	const privateData = {}

	privateData.size = {
		small: 8,
		medium: 12,
		large: 16
	}

	if (roast === undefined) {
		throw new Error('missing roast type')
	}

	privateData.roast = roast
	privateData.ounces = ounces

	function getSize() {
		if (this.ounces === this.size.small) {
			return 'small'
		} else if (this.ounces === this.size.medium) {
			return 'medium'
		} else if (this.ounces === this.size.large) {
			return 'large'
		}
	}

	return {
		order: {
			get: () => {
				let msg
				switch (getSize()) {
					case 'small':
					case 'medium':
					case 'large':
						msg = `You've ordered a ${getSize()} ${this.roast} coffee.`
						break
					default:
						msg = `We don't have a ${this.roast} in that size!`
						break
				}
				return msg
			}
		}
	}

} // end function Coffee

try {
	const coffee = new Coffee('House Blend', 12)
	console.log(coffee.order)
	console.log(coffee)

	const darkRoast = new Coffee('Dark Roast', 16)
	console.log(darkRoast.order)

	const specialBlend = new Coffee('Special Blend', 200)
	console.log(specialBlend.order)

	const kenyan = new Coffee('Kenyan')
	console.log(kenyan.order)

	const anon = new Coffee()
	console.log(anon.order)
} catch(err) {
	console.log(`ERROR: ${err}`)
}
