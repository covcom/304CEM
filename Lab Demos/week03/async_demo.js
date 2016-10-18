
var async_func = function (name, callback) {
    var names = ["colin", "bob"]
    if (names.indexOf(name) > -1) {
        // success
        var result = "found"
        return callback(null, result)
    } else {
        // error
        var message = "name not found"
        return callback(message)
    }
}

// check username exists
var check = function(name) {
    async_func(name, function(err, result) {
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

check("colin")
check("nobody")

// function(err, data) {} is common callback signature