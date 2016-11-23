'use strict'

const users = [
	{
		username: 'alice',
		password: 'alice',
		confirmed: false,
		code: 'aaksjdhuaofdsiua'
	},
	{
		username: 'bob',
		password: 'bob',
		confirmed: true,
		code: 'asd980a7sd7s'
	}
]

const storage = require('node-persist')

exports.authorize = function authorize(req, res, next) {
	const auth = req.authorization
	if (!auth || !auth.basic) return res.send(401, {message: 'Need basic authorization header'})
	
	const username = auth.basic.username
	const password = auth.basic.password
	
	dbConnect(res, usersDB => {
		const users = usersDB.values()
		for (let i = 0; i < users.length; i++) {
			if (users[i].username === username && users[i].password === password && users[i].confirmed === true) return next()
		}
		return res.send(401, {message: 'Username or password incorrect, or registration not confirmed'})
	})

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
