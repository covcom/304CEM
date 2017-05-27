
# Objects and Functions

JavaScript objects can be thought of as simple collections of name-value pairs. As such, they are similar to:

- Dictionaries in Python
- Hash tables in C and C++
- Associative arrays in PHP

Here is a simple example.
```
var employee = {
  firstName: "Colin",
  lastName: "Stephen",
  department: "Computing",
  hireDate: new Date()
}
```
## Name-Value Pairs

The “name” part is a JavaScript string (quotes if not a valid variable name).
```
age
"first name"
"age"

first name
```

The “value” can be any JavaScript value:
```
112233
"hello world"
function() {
  \\ do something
}
false
```

The preferred way to create objects in JS is using an “object literal”:
```javascript
var empty_object = {}
var physicist = {
  "first-name": "Albert",
  "second-name": "Einstein"
  "age": 135
}
```

Remember that the value can be any JS value. That includes other objects. In other words: objects can be nested.

```javascript
var flight = {
  airline: "BA",
  departure: {
    IATA: "SYD",
    time: "2014-09-22 14:45"
  },
  arrival: {
    IATA: "LAX",
    time: "2014-09-23 10:32"
  }
}
```

Object values can be retrieved in two ways:
Use [ ] around a string with the name to retrieve as a suffix
to the object name:
```javascript
physicist["first-name"] // returns "Albert"
flight["number"] // returns 882
```
If the name is a legal JS name the . notation can be used:
```
flight.airline // returns 882
flight.departure.city // returns "Sydney"
```

Undefined Values

If you try to retrieve a nonexistent name from an object, JS returns undefined:
```javascript
physicist["middle-name"] // returns undefined
flight.capacity // returns undefined
```

TIP: the OR operator `||` can be used to fill in “default” values:
```javascript
var middle = physicist["middle-name"] || "(none)"
var capacity = flight.capacity || "unknown"
```
Undefined Objects

If you try to retrieve a value from an object that is undefined, JS throws a TypeError exception:
```javascript
fakeObject["any-string"] // throw "TypeError"
flight.capacity // returns undefined
flight.capacity.minimum // throw "TypeError"
```

Avoiding TypeError

The AND operator && can be used to guard against this
problem:
```javascript
flight.capacity // undefined
flight.capacity.minimum // throw "TypeError"

flight.capacity && flight.capacity.minimum
// undefined
```

Setting object values at creation.

Object values are set in two ways:

During object creation, unless your object is empty {}:
```javascript
var employee = {name: "Colin"};
employee.name // returns "Colin"
```

Setting values by assignment.

This sets a new value if the name does not already exist. Otherwise, it updates the existing value:
```javascript
physicist["middle-name"] = "Bob";
physicist["middle-name"] // returns "Bob"
flight.arrival.city // returns "Los Angeles"
flight.arrival.city = {full: "Los Angeles", short: "LA"}
flight.arrival.city.short // returns "LA"
```

Call by reference.

Objects are passed around in JS programs “by reference”. They are never copied.
```javascript
var a = {}
var b = {}
a.test = "hello"
b.test // returns undefined
```

```javascript
var a = {};
var b = a;
a.test = "hello"
b.test // returns "hello"
```

Example.
```javascript
var stooge = {first: "Jerome", second: "Howard"}
var x = stooge;
x.nickname = "Curly";
var nick = stooge.nickname;
nick // returns "Curly"
```

Function creation.

This creates a function object using a function literal
```javascript
For example:
function add(x, y) {
  var total = x + y
  return total
}
```

Named functions.

The function can use its own name to call itself
Useful for manipulating tree structures
```javascript
var add = function(x, y) {
  var total = x + y
  return total
}
```
Defines an anonymous function and assigns it to the variable name add.

add could be reassigned later in the program.

Both anonymous and named functions are common in JS.

Invoking functions.

There are several ways to call a function:

- method (part of an object)
- function (stand-alone)
- constructor (next week)
- apply (next week)

Functions as object properties.

Methods are functions stored as properties of objects.
When a method is invoked, this is bound to that object.
```javascript
var myValueObject = {
  value: 0,
  increment: function(inc) {
    this.value += typeof inc === ’number’ ? inc : 1;
  }
}

myValueObject.increment();
myValueObject.value // returns 1
myValueObject.increment(2);
myValueObject.value // returns 3
```

Regular function invocation.

You have seen it, just use brackets after a direct reference to the function object.
```
add(3, 4); // returns 7
```
Contrast with method invocation which looks like:
```
myObject.methodName(3, 4);
myObject["methodName"](3, 4);
```

Constructors

new is strongly related to this:					

- creates a brand new empty object
- calls the function specified
- sets this to the new object
- returns the new object					

Functions that are designed to be called by ‘new’ are called “constructor functions”.

Constructor function invocation.
```
function Person(first, last) {
    this.first = first
    this.last = last
}
var s = new Person('Colin', 'Stephen')
```

Inheritance with prototypes.

If we can construct “classes”, how do we do inheritance in JS?

JS is a “prototypal” inheritance language.
```
Person.prototype.fullName = function() {
    return this.first + ' ' + this.last			
}

Person.prototype.fullNameReversed = function() {
    return this.last + ', ' + this.first
}

s.fullName() // returns "Simon Willison"
```

Function arguments.

Every function is passed an array-like object:

- arguments like _this_ it is available in all functions
- Holds all of the values passed to the function
- Useful when you want to work with an arbitrary number of arguments

```
function avg() { // no parameters
    var sum = 0
    for (var i = 0, j = arguments.length; i < j; i++) {
        sum += arguments[i]						
    }
    return sum / arguments.length
}
				
avg(2, 3) // returns 2.5
avg(2, 3, 4, 5) // returns 3.5
```

## ECMA 6 Classes

Not true classes and objects.

A simple way to work with the existing prototype-based inheritance.

Provide a much simpler and clearer syntax to create objects.

Must be defined before use (no 'hoisting')
```
module.exports = class Person {
  constructor(firstname, lastname) {
    this.first = firstname
    this.last = lastname
  }

  set firstName(name) {
    this.first = name
  }

  get name() {
    return `${this.first} ${this.last}`
  }
}
```

Subclassing.
```
const Person = require('./person')

module.exports = class Employee extends Person {

  constructor(firstname, lastname, grade = 1) {
    super(firstname, lastname)
    this.grade = grade
  }

  calculateSalary(months = 1) {
    return this.grade * 1000 * months
  }
}
```

Static Methods.
```
class Point {
    static distance(a, b) {
        return Math.abs(a - b)
    }
}

console.log(Point.distance(10, 42)) // 32
```

Creating objects.
```
const person = new Person('Andy', 'Capp')
console.log(person.name)
const manager = new Employee('Peter', 'Piper', 4)
console.log(manager.name)
console.log(manager.calculateSalary(6))
console.log(manager)
```