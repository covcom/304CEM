
# Objects and Functions

Arrow functions (anon)
Default parameters
Destructuring assignment
Rest parameter
Classes
template strings (use backticks)..

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

## 5 Exception Handling

When JavaScript executes code errors and exceptions may occur. These may be due to incorrect user input or a broken network connection for example. JavaScript includes a rich set of tools for handling these, based on the [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object.

1. Errors are serious problems that normally mean the application will terminate
2. Exceptions on the other hand are problems that can be handled by the program logic and thus prevent the application from terminating. In this task we will be focussing on _exception handling_.

Open the `contact.js` script and study it carefully, as before, the code includes detailed comments to explain how it works.

1. All code that could throw an exception _must_ be in a `try{}` block.
2. If an exception is _thrown_ the execution moves to the `catch{}` block.
  - the error object thrown will be passed as the parameter.
  - the error object contains three properties: the name of the error, the message passed and the stack trace.
  - the _stack trace_ is a list of the method calls that the application was in the middle of when an Exception was thrown and can help identify some of the more insidious errors. You should learn to read and understand what information it contains.

### 3.1 Test Your Knowledge

Implement the `validateScore()` function and thoroughly test it:

1. Check that the string is at least 5 character long
2. Check that there is a `@` character and that it is not at the start of the string (HINT: use the [indexOf](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) String prototype method.
3. Check that there is a period (.) character after the `@` character but before the end of the string.
