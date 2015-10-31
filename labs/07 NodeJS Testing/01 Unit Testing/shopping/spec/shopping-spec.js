/*istanbul ignore next*/

var list = require("../modules/shopping");

describe('Shopping List', function () {

	//list.add('foo')
	//list.add('bar')

	it('should clear the list before starting', function() {
		list.clear()
		expect(list.count()).toBe(0)
	});

	it('should add a new item', function () {
		list.add('milk');
		list.add('butter');
		list.add('cheese');
		list.add('bread');
		expect(list.count()).toBe(4)
	})

	it('should be able to return a shopping item', function() {
		expect(list.getItem('butter').title).toBe('butter')
		expect(list.getItem('butter').qty).toBe(1)
	})

  it('should be able to increment a quantity', () => {
    list.add('butter')
    expect(list.getAll()[1].qty).toBe(2)
  })

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
