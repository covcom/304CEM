
# JavaScript Objects

Unlike traditional _Object-Oriented Programming_ languages, JavaScript objects can be thought of as simple collections of name-value pairs. As such, they are similar to:

- Dictionaries in Python
- Hash tables in C and C++
- Associative arrays in PHP

There is a slide deck https://goo.gl/w3jZ3t to accompay this worksheet. Make sure you are familiar with its contents before proceeding.

This chapter covers the following topics:

1. Object literals *
2. The function object *
3. Constructors *
4. Immediately invoked function expressions
5. Prototypal inheritance
6. Classes

## 1 Object Literals

Lets start by creating an manipulating objects using **object literals**. Open the `employee.js` file, read through it and see if you can work out what it does. Now run it to see if you were correct.

### 1.1 Creating Object Literals

The simplest way to create new objects is by creating an _object literal_ which is defining an object and storing it in a variable.
```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen'
}
```
As you can see from the simple example above, the data is stored in name-value pairs, referred to as **Properties**. This example is defining an object with **3** properties.

The _name_ part of each property is a JavaScript string which may be enclosed in single quotes. These quotes are optional if the _property name_ is a valid _JavaScript variable_ but they are required if this is not the case.

In the example above, `firstName` is a valid JavaScript variable but `last name` is not because it contains a space which is not allowed in variable names.

It is also possible to create an empty object (we can add properties later). This is done by assigning empty curly braces.
```javascript
const emptyObject = {}
```

Here are some valid _property names_. Notice that both `age` and `'age'` are valid.
```
age
'first name'
'age'
```
The _property names_ below are **not** valid because they are not a valid JavaScript variable names.
```
first name
firstName!
first-name
```

### 1.2 Retrieving Object Properties

Whilst it is possible (and useful) to log an entire object to the console, normally we would want to retrieve the values of specific properties.
```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	'department': 'Computing'
}

console.log(employee)
const firstName = employee.firstName
const lastName = employee['last name']
const grade = employee.grade
```
Passing the object name to `console.log()` will print out the string representation of the object. To retrieve a specific property value there are two options. If the name is a _legal JS variable name_ the dot `.` notation can be used. This is used to log the `firstName` property in the example above.

If the name is not a valid JavaScript variable name we need to turn it into a string by using quotes `''` and enclose it in square braces `[]`. This is used to log the `last name` property.

The `grade` variable will be `undefined` because `employee.grade` does not exist. If you want to avoid this and assign a default value if the property is missing you can use the **OR** operator `||`.
```javascript
const grade = employee.grade || 'A'
```
This will retrieve the value of the grade property if defined and store it in the `const` variable. If this property is missing the `const` variable will contain the string `'A'`.

### 1.3 Modifying Objects

Once an object has been created it can be modified in several ways.

1. More object values can be added
2. Object names can be deleted
3. The values can be changed for existing names.

Once an object has been created, additional properties cane be added by setting values by assignment.
```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	'department': 'Computing'
}

employee.grade = 4
employee['currently employed'] = true
employee.department = 'Computer Science'
```
This sets a new value if the name does not already exist. Otherwise, it updates the existing value. Notice that the syntax depends on whether the property name is a valid JavaScript object and matches the syntax used to retrieve a property.

Properties can be removed from an object literal using the `delete` operator. This removes the entire property (name and value).
```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	'department': 'Computing'
}

delete employee.department
```

### 1.4 Undefined Values

Undefined Objects

If you try to retrieve a value from an object that is undefined, JS throws a TypeError exception:
```javascript
const nonExistentObject.postCode // throws "TypeError"
const addressObject = employee.address  // returns undefined
const postCode = employee.address.postCode // throws "TypeError"
```
To see what a `typeError` looks like, try uncommenting the three lines at the end of the `employee.js` file. So how can we avoid this?

The **AND** operator `&&` can be used to guard against this problem.
```javascript
const postCode = employee.address && employee.address.postCode
console.log(postCode) // returns undefined
```

### 1.5 Passing by Reference

Call by reference.


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

### 1.6 Test Your Knowledge

TODO


## 2 Constructors

A **constructor** is any JavaScript function called with the `new` keyword. Functions that are designed to be called by ‘new’ are called **constructor functions**.	

A constructor function is a regular function except we use these with the `new` keyword. There are a number of built-in constructor functions such as `Array()` and `Object` but we can create our own. To identify a constructor function their names should be capitalised.

Constructor functions are useful when you need multiple objects with the same properties and methods. Any objects created in this manner inherit all the properties and methods of the object prototype (see next section).	Open the `books.js` file to see an example of a _constructor function_ and its invocation.
```javascript
function Book(isbn, title) {
	this.isbn = isbn
	this.title = title
}

const b = new Book('1491943122', 'Learning Node')
```
Notice that the `Book()` function is capitalised to identify it as a _constructor function_. When this code is run.

- it creates a brand new empty object called `b`.
- calls the `Book()` function specified.
- sets `this` to the new object
- returns the new object

For any object we can use the `instanceof` operator to check the constructor function used to create it.
```javascript
if (b instanceof Book) console.log('its a Book')
```

### 2.1 This

Since functions are _objects_ in JavaScript they get their own properties just like other objects. `this` is a **function-scoped variable** that contains the _value of the object that invoked the function_. We use it to access the properties and methods of the object without needing to know the name of the invoking object. Adding properties and methods to `this` is a safe way to store data that should be scoped to the function.

ife we look back at the previous example you will see that the two function _parameters_ are added to the function's `this` object as properties.

### 2.2 Defining Properties

You have already seen properties in the built-in constructor functions. For example all `Array` objects have a `length` property. You can add properties to your own constructor functions as well.
```javascript
function Book(isbn, title) {
	this.isbn = isbn
	this.title = title
	this.year = null
	Object.defineProperty(this, 'published', {
		get: () => this.year,
		set: year => this.year = year
	})
}

const b = new Book('1491943122', 'Learning Node')
console.log(b.published) // prints null
b.year = 2016
console.log(b.published) // prints 2016
```

### 2.3 Object Literals vs Constructors

JavaScript has 8 built-in constructors, `Object()`, `String()`, `Number()`, `Boolean()`, `Date()`, `Array()`, `Error()` and `Regexp()`. All of these will allow you to create the appropriate objects however for each of these there is an alternative _object literal_ that achieves the same result. For example to create an array or a string, these lines achieve the same result.
```javascript
const arrLit = ['JavaScript', 'Swift', 'C++', 'Java']
const arrCon = new Array('JavaScript', 'Swift', 'C++', 'Java')
const strLit = 'Hello World'
const strCon = new String('Hello World')
```
If there are two ways to achieve the same result which one is preferred?

Generally, object literals are more concise and easier to read. They also run faster due to parse-time optimisations. For these reasons it is always recommended to create them using object literals.

### 2.4 Test Your Knowledge

TODO

## 3 The Function Object

As we have seen, functions are _first class citizens_, they can be used like any other data type. They can also be passed to other functions and returned from them. They can also be nested.

In JavaScript every function is actually a [function object](https://goo.gl/jjyhZM). Because of this we can use the [new operator](https://goo.gl/gKwCCH) to create instances of them.

Open the `coffee.js` file. Lets understand how it works.

1. The `coffee.js` file contains a **constructor** called `Coffee()` that can be used to create new objects.
2. The function takes two parameters although the second one is a [default parameter](https://goo.gl/SJL4tS).
3. Because we will be invoking the function as a constructor, the `this` object is bound to the returned object, this means that we will be able to access all its properties in our created object.
    - Notice that we added an object to `this` to store the different sizes and this is accessible by the function parameters.
4. We store the two parameters as properties of the `this` object.
5. We also store the `getSize()` functions in the `this` object which means we can call it once we have an instance of our enclosing function. Because we are storing the function as a _function expression_, we use the [arrow function](https://goo.gl/B3UgyF) syntax.
6. We define a readonly property called `order` that will return a description of the drink order.

After the _constructor_ is defined, we use this to create various coffee orders by passing different parameters to the _constructor_.

Run the script to see what it produces.

Notice that when we print one of our coffee objects we can access the local `this` object meaning everything is _public_. This is not recommended and the next section describes how we can hide some of this.

### 3.1 Test Your Knowledge

1. Modify the `.getsize()` property, replacing the `switch` with an `if...else` block.
2. Now modify the `if...else` such that:
    - sizes up to 8 should be considered _small_.
    - sizes between 9 and 12 should be _medium_.
    - any size over 12 should be _large_.
3. Add a third optional parameter called `shots` to allow the customer to specify additional coffee shots. The default value should be `0`.
    - In the `order` property modify the message to include the number of additional shots.
    - Modify the message so that the coffee is labelled as `strong` if there are 2 or more additional shots.

## 4 Data Encapsulation

The problem with the last example was that all the data was public. This is because it was assigned to the `this` object which has visibility outside the function scope. To solve this we take advantage of the scoping of JavaScript functions using a special construct called a **closure**.

### 4.1 Closures

Open the `betterCoffee.js` file which fixes this. Compare the code to the previous version and note:

We have moved the data we want to hide into a block scoped variable called `privateData`, this prevents it being seen outside the function object.
```javascript
const privateData = {}

privateData.size = {
	small: 8,
	medium: 12,
	large: 16
}
```
The `getSize()` method is not needed outside the function object and so it is defined locally.
```javascript
function getSize() {
	if (this.ounces === this.size.small) {
		return 'small'
	} else if (this.ounces === this.size.medium) {
		return 'medium'
	} else if (this.ounces === this.size.large) {
		return 'large'
	}
}
```
The `order` property needs to be visible outside the function object. The only way to make it visible is to _return_ it using the `return` statement. By returning an object you can return many different methods.

### 4.2 Immediately Invoked Function Expressions

Remember that we can assign a function to a variable (a _function expression_), all expressions return a value which, in the case of a function expression, is the function itself. Also remember that we can _invoke_ a function by appending a pair pf parenthesis `()`.

Open the `counter.js` file and see if you can understand what is happening. The purpose of an IIFE is to obtain data privacy. 

### 4.1 Test Your Knowledge

TODO


## 5 Prototypal Inheritance

JavaScript does not natively support classes, everything except primitives are objects. ECMAScript 6 introduces OOP behaviour using [classes](https://goo.gl/wlnyoX) however behind the scenes this is just a thin syntactical rapper around a concept called [prototypal inheritance](https://goo.gl/VzlliV), a topic we will be covering in this section.

As you already know, an object in JavaScript is a collection of key-value pairs. Each type of object (Strings, Arrays, etc.) has its own **prototype** which is an internal object from which any objects of that type share properties. What this means is that any objects inherit all the properties of the appropriate prototype object.

All built-in object types have their own prototype objects but so do any new objects that you define.


### 5.1 Extending Built-In Objects

Each built-in object type has its own prototype object. This can be modified and any changes will affect any instance of that object.

Locate the `prototypes/` directory and open the file `palindrome.js`.

1. Note how this module exports a single anonymous function.
2. An anonymous function is declared and exported. For the shorter [arrow function](https://goo.gl/JuCltQ) syntax see the link.
3. **this** refers to the string that the prototype is called on.
4. The function contains a loop that starts at each end of the string and compares the characters working inwards.
5. If at any point these don't match, the function returns false.
6. Notice that there is a block of code commented out which achieves the same result in 2 lines of code.
7. Can you understand how this works?

Now open the `index.js` file in the same directory.

1. Run this script to view the output.
2. The first line of code imports our module (the anonymous function) and assigns this to the String prototype.
3. Next we create an array of the strings we want to test.
4. JavaScript Array objects are iterable which means we can use a [for-of](https://goo.gl/bcR50H) loop to iterate through the indexes.
5. The String.prototype.palindrome() function returns either true or false, we can then display the correct message.
6. Notice that there is a block of code commented out which achieves the same result in 2 lines of code using the [conditional operator](https://goo.gl/Cuvpo6).
7. Can you understand how this works?

### 5.2 Test Your Knowledge

1. Create a new file called `capitalise.js`.
2. Export a function that capitalises the _first letter_ of the string
3. Add a `capitalise` property to the String prototype.
4. Modify the test script in `index.js` to loop through the array of strings, capitalising the first letter of each.
5. Modify the prototype function to capitalise the first letter of _each word_.

### 5.3 Extending Custom Objects

Any functions you create will also have their own `prototype` object. This allows you to change the behaviour of all instances of the object.

Locate the `dog/` directory and open the file `dog.js`.

1. At the top of the script we define a `Dog()` function object that takes three parameters. Any values passed in the parameters are stored in the `this` object.
2. Next we modify the `Dog` function object, adding additional functionality through its prototype object.
3. Finally our module exports the `Dog` function object.

Now open the `index.js` file in the same directory.

1. we start by importing the Dog function object.
2. Next we use the `new` keyword to create instances of our object, these will share the same `prototype` object.
3. The `spot` function object _overides_ the `bark()` method in the prototype.

### 5.4 Test Your Knowledge

1. Add a new property to the prototype called `trained`. This should be added to the `Dog()` function object at the top as a fourth parameter with a [default](https://goo.gl/0uUwuS) value of `true`.
2. Modify the `sit()` prototype function so that the dog only sits if `trained` is `true`.


## 6 Classes

The latest version of JavaScript introduces the concept of [classes](https://goo.gl/23Fc3f) in the traditional OOP sense. Behind the scenes however this is simply a lightweight syntax over the existing prototype-based inheritance. In JavaScript, classes are special functions and comprise two distinct components, [class expressions](https://goo.gl/xv21eC) and [class declarations](https://goo.gl/c5N2Mm).

### 6.1 Class Declarations

Open the `classes/` directory and study the files it contains.

1. The `person.js` file contains a _class declaration_. 
    1. the class is declared using the `class` keyword followed by the name of the class (its customary to start class names with an upper-case letter).
    2. this class is _exported_ by the module by assigning it to `module.exports`, which means it can be used in other scripts.
    3. each class can have one and only one constructor.
    4. this constructor takes two parameters.
    5. each parameter is added to the `this` object which is private to the class and contains the private instance variables.
2. The `personTest.js` file contains a simple script, run it and watch the console output.
    1. the module containing the class declaration is imported and stored in a [constant](https://goo.gl/BQBhEU).
    2. the code is wrapped in a try-catch block to handle any thrown exceptions
    3. the class is used to create a new Person object (called `person`)
    4. two parameters are passed to the constructor.
    5. the `name` getter is called which computes the person's full name and returns it.
    6. the `lastName` setter is called which updates the private instance variable.
    7. finally the object is printed, this returns a JSON object containing the values stored in `this`.
    8. the second object `badPerson` misses the second parameter from the constructor, notice that an exception is thrown.

### 6.2 Test Your Knowledge

1. Modify the class declaration
    1. Modify the constructor to take a third parameter called `dob`. This should accept a JavaScript [Date()](https://goo.gl/yjKCoK) object, this needs to be stored in a private instance variable called `dob`.
    2. Modify the constructor to throw an exception if the third parameter is missing.
    2. Add a new _getter_ to return the person's age in _years_.
    3. Test this functionality by modifying the test script `personTest.js`. Create a new `Date()` object representing your date of birth and pass it to the constructor.
    4. Use your new _getter_ to print out the person's age.

### 6.3 Class Inheritance

Open the `employee.js` file and read through the code.

1. The **Employee** class subclasses the **Person** class:
    1. The module containing the _Person_ class needs to be imported at the top of our script.
    2. The `extends` keyword indicates that the _Employee_ class subclasses the _Person_ class.
2. The third parameter passed to the constructor is a [default parameter](https://goo.gl/SJL4tS) which means that if it is not specified, it is initialised with a default value.
3. The _constructor_ uses the `super()` keyword to call the constructor of its _superclass_, passing the appropriate parameters.
4. There is a method defined to calculate the salary.
    1. There is a single _default parameter_ to determine the number of months salary to calculate.
    2. The calculation uses the salary grade passed to the constructor to calculate the result.

Open the `employeeTest.js` file. This script is used to test our new class.

1. Notice that we don't pass the `grade` parameter when we create the `employee` object, this assigns the default grade of 1.
2. When we create the `manager` object we pass a value for the grade parameter.
3. When we call the `calculateSalary()` method for the `employee` object we don't pass a parameter so the default value is used.
4. When we call the `calculateSalary()` method for the `manager` object we pass a parameter.

### 6.4 Test Your Knowledge

Try running the `employeeTest.js` script, notice that this doesn't work as expected, can you see why?

1. In the previous section you changed the Person constructor, this change needs to be applied to the **Employee** constructor. Do this now then check to see it works correctly.
2. Create a new subclass of `Person` called `Passenger` in a new file called `passenger.js`
3. Create an optional parameter in the constructor called `airMiles` with a default value of `0`
4. Create a method called `addAirMiles()`, this should take an integer and add this to the current miles.
5. Create a getter that returns the current number of air miles. 

----

## Introspection

Using the `Reflect` object.