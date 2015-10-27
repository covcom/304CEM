
var rand = require('csprng')

var images = require('./images.js')

var accounts = []

/* A */
function authorisationSent(auth) {
  console.log('CHECK AUTH PRESENT')
  console.log(auth)
  return new Promise(function(resolve, reject) {
    console.log('  a')
    if (auth.scheme !== 'Basic') {
      console.log('  b')
      console.log('basic auth not supplied')
      return reject({code: 401, response:{ status:'error', message:'Basic access authentication required'} })
    }
    if (auth.basic.username === undefined || auth.basic.password === undefined) {
      console.log('  c')
      console.log('missing username or password')
      return reject({code: 401, response:{ status:'error', message:'missing username or password'} })
    }
    console.log('  d')
    return resolve({code: 200, response:{ status:'success', message:'authorization header has been supplied'} })
  })
}

/* B */
function checkUniqueUsername(auth) {
  console.log('CHECK UNIQUE USERNAME')
  return new Promise(function(resolve, reject) {
    console.log(typeof auth)
    const username = auth.basic.username
    for (var i=0; i<accounts.length; i++) {
      if (accounts[i].username === auth.basic.username) {
        return reject({code: 409, response:{ status:'error', message:'username already exists' }})
      }
    }
    return resolve({code: 200, response:{ status:'success', message:'username is not already in use' }})
  })
}

/* D */
function checkBody(body) {
  console.log('CHECK BODY')
  return new Promise(function(resolve, reject) {
    console.log('  a')
    if (typeof body.name !== 'string' || typeof body.email !== 'string') {
      console.log('  b')
      return reject({code: 400, response:{status:'error', message:'name and email body fields required'}})
    }
    return resolve({code: 200, response:{status:'success', message:'name and email body fields present'}})
  })
}

/* E */
function buildDocument(body) {
  console.log('BUILD ACCOUNT DOCUMENT')
  return new Promise(function(resolve, reject) {
    const user = {name: body.name, email:body.email}
    console.log(user)
    return resolve({code: 200, response:{status:'success', message:'document created', data:user}})
  })
}

/* F */
function addAccount(user) {
  console.log('ADD ACCOUNT')
  return new Promise(function(resolve, reject) {
    const newId = rand(160, 36)
    const doc = {id:newId, user:user}
    accounts.push(doc)
    return resolve({code: 200, response:{status:'success', message:'document created', data:doc}})
  })
}

/* This function handles adding a new user account. This is a complex process that requires a lot of different steps. Many steps have the chance of failure. If a step fails the entire process should fail. If we didn't use promises the level of nesting would be unmanageable. */
exports.add = function(host, auth, body, files, callback) {
  var doc, id  // these variables will be used to store data returned by step in the process.
  console.log('A')
  authorisationSent(auth).then(function() {
    console.log('B')
    return checkUniqueUsername(auth)
  }).then(function() {
    console.log('C')
    return images.check(files)
  }).then(function() {
    console.log('D')
    return checkBody(body)
  }).then(function() {
    console.log('E')
    return buildDocument(body)
  }).then(function(data) {
    console.log('F')
    doc = data.response.data
  }).then(function() {
    console.log('G')
    return addAccount(doc)
  }).then(function(data) {
    console.log('H')
    id = data.response.data.id
  }).then(function() {
    console.log('I')
    return images.save(id, files)
  }).then(function() {
    console.log('J')
    console.log(JSON.stringify(accounts, null, 2))
  }).then(function(data) {
    console.log('K')
    doc.id = id
    doc.img = 'http://'+host+'/images/'+id+'.png'
    callback({code:201, response:{status:'success', message:'account created', data: doc}})
  }).catch(function(data) {
    console.log('L')
    console.log('MAIN CATCH')
    //console.log(data)
    callback(data)
  })
}
