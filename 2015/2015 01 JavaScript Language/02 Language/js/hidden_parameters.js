/*console.log('page loaded');

var book = {
    title: "Lord of the Rings",
	page: 0,
    turnPage: function() {
        console.log(this);
		this.page++;
    }
};

book.turnPage();
console.log(book.page);
*/

var counter = {
  value: 0,
  increment: function(inc) {
	console.log(this);
    this.value += inc;
  }
};

counter.increment(5);
console.log(counter.value);