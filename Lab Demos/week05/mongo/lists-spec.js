
// node jasmine
// istanbul cover -x **spec/** -x **index.js** -x **debug.js** jasmine.js

'use strict'

const lists = require('./lists')
const schema = require('./schema')

describe('shopping list', () => {
	beforeEach( done => {
		schema.List.remove({}, err => {
			if (err) expect(true).toBe(false)
			new schema.List({name: 'colours', list: ['red', 'orange', 'yellow']}).save( (err, list) => {
				if (err) expect(true).toBe(false)
				schema.List.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
					done()
				})
			})
		})
	})
	describe('add', () => {
		it('should add a valid list', done => {
			const shopping = {
				name: 'shopping', 
				list: ['bread', 'butter', 'cheese']
			}

			lists.add(shopping, (err, data) => {
				if (err) expect(true).toBe(false)
				schema.List.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(2)
					done()
				})
			})
		})
	})
	describe('count', () => {
		it('should find one list', done => {
			lists.count( (err, count) => {
				if (err) expect(true).toBe(false)
				expect(count).toBe(1)
				done()
			}) 
		})
	})
	describe('remove', () => {
		it('should remove an existing list', done => {
			lists.remove('colours').then( () => {
				schema.List.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(0)
					done()
				})
			}).catch( err => {
				if (err) expect(true).toBe(false)
				done()
			})
		})
	})
})
