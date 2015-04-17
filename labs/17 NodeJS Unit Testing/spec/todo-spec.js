
var list = require("../modules/todo");
 
describe("ToDo List", function () {
	
	list.add('foo', 1);
	list.add('bar', 2);
	
	xit('should clear the list before starting', function() {
		list.clear();
		expect(list.count()).toBe(0);
	});
	
	xit('should add a new item', function () {
		list.add('milk', 1);
		list.add('butter', 2);
		list.add('cheese', 3);
		list.add('bread', 4);
		expect(list.count()).toBe(4);
	});
	
	xit('second item should be "butter", qty 2', function() {
		expect(list.getAll()[1].title).toBe('butter');
		expect(list.getAll()[1].qty).toBe(2);
	});
	
	xit('should be able to remove butter', function() {
		list.remove('butter');
		expect(list.count()).toBe(3);
		expect(list.getAll()[1].title).toBe('cheese');
	});
	
	xit('should be able to cope with an invalid key', function() {
		//debugger;
		list.remove('jam');
		expect(list.count()).toBe(3);
		expect(list.getAll()[1].title).toBe('cheese');
	});
});

