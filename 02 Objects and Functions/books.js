
'use strict'

function Book(isbn, title) {
	this.isbn = isbn
	this.title = title
	this.year = null
	Object.defineProperty(this, 'published', {
		get: () => this.year,
		set: year => this.year = year
	})
	Object.defineProperty(this, 'summary', {
		get: () => `${this.title} (${this.isbn}). Published ${this.year}.`
	})
}

const b = new Book('1491943122', 'Learning Node')
if (b instanceof Book) console.log('its a Book')
console.log(`the b object is a '${typeof b}'`)
console.log(b.published) // prints null
b.year = 2016
console.log(b.published) // prints 2016
console.log(b)
console.log(b.summary)
