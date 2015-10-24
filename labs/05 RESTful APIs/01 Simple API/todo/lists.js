
var rand = require('csprng')
var builder = require('xmlbuilder')

var lists = []

/* this is a private function that can only be accessed from inside the module. It checks that the json data supplied in the request body comprises a single array of strings. The parameter contains the string passed in the request body. */
function validateJson(json) {
  console.log(json)
  /* returns false if the data is not an Array */
  if (!Array.isArray(json)) {
    console.log('not an array')
    return false
  }
  console.log('array length: '+json.length)
  for(var i=0; i<json.length; i++) {
    console.log(json[i])
    console.log(typeof json[i])
    if (typeof json[i] !== 'string') {
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

exports.getAll = function() {
  console.log('getAll')
  if (lists.length === 0) {
    return {code: 404, contentType:'application/json', response:{ status:'error', message:'no lists found' }}
  }
  return {code:200, contentType:'application/json', response:{status:'success', message:'lists found', data: lists}}
}

exports.getAllXML = function() {
  console.log('getAllXML')
  var xml = builder.create('root')
  if (lists.length === 0) {
    xml.ele('message', {status: 'error'}, 'no lists found')
  } else {
    xml.ele('message', {status: 'success'}, 'lists found')
    var xmlLists = xml.ele('lists', {count: lists.length})
    for(var i=0; i < lists.length; i++) {
      var list = xmlLists.ele('list', {id: lists[i].id})
      for(var j=0; j<lists[i].list.length; j++) {
        list.ele('item', lists[i].list[j])
      }
    }
  }
  xml.end({pretty: true})
  return {code: 200, contentType:'application/json', contentType:'application/xml', response: xml}
}

exports.addNew = function(body) {
  console.log('addNew')
  const json = JSON.parse(body)
  const valid = validateJson(json)
  if (valid === false) {
    return {code: 400, response:{ status:'error', contentType:'application/json', message:'JSON data missing in request body' }}
  }
  const newId = rand(160, 36)
  const newList = {id: newId, list: json}
  lists.push(newList)
  return {code: 201, response:{ status:'success', contentType:'application/json', message:'new list added', data: newList }}
}
