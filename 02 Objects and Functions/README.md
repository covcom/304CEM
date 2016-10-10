
# Classes and Objects

## 1 The Function Object

In JavaScript every function is actually a [function object](https://goo.gl/jjyhZM). Because of this we can use the [new operator](https://goo.gl/gKwCCH) to create instances of them.

Open the `coffee/` directory and locate the `coffee.js` file. Lets understand how it works.

1. The `coffee.js` file contains a module that exports a single _function object_. Notice that we can't use an [arrow function](https://goo.gl/B3UgyF) for this because it does not bind its own `this` value.
2. The function takes two parameters although the second one is a [default parameter](https://goo.gl/SJL4tS).
3. Because we will be invoking the function as a constructor, the `this` object is bound to the returned object, this means that we will be able to access all its properties in our created object.
4. We store the two parameters as properties of the `this` object.
5. We also store our two functions in the `this` object which means we can call these once we have an instance of our enclosing function. Because we don't want to bind `this` to these functions we use the [arrow function](https://goo.gl/B3UgyF) syntax.

Open the `index.js` file, also located in the `coffee/` folder to see the function object in action. Run this file to see any changes you have made to the `coffee.js` file with `node index.js`.

For future reference, if there is ever an `index.js` file in the folder, this is what should be run to test the code.

### 1.1 Test Your Knowledge

1. Modify the `.getsize()` property, replacing the `if...else` block of code with a [switch statement](https://goo.gl/x7mM3f)
2. Now modify the switch satement back to an `if...else` one such that:
    - sizes up to 8 should be considered _small_.
    - sizes between 9 and 12 should be _medium_.
    - any size over 12 should be _large_.
3. Add a third optional parameter called `shots` to allow the customer to specify additional coffee shots. The default value should be `0`.
    - In the `order()` property modify the message to include the number of additional shots.
    - Modify the message so that the coffee is labelled as `strong` if there are 2 or more additional shots.

## 2 Prototypal Inheritance

JavaScript does not natively support classes, everything except primitives are objects. ECMAScript 6 introduces OOP behaviour using [classes](https://goo.gl/wlnyoX) however behind the scenes this is just a thin syntactical rapper around a concept called [prototypal inheritance](https://goo.gl/VzlliV), a topic we will be covering in this section.

As you already know, an object in JavaScript is a collection of key-value pairs. Each type of object (Strings, Arrays, etc.) has its own **prototype** which is an internal object from which any objects of that type share properties. What this means is that any objects inherit all the properties of the appropriate prototype object.

All built-in object types have their own prototype objects but so do any new objects that you define.

### 2.1 Extending Built-In Objects

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

#### 2.1.1 Test Your Knowledge

1. Create a new file called `capitalise.js`.
2. Export a function that capitalises the _first letter_ of the string
3. Add a `capitalise` property to the String prototype.
4. Modify the test script in `index.js` to loop through the array of strings, capitalising the first letter of each.
5. Modify the prototype function to capitalise the first letter of _each word_.

### 2.2 Extending Custom Objects

Any functions you create will also have their own `prototype` object. This allows you to change the behaviour of all instances of the object.

Locate the `dog/` directory and open the file `dog.js`.

1. At the top of the script we define a `Dog()` function object that takes three parameters. Any values passed in the parameters are stored in the `this` object.
2. Next we modify the `Dog` function object, adding additional functionality through its prototype object.
3. Finally our module exports the `Dog` function object.

Now open the `index.js` file in the same directory.

1. we start by importing the Dog function object.
2. Next we use the `new` keyword to create instances of our object, these will share the same `prototype` object.
3. The `spot` function object _overides_ the `bark()` method in the prototype.

### 2.2.1 Test Your Knowledge

1. Add a new property to the prototype called `trained`. This should be added to the `Dog()` function object at the top as a fourth parameter with a [default](https://goo.gl/0uUwuS) value of `true`.
2. Modify the `sit()` prototype function so that the dog only sits if `trained` is `true`.

## 3 ECMAScript 6 Classes

The latest version of JavaScript introduces the concept of [classes](https://goo.gl/23Fc3f) in the traditional OOP sense. Behind the scenes however this is simply a lightweight syntax over the existing prototype-based inheritance. In JavaScript, classes are special functions and comprise two distinct components, [class expressions](https://goo.gl/xv21eC) and [class declarations](https://goo.gl/c5N2Mm).

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
    1. Modify the constructor to take a third parameter called `dob`. This should accept a JavaScript [Date()](https://goo.gl/yjKCoK) object, this needs to be stored in a private instance variable called `dob`.
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

# Extension Activity

You should be already thinking of the theme of your assignment. Once you have an idea, createe the following based on this:

1. An extended function object.
2. An ECMA6Script Class using inheritance.
