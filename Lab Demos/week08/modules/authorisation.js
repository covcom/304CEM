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

exports.authorize = function authorize(req, res, next) {
	const auth = req.authorization
	if (!auth || !auth.basic) return res.send(401, {message: 'Need basic authorization header'})
	
	const username = auth.basic.username
	const password = auth.basic.password
	
	for (let i = 0; i < users.length; i++) {
		if (users[i].username === username && users[i].password === password && users[i].confirmed === true) return next()
	}
	return res.send(401, {message: 'Username or password incorrect, or user not yet confirmed registration'})
}
