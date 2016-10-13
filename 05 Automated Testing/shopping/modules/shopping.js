'use strict'

/**
 * Shopping Module.
 * @module shopping
 */

/** this global 'map' object will be used to store the items and quantities. It stores each item against a named key. */
var data = new Map()

/** add a new item to the todo list. Notice that we are using the new 'Arrow Function' syntax from the ECMA6 specification. */
exports.add = item => {
	/* check if the item is already in the list */
	if (data.get(item) === undefined) {
		/* if the item is not found it is added to the list with its quantity set to 1 */
		data.set(item, {title: item, qty: 1})
	} else {
		/* the item is already in the list so it is retrieved and the quantity is incremented */
		let i = data.get(item)
		i.qty ++
		/* the new data is then stored in the map */
		data.set(item, i)
	}
	return data.get(item)
}


/** calculates and returns the number of items in the list */
exports.count = () => {
	/* the _Map_ object has a _size_ property that returns the number of items */
	return data.size
}

/** empties the list */
exports.clear = () => {
	data = new Map()
}

/** Returns an array containing all todo items */
exports.getAll = () => {
	const dataArray = []
	for (const value of data.values()) {
		dataArray.push(value)
	}
	return dataArray
}

/**
 * Returns details for the named item.
 * @param   {string} item - The item name to retrieve.
 * @returns {string} The name of the item
 * @throws  {InvalidItem} item not in list.
 */
exports.getItem = item => {
	if (data.get(item) === undefined) {
		throw new Error('item not in list')
	}
	return data.get(item)
}

/** Removes item with the corresponding name. */
exports.removeItem = item => {
	console.log('removeItem')
	if (data.get(item) === undefined) {
		throw new Error('item not in list')
	}
	data.delete(item)
}

/** Decrements the quantity of an item in the list. */
exports.decrement = (item, count) => {
	console.log(arguments)
	if (item === undefined || count === undefined) {
		throw new Error('function requires two parameters')
	}
	if (data.get(item) === undefined) {
		throw new Error('item not in list')
	}
	if (isNaN(count)) {
		throw new Error('second parameter should be a number')
	}
	count = parseInt(count)
	let current = data.get(item)
	if (current.qty <= count) {
		data.delete(item)
		return
	}
	current.qty = current.qty - count
	data.set(item, current)
}
