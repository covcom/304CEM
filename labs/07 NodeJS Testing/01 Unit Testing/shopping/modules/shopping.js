
storage = require('node-persist');
storage.initSync();

/* add a new item to the todo list. Notice that we are using the new 'Arrow Function' syntax from the ECMA6 specification. */
exports.add = item => {
	/* we check to see if the named item has already been added */
	if (storage.getItem(item) === undefined) {
		/* if it doesn't exist we add it with a quantity of '1' */
		storage.setItem(item, {title: item, qty: 1})
	} else {
		/* if is already exists we retrive the current quantity and increment it before saving the new value. */
		const current = storage.getItem(item).qty
		storage.setItem(item, {title: item, qty: current+1})
	}
	return true
};

// calculates and returns the number of items in the list
exports.count = () => {
	return storage.length()
};

// empties the list10
exports.clear = () => {
	storage.clearSync()
}

// returns an array containing all todo items
exports.getAll = () => {
	return storage.values()
}

exports.getItem = item => {
	return 'stub'
}

// removes the item with the corresponding numerical index
exports.removeIndex = index => {
	console.log('removeIndex')
}

// removes item with the corresponding name
exports.removeItem = item => {
	console.log('removeItem')
}
