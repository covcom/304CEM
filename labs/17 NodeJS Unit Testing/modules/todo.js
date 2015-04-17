
storage = require('node-persist');
storage.initSync();

// add a new item to the todo list
exports.add = function(title, qty) {
	storage.setItem(title, {title: title, qty: qty});
	return true;
};

// calculates and returns the number of items in the list
exports.count = function() {
	return undefined;
};

// empties the list
exports.clear = function() {
	return true;
};

// returns an array containing all todo items
exports.getAll = function() {
	return undefined;
};

// removes the item with the corresponding key
exports.remove = function(item) {
	
};