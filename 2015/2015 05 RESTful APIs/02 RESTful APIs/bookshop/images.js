
var im = require('imagemagick')

exports.check = function(files) {
  console.log('CHECK IMAGE')
  return new Promise(function(resolve, reject) {
    console.log('   a')
    if (files === undefined) {
      return reject({code: 400, response:{status: 'error', message: 'image missing (encode as form/multipart) with key of *image*'}})
    }
    const image = files.image
    if (image === undefined) {
      console.log('   b')
      return reject({code: 400, response:{status: 'error', message: 'image missing (encode as form/multipart) with key of *image*'}})
    }
    console.log('   c')
    if (image.type !== 'image/png') {
      console.log('   d')
      return reject({code: 400, response:{status:'error', message:'image should be of type *image/png*'}})
    }
    return resolve({code: 200, response:{status:'success', message:'png image has been uploaded'}})
  })
}

exports.save = function(filename, files) {
  console.log('SAVE IMAGE')
  return new Promise(function(resolve, reject) {
    try {
      console.log('  a')
      //console.log(typeof files)
      //console.log(JSON.stringify(files, null, 2))
      const image = files.image
      console.log('  a2')
      //console.log(JSON.stringify(image, null, 2))
      if (image === undefined) {
        console.log('  b')
        return reject({code: 400, response:{status: 'error', message: 'image missing (encode as form/multipart) with key of *image*'}})
      }
      console.log('  c')
      if (image.type !== 'image/png') {
        console.log('  d')
        return reject({code: 400, response:{status:'error', message:'image should be of type *image/png*'}})
      }
      console.log('  d2')
      const oldImg = image.path
      const newImg = 'images/'+filename+'.png'
      console.log('  d3')
      console.log('newImg: '+newImg)
      im.resize({srcPath: oldImg, dstPath: newImg, width: 200}, function(err) {
        if (err) {
          console.log('   h')
          return reject({code: 400, response:{status:'error', message:err}})
        } else {
          console.log('   i')
          return resolve({code: 201, response:{status:'success', message:'image has been uploaded'}})
        }
      })
      //im.crop({srcPath: oldImg,})
    } catch(err) {
      return reject({code: 400, response:{status:'error', message:err}})
    }
  })
}
