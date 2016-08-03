
# Classes and Objects

## 1 The Function Object

In JavaScript every function is actually a [function object](https://goo.gl/jjyhZM). Because of this we can use the [new operator](https://goo.gl/gKwCCH) to create instances of them.

Open the `coffee/` directory and locate the `coffee.js` file. Lets understand how it works.

1. The `coffee.js` file contains a module that exports a single _function object_. Notice that we can't use an [arrow function](https://goo.gl/B3UgyF) for this because it does not bind its own `this` value.
2. The function takes two parameters although the second one is a [default parameter](https://goo.gl/SJL4tS).
3. Because we will be invoking the function as a constructor, the `this` object is bound to the returned object, this means that we will be able to access all its properties in our created object.
4. We store the two parameters as properties of the `this` object.
5. We also store our two functions in the `this` object which means we can call these once we have an instance of our enclosing function. Because we don't want to bind `this` to these functions we use the [arrow function](https://goo.gl/B3UgyF) syntax.

### 1.1 Test Your Knowledge



## 2 Prototypal Inheritance



## 3 ECMAScript 6 Classes

The latest version of JavaScript introduces the concept of [classes](https://goo.gl/23Fc3f) in the traditional OOP sense. Behind the scenes however this is simply a lightweight syntax over the existing prototype-based inheritance. In JavaScript, classes are special functions and comprise two distinct components, [class expressions](https://goo.gl/xv21eC) and (class declarations)[https://goo.gl/c5N2Mm].

### 3.1 Class Declarations

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

#### 3.1.1 Test Your Knowledge

1. Modify the class declaration
  1. Modify the constructor to take a third parameter called `dob`. This should accept a JavaScript [Date()(https://goo.gl/yjKCoK) object, this needs to be stored in a private instance variable called `dob`.
  2. Modify the constructor to throw an exception if the third parameter is missing.
  2. Add a new _getter_ to return the person's age in _years_.
  3. Test this functionality by modifying the test script `personTest.js`. Create a new `Date()` object representing your date of birth and pass it to the constructor.
  4. Use your new _getter_ to print out the person's age.

### 3.2 Class Inheritance

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

#### 3.2.1 Test Your Knowledge

Try running the `employeeTest.js` script, notice that this doesn't work as expected, can you see why?

1. In the previous section you changed the Person constructor, this change needs to be applied to the **Employee** constructor. Do this now then check to see it works correctly.
2. Create a new subclass of `Person` called `Passenger` in a new file called `passenger.js`
3. Create an optional parameter in the constructor called `airMiles` with a default value of `0`
4. Create a method called `addAirMiles()`, this should take an integer and add this to the current miles.
5. Create a getter that returns the current number of air miles. 

Arrow functions (anon)
Destructuring assignment
Rest parameter

## employee.js

creating objects

parsing and stringify

## js_classes.js

using New commands

functions as objects

## makeCar.js

creating car objects

## objectMethods.js

fiat car with properties and methods.

Object Prototypes

## extending_js_types.js

object prototypes

## prototype_inheritance.js
