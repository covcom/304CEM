
'use strict'

const defaultSize = 8

module.exports = function(roast, ounces = defaultSize) { // can't use arrow functions here...
	if (roast === undefined) {
		throw new Error('missing roast type')
	}
	this.roast = roast
	this.ounces = ounces
	this.getSize = () => {
		if (this.ounces === 8) {
			return 'small'
		} else if (this.ounces === 12) {
			return 'medium'
		} else if (this.ounces === 16) {
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
