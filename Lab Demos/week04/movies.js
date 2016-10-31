const mymoviesDB = [] 

exports.addNew = function(auth, body) {
  
  if (auth.basic.username !== 'colin' || auth.basic.password !== 'password') {
		return {
			status: "unauthorized",
			message: 'invalid credentials'
		}
	}
  
  const {title} = body
  mymoviesDB.push(title)
  return JSON.stringify(mymoviesDB)
}