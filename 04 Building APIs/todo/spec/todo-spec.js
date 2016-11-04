
'use strict'
/*istanbul ignore next*/
/* global expect */

const lists = require('../modules/lists')
const globals = require('../modules/globals')

const listLen = 3
const idLen = 31

let auth = {
	basic: {
		username: 'testuser',
		password: 'p455w0rd'
	}
}

const shopping = {
	name: 'shopping',
	list: [
		'Cheese',
		'Bread',
		'Butter'
	]
}

const colours = {
	name: 'colours',
	list: [
		'Red',
		'Orange',
		'Yellow',
		'Green',
		'Blue'
	]
}

describe('lists', () => {

	beforeEach( () => {
		auth = {
			basic: {
				username: 'testuser',
				password: 'p455w0rd'
			}
		}
	})

	afterEach( () => {
		lists.clearAll()
	})

	it('should throw error if missing auth', () => {
		const res = lists.addNew({}, shopping)
		expect(res.status).toBe(globals.status.unauthorized)
		expect(res.format).toBe(globals.format.json)
		expect(res.message).toBe('missing basic auth')
	})

	it('should throw error if invalid username', () => {
		auth.basic.username = 'b4d'
		const res = lists.addNew(auth, shopping)
		expect(res.status).toBe(globals.status.unauthorized)
		expect(res.format).toBe(globals.format.json)
		expect(res.message).toBe('invalid credentials')
	})

	it('should throw error if invalid password', () => {
		auth.basic.password = 'wr0ngp455w0rd'
		const res = lists.addNew(auth, shopping)
		expect(res.status).toBe(globals.status.unauthorized)
		expect(res.format).toBe(globals.format.json)
		expect(res.message).toBe('invalid credentials')
	})

	it('should warn if no json body', () => {
		const res = lists.addNew(auth, '')
		expect(res.status).toBe(globals.status.badRequest)
		expect(res.message).toBe('JSON data missing in request body')
	})

	it('should warn if missing json name key', () => {
		const res = lists.addNew(auth, {list: ['Matthew', 'Mark', 'Luke', 'John']})
		expect(res.status).toBe(globals.status.badRequest)
		expect(res.message).toBe('JSON data missing in request body')
	})

	it('should warn if missing json list key', () => {
		const res = lists.addNew(auth, {name: 'Jaberwocky'})
		expect(res.status).toBe(globals.status.badRequest)
		expect(res.message).toBe('JSON data missing in request body')
	})

	it('should warn if list item is not a string', () => {
		const res = lists.addNew(auth, {name: 'Jaberwocky', list: [42, 3.14]})
		expect(res.status).toBe(globals.status.badRequest)
		expect(res.message).toBe('JSON data missing in request body')
	})

	it('should add a new list', () => {
		const res = lists.addNew(auth, shopping)
		//console.log(JSON.stringify(res, null, globals.indent))
		expect(res.status).toBe(globals.status.created)
		expect(res.format).toBe(globals.format.json)
		expect(res.message).toBe('new list added')
		expect(res.data.data.id).toEqual(jasmine.any(String))
		expect(res.data.data.id.length).toBe(idLen)
		expect(res.data.data.modified).toEqual(jasmine.any(Date))
		expect(res.data.data.name).toBe('shopping')
		expect(res.data.data.list).toEqual(jasmine.any(Array))
		expect(res.data.data.list.length).toBe(listLen)
	})

	it('should return a list of lists in JSON format', () => {
		lists.addNew(auth, shopping)
		lists.addNew(auth, colours)
		const res = lists.getAll('localhost')
		//console.log(JSON.stringify(res, null, globals.indent))
		expect(res.status).toBe(globals.status.ok)
		expect(res.format).toBe(globals.format.json)
		expect(res.message).toBe('2 lists found')
		expect(res.data).toEqual(jasmine.any(Array))
		expect(res.data[0].name).toBe('shopping')
		expect(res.data[1].name).toBe('colours')
	})

	it('should warn if no lists found', () => {
		const res = lists.getAll('localhost')
		expect(res.status).toBe(globals.status.notFound)
		expect(res.message).toBe('no lists found')
	})

	it('should find a valid list by its id', () => {
		const added = lists.addNew(auth, shopping)
		//console.log(JSON.stringify(added, null, globals.indent))
		lists.addNew(auth, colours)
		const res = lists.getByID(added.data.data.id)
		//console.log(JSON.stringify(res, null, globals.indent))
		expect(res.status).toBe(globals.status.ok)
		expect(res.data.id).toBe(added.data.data.id)
		expect(res.data.name).toBe('shopping')
		expect(res.data.list.length).toBe(listLen)
	})

	it('should warn if list by its id not found', () => {
		lists.addNew(auth, shopping)
		lists.addNew(auth, colours)
		const res = lists.getByID('128g4kq9f3qsrwnn4b0q6le')
		expect(res.status).toBe(globals.status.notFound)
		expect(res.message).toBe('list not found')
	})

})
