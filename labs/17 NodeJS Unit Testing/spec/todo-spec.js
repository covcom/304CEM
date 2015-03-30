
var list = require("../modules/todo");
 
describe("ToDo List", function () {
	
	it('should clear the list before starting', function() {
		list.clear();
		expect(list.count()).toBe(0);
	});
	
	it('should add a new item', function () {
		list.add('milk', 1);
		list.add('butter', 2);
		list.add('cheese', 3);
		list.add('bread', 4);
		expect(list.count()).toBe(4);
	});
	
	it('second item should be "butter", qty 2', function() {
		expect(list.getAll()[1].title).toBe('butter');
		expect(list.getAll()[1].qty).toBe(2);
	});
	
	it('should be able to remove butter', function() {
		list.remove('butter');
		expect(list.count()).toBe(3);
		expect(list.getAll()[1].title).toBe('cheese');
	});
	
	it('should be able to cope with an invalid key', function() {
		//debugger;
		list.remove('jam');
		expect(list.count()).toBe(3);
		expect(list.getAll()[1].title).toBe('cheese');
	});
});
