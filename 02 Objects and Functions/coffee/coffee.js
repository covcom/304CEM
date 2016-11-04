
'use strict'

const small = 8
const medium = 12
const large = 16

module.exports = function(roast, ounces = small) { // can't use arrow functions here...
	if (roast === undefined) {
		throw new Error('missing roast type')
	}
	this.roast = roast
	this.ounces = ounces
	this.getSize = () => {
		if (this.ounces === small) {
			return 'small'
		} else if (this.ounces === medium) {
			return 'medium'
		} else if (this.ounces === large) {
			return 'large'
		}
	}
	this.order = () => {
		let msg
		switch (this.getSize()) {
			case 'small':
			case 'medium':
			case 'large':
				msg = `You've ordered a ${this.getSize()} ${this.roast} coffee.`
				break
			default:
				msg = `We don't have a ${this.roast} in that size!`
				break
		}
		return msg
	}
}
