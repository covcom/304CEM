
'use strict'

// ./node_modules/.bin/jasmine-node --verbose lists-spec.js
// ./node_modules/.bin/istanbul cover ./node_modules/.bin/jasmine lists-spec.js

// ./node_modules/.bin/istanbul cover -x **index.js** -x **lists-spec.js** -x **schema.js** ./node_modules/.bin/jasmine lists-spec.js

const schema = require('./schema')
const lists = require('./lists')

describe('shopping lists', () => {
	beforeEach( done => {
		schema.List.remove({}, err => {
			if (err) expect(true).toBe(false) //error should not be thrown
			new schema.List({name: 'colours', list: ['red', 'orange', 'yellow']}).save( (err, list) => {
				if (err) expect(true).toBe(false) //error should not be thrown
				schema.List.count({}, (err, count) => {
					if (err) expect(true).toBe(false) //error should not be thrown
					expect(count).toBe(1)
					done()
				})
			})
		})
	})

	describe('add', () => {
		it('should add a valid list', done => {
			lists.add( {name: 'shopping', list: ['bread', 'butter', 'cheese']}, (err, data) => {
				if (err) expect(true).toBe(false) //error should not be thrown
				schema.List.count({}, (err, count) => {
					if (err) expect(true).toBe(false) //error should not be thrown
					expect(count).toBe(2)
					done()
				})
			})
		})
	})

	describe('remove', () => {
		it('should remove a named list', done => {
			lists.remove('colours')
			.then( () => {
				schema.List.count({}, (err, count) => {
					if (err) expect(true).toBe(false) //error should not be thrown
					expect(count).toBe(0)
					done()
				})
			}).catch( err => {
				if (err) expect(true).toBe(false) //error should not be thrown
			})
		})
	})

})
