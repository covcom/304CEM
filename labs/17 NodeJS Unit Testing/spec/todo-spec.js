
var list = require("../modules/todo");
 
describe("ToDo List", function () {
	
	it('should clear the list before starting', function() {
		list.clear();
		expect(list.count()).toBe(0);
	});
	
	it('should add a new item', function () {
		list.add('milk');
		list.add('butter');
		list.add('cheese');
		list.add('bread');
		expect(list.count()).toBe(4);
	});
	
	it('second item should be "butter"', function() {
		var items = list.getAll();
		expect(list.getAll()[1]).toBe('butter');
	});
});
