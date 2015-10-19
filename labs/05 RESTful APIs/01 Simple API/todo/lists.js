
var lists = []

function validateJson(json) {
  console.log(json)
}

exports.getByID = function(listID) {
  console.log('getById: '+listID)
}

exports.getAll = function() {
  console.log('getAll')
}

exports.addNew = function() {
  console.log('addNew')
}

exports.updateByID = function(listID) {
  console.log('updateById: '+listID)
}

exports.deleteByID = function(listID) {
  console.log('deleteById: '+listID)
}
