
'use strict'

// need to allow the use of arbitrary numbers when testing
/* eslint no-magic-numbers: 0 */

const currency = require('../index.js')

describe('currency module', () => {
	it('should return a number', done => {
		currency.convert('GBP', 'USD', 100, (err, data) => {
			try {
				if(err) throw err // throw errors to the catch block
				expect(data).toEqual(jasmine.any(Number))
				expect(data).toBeGreaterThan(0)
				done()
			} catch(err) {
				expect(true).toBe(false) // no error should be thrown
			}
		})
	})

	it('should return a value with 2 decimal places', done => {
		currency.convert('GBP', 'USD', 111, (err, data) => {
			try {
				if(err) throw err // throw errors to the catch block
				expect(data).toEqual(jasmine.any(Number))
				expect(data).toBeGreaterThan(0)
				expect(data).toEqual(parseFloat(data.toFixed(2)))
				done()
			} catch(err) {
				expect(true).toBe(false) // no error should be thrown
			}
		})
	})
})
