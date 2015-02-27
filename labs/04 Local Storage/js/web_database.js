

var db = openDatabase('todo', '1.0', 'simple todo list', 2 * 1024 * 1024);

document.querySelector('button').onclick = function() {
	db.transaction(function (tx) {
		var newItem = document.querySelector('input').value;
		tx.executeSql('CREATE TABLE IF NOT EXISTS items (item VARCHAR(45))');
		tx.executeSql('INSERT INTO items (item) VALUES ("'+newItem+'")');
	});
};
