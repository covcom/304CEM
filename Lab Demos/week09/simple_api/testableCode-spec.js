
'use strict'

const testableCode = require('./testableCode')
const storage = require('node-persist')

describe('testable code', () => {

  beforeEach( () => {
    storage.initSync()
    storage.clearSync()
    const data = {id: '12345'}
    storage.setItemSync(data.id, data)
  })

  describe('add', () => {
  
    it('should add a valid item', () => {
      const data = {id: '54321'}
      const added = testableCode.add(data)
      expect(added).toBe(true)
      const item = storage.getItemSync(data.id)
      expect(item).toBe({id: '54321'})
      expect(storage.length()).toBe(2)
    })
    
    it('should not add a duplicate item', () => {
      const data = {id: '12345'}
      const added = testableCode.add(data)
      expect(added).toBe(false)
      expect(storage.length()).toBe(1)
    })
    
  })
  
  describe('update', () => {
  
  })
  
})
