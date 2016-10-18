
const username = require('./username')
// check username exists
var check = function(name) {
    username.check(name, function(err, result) {
        if (err) {
            // it didn't work i.e. not found
            console.error(err)
            throw new Error("broke looking for name")
        } else {
            // success: i.e. result has a value
            console.log("It was found.")
            console.log(result)
        }
    })
}