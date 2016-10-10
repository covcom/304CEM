
'use strict'
/** Class representing a person */
module.exports = class Person {

	/**
	 * Create a person
	 * @param {string} firstname - the person's first name
	 * @param {string} lastname - the person's last name
	 */
	constructor(firstname, lastname) {
		if (firstname === undefined || lastname === undefined) {
			throw new Error('missing parameter')
		}
		this.first = firstname
		this.last = lastname
	}

	/**
	 * Set the person's first name
	 * @param {string} name - the person's first name
	 */
	set firstName(name) {
		this.first = name
	}

	/**
	 * Set the person's last name
	 * @param {string} name - the person's last name
	 */
	set lastName(name) {
		this.last = name
	}

	/**
	 * Get the person's full name
	 * @return {string} the person's full name
	 */
	get name() {
		return `${this.first} ${this.last}`
	}

}