/*istanbul ignore next*/

var list = require("../modules/shopping")

describe('Shopping List', function () {

	it('should clear the list before starting', function() {
		list.clear()
		expect(list.count()).toBe(0)
	});

	it('should add a new item', function() {
		list.add('milk')
		list.add('butter')
		list.add('cheese')
		list.add('bread')
		expect(list.count()).toBe(4)
	})

  it('should return an array containing all items in order of entry', function() {
    const items = list.getAll()
    expect(items.length).toBe(4)
    expect(items[0].title).toBe('milk')
    expect(items[3].title).toBe('bread')
  })
  /* by placing an 'x' in front of the function name we set its status to 'pending' which means the test won't run. In this way we can write lots of tests but focus on passing one test at a time. */
	it('should be able to return a shopping item', function() {
		expect(list.getItem('butter').title).toBe('butter')
		expect(list.getItem('butter').qty).toBe(1)
	})

})
