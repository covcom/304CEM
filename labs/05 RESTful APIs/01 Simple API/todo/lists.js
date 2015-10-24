
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
      return {code:200, response:{status:'success', message:'list found', data: lists[i]}}
    }
  }
  return {code:404, response:{status:'error', message:'list not found', data: listID}}
}

exports.getAll = function() {
  console.log('getAll')
  if (lists.length === 0) {
    return {code: 404, response:{ status:'error', message:'no lists found' }}
  }
  return {code:200, response:{status:'success', message:'lists found', data: lists}}
}

exports.getAllXML = function() {
  console.log('getAllXML')

}

exports.addNew = function(body) {
  console.log('addNew')
  const json = JSON.parse(body)
  const valid = validateJson(json)
  if (valid === false) {
    return {code: 400, response:{ status:'error', message:'JSON data missing in request body' }}
  }
  const newId = rand(160, 36)
  const newList = {id: newId, list: json}
  lists.push(newList)
  return {code: 201, response:{ status:'success', message:'new list added', data: newList }}
}

exports.updateByID = function(listID) {
  console.log('updateById: '+listID)
}

exports.deleteByID = function(listID) {
  console.log('deleteById: '+listID)
}
