// file to store, confirm and delete users that will be authorized to manage favourites

const storage = require('node-persist')
const uuid = require('uuid')

exports.validate = function validate (req, res, next) {
  const data = JSON.parse(req.body)
  if (!data.username || !data.password) res.send(400, {message: 'Must send a username and password'})
  next()
}

exports.validateConfirmation = function confirmOK (req, res, next) {
  const data = JSON.parse(req.body)
  if (!data.confirmationcode) res.send(400, {message: 'Must supply a conf code'})
  next()
}

exports.add = function add (req, res, next) {
  const user = JSON.parse(req.body)
  // first check user does already exist: if OK then proceed as follows
  user.confirmed = false
  user.code = uuid()
  dbConnect(res, usersDB => {
    usersDB.setItemSync(user.username, user)
    // send email!
    console.log(user.code)
    return res.send(201, {message: 'User added, please confirm registration using code in CONSOLE/EMAIL', username: user.username})
  })
}

exports.confirm = function confirm (req, res, next) {
  const username = req.params.username
  const code = JSON.parse(req.body).confirmationcode
  dbConnect(res, usersDB => {
    usersDB.getItem(username, (err, user) => {
      if (err) return res.send(404, {message: 'error finding user'})
      if (user.code === code) {
        user.confirmed = true
        usersDB.setItem(username, user, err => {
          if (err) return res.send(500, {message: `Failed confirming user ${username}`})
          return res.send(201, {message: `Confirmed user ${username}`})
        })
      }
    })
  })
}
                          
exports.delete = function delete_ (req, res, next) {
  
}

function dbConnect (res, callback) {

  // define the storage file for the list of users
  const usersDB = storage.create({dir: `./.node-persist/users`})
  
  // initialise the connection (creates a new file if necessary)
  usersDB.init(err => {

    if (err) {
      console.log(err)
      return res.send(500, {message: 'Unable to initialise data store'})
    } else {
      return callback(usersDB)  // can now read and write to the storage file
    }

  })
}
