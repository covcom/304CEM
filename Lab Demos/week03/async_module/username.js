exports.check = function (name, callback) {
    var names = ['colin', 'bob']
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