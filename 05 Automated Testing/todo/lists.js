
/* We import the packages needed for this module. These should be listed in the 'package.json' file and can then be imported automatically using 'npm install' */
var rand = require('csprng')
var builder = require('xmlbuilder')

/* This array is used to store the lists. In a production system you would need to implement some form of data persistence such as a database. */
var lists = []

/* this is a private function that can only be accessed from inside the module. It checks that the json data supplied in the request body comprises a single array of strings. The parameter contains the string passed in the request body. */
function validateJson(json) {
  /*  */
  if (typeof json.name !== 'string') {
    console.log('name not a string')
    return false
  }
  /* returns false if the list key is not an Array */
  if (!Array.isArray(json.list)) {
    console.log('json.list is not an array')
    return false
  }
  /*  */
  for(var i=0; i<json.list.length; i++) {
    if (typeof json.list[i] !== 'string') {
      console.log('not a string')
      return false
    }
  }
  /* otherwise return true */
  return true
}

/* This public property contains a function that is passed a resource id and returns the associated list. */
exports.getByID = function(listID) {
  console.log('getById: '+listID)
  /* Here we loop through the lists. If we find one that matches the supplied id it is returned. */
  for(var i=0; i < lists.length; i++) {
    if (lists[i].id === listID) {
      /* Note that every public method in this module returns an object with the same properties. This consistency makes the routes file simpler. */
      return {code:200, response:{status:'success', contentType:'application/json', message:'list found', data: lists[i]}}
    }
  }
  /* If there are no matching lists a 'resource not found' error is returned. */
  return {code:406, response:{status:'error', contentType:'application/json', message:'list not found', data: listID}}
}

/* This public property contains a function that returns an array containing summaries of each list stored. The summary contains the list name and also the URL of its full resource. This is an important feature of RESTful APIs. */
exports.getAll = function(host) {
  console.log('getAll')
  /* If there are no lists we return a '404' error. */
  if (lists.length === 0) {
    return {code: 404, contentType:'application/json', response:{ status:'error', message:'no lists found' }}
  }
  /* The 'map' function is part of the Array prototype and takes a single function parameter. It applies this function to each element in the array. It returns a new array containing the data returned from the function parameter. See also 'Array.filter()' and 'Array.reduce()'. */
  var notes = lists.map(function(item) {
    return {name: item.name, link: 'http://'+host+'/lists/'+item.id}
  })
  return {code:200, contentType:'application/json', response:{status:'success', message:lists.length+' lists found', data: notes}}
}

/* This is a sister property to 'getAll' but returns an XML representation instead. */
exports.getAllXML = function(host) {
  console.log('getAllXML')
  /* Here the xmlbuilder module is used to construct an XML document. */
  var xml = builder.create('root', {version: '1.0', encoding: 'UTF-8', standalone: true})
  /* If there are no lists in the array we build a single message node. */
  if (lists.length === 0) {
    xml.ele('message', {status: 'error'}, 'no lists found')
  } else {
    /* If there are lists we build a different message node. */
    xml.ele('message', {status: 'success'}, 'lists found')
    /* Then we create a 'lists' node which will be used to contain each list node. */
    var xmlLists = xml.ele('lists', {count: lists.length})
    /* We now loop through the lists, create a list node for each and add the details. */
    for(var i=0; i < lists.length; i++) {
      var list = xmlLists.ele('list', {id: lists[i].id})
      list.ele('name', lists[i].name)
      list.ele('link', {href:'http://'+host+'/lists/'+lists[i].id})
    }
  }
  /* Once the XML document is complete we call 'end()' to turn it into an XML string. */
  xml.end({pretty: true})
  /* There is a logical error in this code, can you spot it? */
  return {code: 200, contentType:'application/xml', response: xml}
}

/* This public property contains a function to add a new list to the module. */
exports.addNew = function(auth, body) {
  console.log('addNew')
  /* The first parameter should contain the authorization data. We check that it contains an object called 'basic' */
  if (auth.basic === undefined) {
    console.log('missing basic auth')
    return {code: 401, contentType:'application/json', response:{ status:'error', message:'missing basic auth' }}
  }
  console.log("A")
  /* In this simple example we have hard-coded the username and password. You should be storing this somewhere are looking it up. */
  if (auth.basic.username !== 'testuser' || auth.basic.password !== 'p455w0rd') {
    console.log('invalid credentials')
    return {code: 401, contentType:'application/json', response:{ status:'error', message:'invalid credentials' }}
  }
  console.log("B")
  console.log(body)
  /* The second parameter contains the request body as a 'string'. We need to turn this into a JavaScript object then pass it to a function to check its structure. */
  const json = body
  console.log("C")
  console.log(json)
  const valid = validateJson(json)
  /* If the 'validateJson()' function returns 'false' we need to return an error. */
  if (valid === false) {
    return {code: 400 ,contentType:'application/json', response:{ status:'error', message:'JSON data missing in request body' }}
  }
  /* In this example we use the csprng module to generate a long random string. In a production system this might be generated by the chosen data store. */
  const newId = rand(160, 36)
  /* We now create an object and push it onto the array. */
  const newList = {id: newId, name:  json.name, list: json.list}
  lists.push(newList)
  /* And return a success code. */
  return {code: 201, contentType:'application/json', response:{ status:'success', message:'new list added', data: newList }}
}
