
var rand = require('csprng')
var builder = require('xmlbuilder')

var lists = []

/* this is a private function that can only be accessed from inside the module. It checks that the json data supplied in the request body comprises a single array of strings. The parameter contains the string passed in the request body. */
function validateJson(json) {
  if (typeof json.name !== 'string') {
    console.log('name not a string')
    return false
  }
  /* returns false if the list key is not an Array */
  if (!Array.isArray(json.list)) {
    console.log('json.list is not an array')
    return false
  }
  console.log('array length: '+json.list.length)
  for(var i=0; i<json.list.length; i++) {
    if (typeof json.list[i] !== 'string') {
      console.log('not a string')
      return false
    }
  }
  /* otherwise return true */
  return true
}

exports.getByID = function(listID) {
  console.log('getById: '+listID)
  for(var i=0; i < lists.length; i++) {
    if (lists[i].id === listID) {
      return {code:200, response:{status:'success', contentType:'application/json', message:'list found', data: lists[i]}}
    }
  }
  return {code:404, response:{status:'error', contentType:'application/json', message:'list not found', data: listID}}
}

exports.getAll = function(host) {
  console.log('getAll')
  if (lists.length === 0) {
    return {code: 404, contentType:'application/json', response:{ status:'error', message:'no lists found' }}
  }
  var notes = lists.map(function(item) {
    return {name: item.name, link: 'http://'+host+'/lists/'+item.id}
  })
  return {code:200, contentType:'application/json', response:{status:'success', message:lists.length+' lists found', data: notes}}
}

exports.getAllXML = function(host) {
  console.log('getAllXML')
  var xml = builder.create('root', {version: '1.0', encoding: 'UTF-8', standalone: true})
  if (lists.length === 0) {
    xml.ele('message', {status: 'error'}, 'no lists found')
  } else {
    xml.ele('message', {status: 'success'}, 'lists found')
    var xmlLists = xml.ele('lists', {count: lists.length})
    for(var i=0; i < lists.length; i++) {
      var list = xmlLists.ele('list', {id: lists[i].id})
      list.ele('name', lists[i].name)
      list.ele('link', {href:'http://'+host+'/lists/'+lists[i].id})
    }
  }
  xml.end({pretty: true})
  return {code: 200, contentType:'application/xml', response: xml}
}

exports.addNew = function(auth, body) {
  console.log('addNew')
  if (auth.basic === undefined) {
    return {code: 401, contentType:'application/json', response:{ status:'error', message:'missing basic auth' }}
  }
  if (auth.basic.username !== 'testuser' || auth.basic.password !== 'p455w0rd') {
    return {code: 401, contentType:'application/json', response:{ status:'error', message:'invalid credentials' }}
  }
  const json = JSON.parse(body)
  const valid = validateJson(json)
  if (valid === false) {
    return {code: 400 ,contentType:'application/json', response:{ status:'error', message:'JSON data missing in request body' }}
  }
  const newId = rand(160, 36)
  const newList = {id: newId, name:  json.name, list: json.list}
  lists.push(newList)
  return {code: 201, contentType:'application/json', response:{ status:'success', message:'new list added', data: newList }}
}
