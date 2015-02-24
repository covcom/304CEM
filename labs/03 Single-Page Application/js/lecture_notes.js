console.log('page loaded');

var notes = [];

document.getElementById('add').onclick = function() {
	console.log('button clicked');
	var note = document.getElementById('note').value;
	console.log(note);
	var newNote = {note: note};
	notes.push(newNote);
	loadList();
};

function display(element) {
	console.log('display');
	console.log(element.parentNode.parentNode.id);
	var details = document.getElementById('details');
	var id = element.parentNode.parentNode.id;
	document.getElementById('viewNote').innerHTML = notes[id].note;
}

function rem(element) {
	console.log('remove');
	var id = element.parentNode.parentNode.id;
	console.log(id);
	notes.splice(id, 1);
	loadList();
}

function loadList() {
	var table = document.getElementById('list');
	table.innerHTML = '';
	for (var i=0; i<notes.length; i++) {
		var row = document.createElement('tr');
		row.id = i;
		row.innerHTML = '<td><a onclick="display(this)" href="#">'+notes[i].note+'</a></td><td><a onclick="rem(this)" class="delete" href="#">delete</a></td>';
		table.appendChild(row);
	}
}