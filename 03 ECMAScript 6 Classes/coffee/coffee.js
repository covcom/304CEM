'use strict'

class Coffee {

	//const types = ['Arusha', 'Bergendal', 'Catuai', 'Kilimanjaro', 'Picchu']

	constructor(roast, grams) {
		this.roast = roast
		this.grams = grams
	}

	get size() {
    if (this.grams < 200) {
			return 'small'
		} else if (this.ounces < 500) {
			return 'medium'
		} else {
			return 'large'
		}
  }

  get order() {
  	return `you ordered a ${this.size} ${this.roast} coffee.`
  }

}

export default new Coffee