
var storage = require('node-persist')
var fs = require('fs-extra')

/* we need to initialise the local storage before use. */
storage.initSync()

exports.addPhoto = (request, callback) => {
	console.log('addPhoto')
	/* if the files object is not defined there are no files uploaded. */
	if (request.files === undefined || request.files.photo === undefined) {
		/* if the data is not available we send an error back as the first parameter. */
		callback( new Error('missing photo parameter') )
	}
	const photo = request.files.photo
	/* if the params object is undefined there are no parameters passed. */
	if (request.params === undefined || request.params.caption === undefined) {
		callback( new Error('missing caption parameter') )
	}
	const caption = request.params.caption
	
	console.log('photo: '+JSON.stringify(photo, null, 2))
	console.log('caption: '+caption)
	
	/* we need to ensure there is a directory to save our photos to. */
	fs.ensureDirSync('photos/')
	/* we then copy the file from the tmp directory to the photos directory. */
	fs.copySync(photo.path, 'photos/'+photo.name)
	/* this is a 'desctucturing assignment'. The right-side of the assignment splits the string into two indexes but instead of assigning the results to an array we specify two variables. */
	const [name, ext] = photo.name.split('.')
	/* now we can create the object to store. */
	const data = {caption: request.params.caption, filename: name, extension: ext, fileType: photo.type}
	console.log(JSON.stringify(data, null, 2))
	/* and we then save the object to the filesystem. */
	storage.setItem(name, data)
	/* finally we send the data back with a link to the image. The first parameter is used for the error so it is set to null. */
	callback(null, {url: 'http://localhost:8080/photos/'+photo.name, data: data})
}

exports.getAllPhotos = callback => {
	console.log('getAll')
	/* We retrieve the array of stored items then use the 'map()' function to add the image url. */
	const data = storage.values().map( item => {
		item.url = 'http://localhost:8080/photos/'+item.filename+'.'+item.extension
		return item
	})
	callback(null, data)
}