'use strict'

// testing asynchronous modules that have their own external dependencies can be considered "advanced"
// for simpler unit testing, please see the 'favourites validation' test suite in the "favourites-spec.js" test file next to this one

// we need to override calls that our db module makes to node-persist's methods
// so we "rewire" the db module rather than just require it
const rewire = require('rewire')
const db = rewire('../modules/db')  // now we can override objects inside db.js

describe('dbConnection', function () {
  
  beforeEach(function() {})
  afterEach(function() {})
  
  it('should call back with an error if there is a problem initialising', function(done) {

    // mock the db with one that can never connect!
    const dbMock = {
      create: function() {
        return this
      },
      init: function(cb) {
        const err = true
        return cb(err)
      } 
    }
    db.__set__('storage', dbMock)
    
    db.dbConnection('fakeDB', (err, connection) => {
      // test that db module sent back an error when it could not connect
      expect(err).toBeDefined()
      return done()
    })
  })
  
  it('should call back with a connection to the correct db if the initialisation succeeds', function(done) {
    
    // mock the db with one that always connects!
    const dbMock = {
      create: function() {
        return this
      },
      init: function(cb) {
        const err = null
        const db = this
        return cb(err, db)
      } 
    }
    db.__set__('storage', dbMock)
    
    db.dbConnection('fakeDB', (err, connection) => {
      // test that db module sent back the correct DB
      expect(err).toBeNull()
      expect(connection).toEqual(dbMock)
      return done()
    })
  })
  
  it('should open a connection to the specified path under the "./node-persist/" directory', function(done) {

    // mock the db with one that always connects and keeps note of the directory being used as the store
    // that way we can double check the directory is correct during the test
    const dbMock = {
      create: function(opts) {
        this.options = opts
        return this
      },
      init: function(cb) {
        const err = null
        const db = this
        return cb(err, db)
      } 
    }
    db.__set__('storage', dbMock)
    
    db.dbConnection('fakeDB', (err, connection) => {
      // test that the returned db object is saving to the correct directory
      expect(connection.options.dir).toBe('./node-persist/fakeDB')
      return done()
    })
        
  })
  
})