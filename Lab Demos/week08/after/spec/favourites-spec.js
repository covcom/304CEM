'use strict'

const favourites = require('../modules/favourites')

describe('Test favourites module', function () {
  beforeEach(function() {})
  afterEach(function() {})
  
  it('should fail with no data', function(done) {
    favourites.validate(undefined, (err, result) => {
      expect(err.message).toBe('Need to send some data')
      done()
    })
  })
  
  it('should fail with no title in data', function(done) {
    favourites.validate({id: 1, authors: [1], description: 1}, (err, result) => {
      expect(err.message).toBe('ID, title, authors, description: REQUIRED')
      done()
    })
  })
  
})


