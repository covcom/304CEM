var notes = [];

function addItem() {
	console.log('addNote');
	var textbox = document.getElementById('item');
	var itemText = textbox.value;
	textbox.value = '';
	textbox.focus();
	console.log(itemText);
	var newItem = {title: itemText, quantity: 1};
	notes.push(newItem);
	console.log(notes);
	displayList();
	saveList();
}

function displayList() {
	console.log('displayList');
	var table = document.getElementById('list');
	table.innerHTML = '';
	for (var i = 0; i<notes.length; i++) {
		var note = notes[i];
		console.log(note);
		var node = document.createElement('tr');
		var html = '<td>'+note.title+'</td><td>'+note.quantity+'</td><td><a href="#" onClick="deleteIndex('+i+')">delete</td>';
		node.innerHTML = html;
		table.appendChild(node);
	}
}

function deleteIndex(i) {
	console.log('deleteIndex');
	console.log(i);
	notes.splice(i, 1);
	displayList();
	saveList();
}

function saveList() {
	localStorage.notes = JSON.stringify(notes);
}

function loadList() {
	console.log('loadList');
	if (localStorage.notes) {
		notes = JSON.parse(localStorage.notes);
		displayList();
	}
}

var button = document.getElementById('add');
button.onclick = addItem;
loadList();