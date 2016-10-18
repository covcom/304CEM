// use a function to modify functionality

var myfunc_sync = function(x, y, operation) {
  var result
  switch (operation) {
    case "plus":         
        result = x + y
        break
        case "multiply":
        result = x * y
        break
  }
  return result
}

var test1 = myfunc_sync(3,2,"plus")
var test2 = myfunc_sync(3,2,"multiply")

console.log(test1, test2)

var myfunc_sync2 = function(x, y, operation) {
  return operation(x, y)
}

var plus = function(x, y) {
  return x + y
}

var multiply = function(x, y) {
  return x * y
}

var divide = function(x, y) {
  if (y === 0) throw Error
  return x / y
}

var test3 = myfunc_async(4,5,plus)
var test4 = myfunc_async(4,5,multiply)

console.log(test3, test4)
