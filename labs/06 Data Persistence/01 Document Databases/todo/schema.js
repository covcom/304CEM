
var mongoose = require('mongoose')
const server = 'mongodb://'+process.env.IP+'/api'
console.log('connect to server: '+server)
var Schema = mongoose.Schema

var listSchema = new Schema({
    name: { type: String, required: true },
    items: [ {type: String} ]
})

exports.List = mongoose.model('List', listSchema)
