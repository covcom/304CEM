// file to store, confirm and delete users that will be authorized to manage favourites

const storage = require('node-persist')
const uuid = require('uuid')
const usersConnection = require('./db').usersConnection

exports.validateUser = function validateUser (req, res, next) {
  // ensure new users include a username and password
  const data = JSON.parse(req.body)
  if (!data.username || !data.password) return res.send(400, {message: 'Must supply a username and password'})
  next()
}

exports.validateCode = function validateCode (req, res, next) {
  // ensure confirmation code is passed in the body
  const data = JSON.parse(req.body)
  if (!data.confirmation) return res.send(400, {message: 'Must supply a confirmation code'})
  next()
}

exports.add = function add (req, res, next) {
  // body includes username and password details
  const user = JSON.parse(req.body)

  usersConnection(res, usersDB => {

    // first check that the user does not already exist
    if (usersDB.getItemSync(user.username)) return res.send(400, {message: 'Username taken.'})

    // create a code and save as a *pending* user
    user.code = uuid()
    user.confirmed = false
    usersDB.setItemSync(user.username, user)

    // get the code to the user somehow
    console.log(user.code)  // or send an email...

    // NB: don't send the code in the response
    return res.send(201, {message: 'User added, please confirm registration using code', username: user.username})
  })
}

exports.confirm = function confirm (req, res, next) {

  // username came as part of the URL
  const username = req.params.username
  // confirmation code comes in the body
  const code = JSON.parse(req.body).confirmation

  // now connect to the users list and check the code matches
  usersConnection(res, usersDB => {
    usersDB.getItem(username, (err, user) => {
      if (err) return res.send(500, {message: 'error finding user'})
      if (user.code === code) {
        user.confirmed = true
        usersDB.setItem(username, user, err => {
          if (err) return res.send(500, {message: `Failed confirming user ${username}`})
          return res.send(201, {message: `Confirmed user ${username}`})
        })
      } else {
        return res.send(400, {message: `Code ${code} does not match for user ${username}.`})
      }
    })
  })
}
                          
exports.delete = function delete_ (req, res, next) {

  // username came as part of the URL
  const username = req.params.username

  // username must match authorization username
  const authuser = req.authorization.basic.username
  if (username !== authuser) return res.send(400, {message: 'You can\'t delete other users!'})

  // if it matches then connect to the store and delete
  usersConnection(res, usersDB => {
    usersDB.removeItem(username, err => {
      if (err) return res.send(500, {message: 'Could not delete user.'})
      return res.send({message: `User ${username} deleted`})
    })
  })
}
