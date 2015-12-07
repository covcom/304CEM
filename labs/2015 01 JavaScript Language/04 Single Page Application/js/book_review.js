console.log('page loaded');

document.getElementById('bookSearch').onkeypress = searchPrep;

function searchPrep() {
	console.log('search');
	var text = document.getElementById('bookSearch').value;
	if (text.length > 2) {
		console.log('start search');
		search(text);
	}
}

function showDetails(id) {
	console.log('book selected');
	//console.log(id);
	// https://www.googleapis.com/books/v1/volumes/zntNhoO6gCUC
}

function search(text) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", 'https://www.googleapis.com/books/v1/volumes?q='+text, true);
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				//console.log(xhr.responseText);
				var data = JSON.parse(xhr.responseText);
				//console.log(data.totalItems);
				var books = data.items;
				//var booklist = [];
				var table = document.getElementById('searchResults');
				table.innerHTML = '';
				for(var i=0; i<books.length; i++) {
					//booklist.push({title: books[i].volumeInfo.title});
					var row = document.createElement('tr');
					row.innerHTML = '<td>'+books[i].volumeInfo.title+'</td>';
					//console.log(books[i].id);
					row.onclick = showDetails(books[i].id);
					table.appendChild(row);
				}
				//console.log(booklist);
				
			} else {
				console.error(xhr.statusText);
			}
		}
	};
	xhr.onerror = function (e) {
		console.error(xhr.statusText);
	};
	xhr.send(null);
}