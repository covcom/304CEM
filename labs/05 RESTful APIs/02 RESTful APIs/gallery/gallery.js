
var storage = require('node-persist')
var fs = require('fs-extra')

storage.initSync()

exports.addPhoto = (request, callback) => {
	console.log('addPhoto')
	if (request.files === undefined || request.files.photo === undefined) {
		callback( new Error('missing photo parameter') )
	}
	const photo = request.files.photo
	if (request.params === undefined || request.params.caption === undefined) {
		callback( new Error('missing caption parameter') )
	}
	const caption = request.params.caption
	
	console.log('photo: '+JSON.stringify(photo, null, 2))
	console.log('caption: '+caption)
	
	fs.ensureDirSync('photos/')
	fs.copySync(photo.path, 'photos/'+photo.name)
	
	const [name, ext] = photo.name.split('.')
	const data = {caption: request.params.caption, filename: name, extension: ext, fileType: photo.type}
	console.log(JSON.stringify(data, null, 2))
	storage.setItem(name, data)
	
	callback(null, {url: 'http://localhost:8080/photos/'+photo.name, data: data})
}

exports.getAllPhotos = callback => {
	console.log('getAll')
	const data = storage.values().map( item => {
		item.url = 'http://localhost:8080/photos/'+item.filename+'.'+item.extension
		return item
	})
	callback(null, data)
}