
storage = require('node-persist');
storage.initSync();

exports.add = function(title) {
	storage.setItem(title, title);
	return true;
};

exports.count = function() {
	return storage.values().length;
};

exports.clear = function() {
	storage.clearSync();
	return true;
};

exports.getAll = function() {
	return storage.values();
};