console.log('page loaded');

document.querySelector('button').onclick = add;

function add() {
	var newItem = document.querySelector('input').value;
	var items = (localStorage.items ? JSON.parse(localStorage.items) : []);
	items.push(newItem);
	localStorage.items = JSON.stringify(items);
}
