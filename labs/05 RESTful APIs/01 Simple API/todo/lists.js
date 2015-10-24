
var rand = require('csprng')

var lists = []

/* this is a private function that can only be accessed from inside the module. It checks that the json data supplied in the request body comprises a single array of strings. The parameter contains the string passed in the request body. */
function validateJson(json) {
  console.log(json)
  /* returns false if the data is not an Array */
  if (!Array.isArray(json)) {
    return false
  }
  /* returns false if any index doesn't contain a String */
  for (const item in json) {
    if (typeof item !== String) {
      return false
    }
  }
  /* otherwise return true */
  return true
}

exports.getByID = function(listID) {
  console.log('getById: '+listID)
}

/* this anonymous function is an 'Arrow Function Expression'. This uses a syntax which is new to ECMA6. It is functionally equivalent to the version above. */
/*exports.getByID = listID => {
  console.log('getById: '+listID)
}*/

exports.getAll = function() {
  console.log('getAll')
  if (lists.length === 0) {
    return {code: 400, response:{ status:'error', message:'no lists found' }}
  }
  return {code: 200, response:{ status:'success', message:'lists found', data: lists }}
}

/* Here is another Arrow Function Expression with no parameters. It is functionally equivalent to the version above. */
/*exports.getAll = () => {

}*/

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
