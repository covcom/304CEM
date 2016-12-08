'use strict'

const rewire = require('rewire')
const favourites = rewire('../modules/favourites')

describe('favourites validation', function () {
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
  
  // lots more validation tests possible here
  
})

describe('CRUD methods for favourites', function () {
  
  // we want to test the methods exported from favourites.js
  // BUT we don't want to depend on the db.js module working
  // SO we override the dbConnection before each of the tests
  // Just use a local "Map()" object to store and access our test data locally
  
  beforeEach(function() {
    
    const items = new Map()
    
    const dbConnectionMock = function(dbName, callback) {
      const testDB = {
        values: () => [...items.values()],
        getItemSync: id => items.get(id),
        setItem: (id, value, cb) => {
          items.set(id, value)
          return cb()
        }
        // additional node-persist methods would be defined here for thorough testing
      }
      return callback(null, testDB)
    }
    
    // after the test we'll need to revert the mock, so store its revert function here
    this.undoDbConnectionMock = favourites.__set__('dbConnection', dbConnectionMock)
  
    // we'll also want to access the items map to check the test data inside the tests
    this.items = items
    
  })

  afterEach(function() {
    this.undoDbConnectionMock()  // invoke the revert function returned from __set__ above
  })
  
  describe('adding items', function () {
    
    beforeEach(function() {
      this.items.clear()  // start with en empty test db
      this.testBook = {id: 1, title: '304CEM'}  // define a book to try adding
    })

    it('should tell us what we just added', function(done) {
      favourites.add(undefined, this.testBook, (err, result) => {
        expect(result.book).toEqual(this.testBook)
        done()
      })
    })

    it('should save a book using the id as the database key', function(done) {
      favourites.add(undefined, this.testBook, (err, result) => {
        expect(this.items.has(this.testBook.id)).toBe(true)
        done()
      })
    })

    it('should save the entire book as the value in the database', function(done) {
      favourites.add(undefined, this.testBook, (err, result) => {
        expect(this.items.get(this.testBook.id)).toEqual(this.testBook)
        done()
      })
    })

  })
  
  
})
