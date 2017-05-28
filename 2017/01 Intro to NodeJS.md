
# Introduction to NodeJS

In this chapter we will begin learning about programming in NodeJS. Note that we will only be covering the parts of the language that relate directly to building our APIs, there are lots of books that cover the language in more depth.

NodeJS is based on the JavaScript language which is used extensively in the browser to handle such tasks as form validation and animations. The latest version of the language (known as ECMA6) is not fully supported by the different browsers and, as a result, it is not recommended that you use the more up to date features.

NodeJS is built on Chrome's V8 JavaScript engine which powers the latest version of the Chrome web browser and supports the majority of the latest ECMA6 features. It has been modified to allow it to run on a server.

Because our scripts will run on the server on which we have installed a known version of the ECMA6 runtime, we can guarantee that our scripts will run correctly which means we can focus on teaching the absolute latest programming concepts and features.

## 1 Benefits of NodeJS

There are a lot of languages that can be used to write server-side script ranging from **Perl**, one of the earliest _CGI Script_ languages through **PHP**, one of most popular languages and through to **Java** and **C#**. So why is NodeJS becoming so popular in recent years (and why have I chosen it for this book?

The first, and most obvious answer, is that, as a web developer, you are going to have to learn JavaScript anyway because its the only language that will run natively in a web browser so why not use the same language for both client and server?

The second benefit, and one we will return to in chapter 3, is that, unlike other scripting languages which create a new _process_ for each connected user, NodeJS runs a single process shared between _all_ users. Since processes are expensive in computing resources it means that a NodeJS deployment is far more scalable. In chapter 3 we will learn how it handles concurrency through the use of threads.

It is assumed that you can already program in a modern language such as Python or Java and have had exposure to 'old school' JavaScript. This chapter will therefore expose you to some of key new features of the language and their impact on the way you program.

Make sure you have cloned the repository containing the sample code by following the instructions in the previous chapter.

## 1 Node Packages

NodeJS can be extended through the use of **packages** and these are installed using the **Node Package Manager**. This was installed when we installed Node.
```
$ npm -v
  4.2.10
```

One of the most valuable features of NodeJS is its package manager which allows you to install additional functionality in the form of _packages_. There are thousands of these to choose from and, in a later chapter, you will be shown how you can publish your own packages.

In the examples in this chapter we will be using a _node package_ called `readline-sync` to capture user input. The documentation for all published packages can be found on https://www.npmjs.com so open this page and search for the documentation for `readline-sync`.

### 1.1 Installing Packages

Packages can be installed either locally or globally.

- Local packages are installed in a `node_modules/` directory within the directory containing the NodeJS scripts. This is the way we install most of the modules. These are only available within that directory.
- Global packages on the other hand are installed system-wide and can be accessed by all the scripts. Normally these need to be installed using root privileges. We will be using global packages in a later chapter.

Open the Terminal and navigate to the `nodejs/` directory containing the sample code. If you are using _Visual Studio Code_ you can use `File > Open` to open the `nodejs/` directory then open the **Integrated Terminal**, accessed from the **View** menu, this will automatically open in the project root.

Navigate to the `01\ Introduction\ to\ NodeJS/` directory and then install the package.
```
npm install readline-sync
```
This will create a new directory called `node_modules/` which will contains the scripts from the `readline-sync/` package plus any dependencies.

### 1.2 Listing and Uninstalling Packages

There are two ways to see what packages are currently installed. The quickest is to locate the `node_modules/` directory. Alternatively you can use the `npm ls` subcommand which will print this information to the shell.
```
$ npm ls
/Users/.../01 Introduction to ECMAScript 6
└── readline-sync@1.4.7
```

To uninstall a _local_ package you can use the `npm uninstall` subcommand and pass it the name of the package you want to uninstall, this will uninstall both the named package and any dependencies installed by it.
```
npm uninstall readline-sync
```

<<<<<<< HEAD
#### 1.3 Useful Modules

Although there are a lot of modules available through the package manager you will only need a few of these to complete the exercises in this book.

- Request: an HTTP client written in JavaScript, for accessing web resources such as APIs
- Simple-Storage: a wrapper to store data in the filesystem
- Mongoose: a MongoDB object modeling tool.
- FS: a module giving direct access to the host file system, for reading and writing files
- Sentiment: a module that uses the AFINN-165 wordlist and Emoji Sentiment Ranking to perform sentiment analysis on arbitrary blocks of input text.

## 2 Variables and Scope
=======
## 2 Basics of Javascript

Now we have learned some theory it's time to see this in practice.

Its time to dive into our first example to see the workings of JavaScript in practice. This first example covers a number of important concepts and will show you the key JavaScript syntax. Specifically it covers:

1. Variables and scope
2. Strict mode
3. Importing packages and modules
4. Conditionals and loops
5. Strings
6. Arrays

Load up the `todo.js` script and reference it as you read through the rest of this section.

### 2.1 Variables and Scope
>>>>>>> 5a2aaad6b13503d4560dd235fcbb07b315b6d934

If you have ever worked with JavaScript you will have declared variables with the `var` keyword. This creates a _hoisted function-scoped_ variable which has several issues:

- The variable is _function-scoped_ meaning that it is only visible inside the enclosing _function_. This means that if you want to hide this from the rest of your code (considered good practice) you need to keep it inside a function which is tricky to implement.
- The variable is also _hoisted_ which means that it can be accessed before the line on which it is declared! Effectively all variable declarations are moved to the top of the function block. This can have some nasty side effects.

Until the release of ECMA6, programmers in JavaScript have had to work with these issues but the release of ECMA6 provided two more options and the use of `var` is now deprecated and should no longer be used.

#### 2.1.1 Block-Level Variables

Now we can declare _block-level_ variables using the [let](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let) keyword. These behave much like variables in other languages such as Python or Java in that they are only visible in the block they are declared in (such as a loop or branch).

#### 2.1.2 Block-Level Constants

Until ECMA6, you could not declare _immutable variables_ (otherwise known as constants). ECMA introduced the [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) keyword that can be used to declare block-level constants.


### 2.2 Strict Mode

Notice the first line contains a **Directive**. This is a feature from ECMA5 telling the JavaScript runtime to run the script in [strict mode](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Strict_mode).
```javascript
'use strict'
```
This:

- Prevents the declaration of global variables.
- Exceptions are thrown rather than the script fail silently.
- Prevents duplicate property and parameter names (more on this later).

For the above reasone

Use the **terminal** to run the script by entering ` node todo.js`. Once running you can use the `add` command to add new items to the list and the `list` command to print out the list items. The final command will terminate the application.

### 2.3 Importing a Package or Module

Since we will be using the functionality in the `readline-sync` package it needs to be imported using the `require` function.
```javascript
const readline = require('readline-sync')
```
This can be used to import an installed package (as we are doing here) but can also be used to import other scripts we have created locally (this is covered in a later chapter).

### 2.4 Conditionals and Loops

Javascript supports a range of branching and looping constructs. They all follow a similar syntax to Java and C++.

#### 2.4.1 Conditionals

JavaScript includes the standard set of conditionals (if, if...else and switch) and the syntax is similar to other modern programming languages. The `todo.js` script makes use of a number of `if` statements to identify which option the user has entered, for example:
```javascript
if (input.indexOf('list') === 0) {
  // the user has chosen the 'list' command.
}
```
Later in this chapter you will be required to implement a `switch` conditional. These share the same syntax as most modern languages and require a `break` command to exit and take an optional `default` clause.
```javascript
const name = String(readline.question('your name: ')).trim()
switch(name) {
  case 'John':
    console.log('your name is John')
    break
  case 'Jane':
    console.log('your name is Jane')
    break
  default:
    console.log('unknown name')
}
```

#### 2.4.2 Loops

Javascript also supports a wide number of loop constructs:

- for
- while...do
- do while

In the `todo.js` script you can see the run-loop has been implemented using a do...while loop.
```javascript
do {
  // this is the run loop
} while (input !== 'exit')
```
It also uses a traditional for loop with loop variable using a syntax similar to C++ and Java. It uses the Array `length` property to iterate through it.
```javascript
for (let i=0; i< items.length; i++) {
      /* Here we reference the array index. */
			console.log(`${i}. ${items[i]}`)
		}
```

### 2.5 Strings

In common with most other programming languages, JavaScript supports strings.

#### 2.5.1 Strings as Objects

In JavaScript, all strings are objects and have a number of useful methods. In the `todo.js` example there is a line:
```javascript
const input = String(readline.question('enter command: ')).trim()
```
1.  The `String()` function takes the expression entered by the user and turns it into a `String object`
2. we remove any whitespace from the beginning and end of the user-entered string by calling the `trim()` method which is part of the String object.

Later in the script we use another method `indexOf()` which returns the index of the first instance of the string parameter. This is used in an `if` statement to see what is at the start of the string.
```javascript
if (input.indexOf('add ') === 0) {
  // the string starts with 'add '
}
```
Notice the use of `===` rather then the standard `==` [equality operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Equality_comparisons_and_sameness). JavaScript supports both but they work in slightly different ways:

- `===` is used for **Strict Equality Comparison** where the result is only `true` if both the value and data types match. This is the preferred choice in **all** situations.
- `==` is used for **Abstract Equality Comparison** and works by automatically converting both values to a common type. This can lead to obscure bugs and so should be avoided.

The script uses a second `if` statement locate the index of the first space in a string to allow it to be split into two. The `substring()` method takes a parameter and returns the string after the supplied index. We need to use `trim()` to remove the space from the start.
```javascript
const space = input.indexOf(' ')
const item = input.substring(space).trim()
```

It's worth taking a few moments to learn about some of the useful [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) methods.

#### 2.5.2 String Concatenation

There are two ways to concatenate (join) strings. Prior to ECMA6 the `+` operator was used to join string literals and string variables.
```javascript
const name = 'John Doe'
console.log('my name is '+ name)
```
ECMA6 introduces the concept of [template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals) which are string literals allowing embedded expressions. The string literal needs to be encased in backticks rather than quotes and the variables enclosed in `${}`. The previous example would look line this.
```javascript
const name = 'John Doe'
console.log(`my name is ${name}`)
```
By using _template literals_ your strings become much easier to read and so you should get into the habit of always using these.

### 2.6 Arrays

Our `todo.js` script declares an array near the start to hold the items in our todo list. Notice that the array is declared as _immutable_ using the `const` keyword.

```javascript
const items = []
```
Arrays are _objects_ and have a number of built-in methods. Later in the script we use the built-in `push()` method to add an element to the end of the array. You should take a moment to look through the list of built-in [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) methods and familiarise yourself with them.
```javascript
items.push(item)
```

### 2.7 Running a NodeJS Script

Now you have an understanding of the code features used in the script it is time to run it. Unlike client-side JavaScript, you don't run NodeJS scripts in a web browser, instead you need to run them using the **Terminal**.

To run your script you need to run the `node` command and pass it the name of your script. You don't need to pass the file extension, so these commands are equivalent:
```
node todo
node todo.js
```
When the script is running you will be prompted to enter a command. Try adding three items and listing them all. Finally typing exit to return to the shell prompt:
```
enter command: add bread
adding "bread"
enter command: add butter
adding "butter"
enter command: add cheese
adding "cheese"
list
0. bread
1. butter
3. cheese
exit
```

#### 2.4.1 Executing NodeJS Files

There is an alternative way to execute a NodeJS script which works on Linux systems. it works because we have a _shebang_, otherwise known as a **processor directive** as the first line of our script. This tells the operating system where to find the command to run the script.
```
#!/usr/bin/env node
```
This tells the operating system to use the node command that appears in the environment path variable. You will also need to set the execute flag on the file.
```
chmod +x todo.js
./todo.js
```
The last line above tells the OS to run the `todo.js` file in the current directory.


### 2.8 Test Your Knowledge

Now you are familiar with the basics of the ECMA6 language its time to put this to the test. Make sure you successfully complete all six tasks before continuing to the next section.

1. locate the `input` variable declaration (just inside the `do` loop)
  - define it as a block-scoped variable by replacing the `var` with `let`, what effect does this have?
  - modify the script so that it still works (keep the `let` variable declaration). Hint: think about the variable _scope_, you will need to move the variable declaration.
  - substitute a constant by substituting `const` for `let`, what effect does this have?

2. the array at the top of the script is defined using `var`. What happens if you make this immutable (use `const`)?
3. Items are added to the array using its `push()` method.
  - substute the [unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) method. How does this change the script?
4. modify the code to prevent duplicate items being added. You will need to use the [`Array.indexOf()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) method.
5. create a **remove** option so an item such as *cheese* can be removed using the syntax `remove cheese`. You may need to use the [`Array.splice()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) method.
6. The current version is case sensitive. Modify the code so that items are converted to lowercase before being added or searched for. You will need to use the [`String.toLowerCase()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) method.

## 3 Data Types

JavaScript is a _loosely typed_ language which means you don't declare a data type, it will be automatically determined when a value is assigned. This is sometime referred to as _duck typing_. There are six primitive data types that you should be familiar with, these are:

- `Number`: This is used to represent both floating point and integer values.
- `String`: This is used to represent textual data and consists of a set of 16 bit elements with each element occupying a position referenced by an index, with the first character at index 0.
- `Boolean`: This represents a boolean state and can have only two possible values, `true` or `false`.
- `Null`: This represents the intentional absence of a value. It can contain only one value, `null`.
- `Undefined`: This represents a variable that has not been assigned a value.
- `Symbol`: This is a token representing a unique ID and are created using the `symbol()` function. They are new in ECMA6.

## 3 Modular Code

By now you have learned and practiced the basics of the JavaScript language. In this section you will extend your knowledge and understanding by working with a more complex script that will extend your existing knowledge. In this section you will cover:

1. Errors and exceptions
2. Declaring and calling functions
3. Introspection and data types
4. Working with Numbers
4. Documenting your code

Open the `contact.js` script and study it as you cover the following sections.

### 3.1 Errors and Exceptions

When JavaScript executes code errors and exceptions may occur. These may be due to incorrect user input or a broken network connection for example. JavaScript includes a rich set of tools for handling these, based on the [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object.

1. Errors are serious problems that normally mean the application will terminate
2. Exceptions on the other hand are problems that can be handled by the program logic and thus prevent the application from terminating. In this task we will be focussing on _exception handling_.

No matter how good we are at programming, our scripts will contain errors. In JavaScript when an unrecoverable error occurs in your code it throws an **Exception**. If this is not caught and handled by your script it will terminate the execution of the script and print the error to the console. Obviously this is a bad outcome and to prevent it we can _catch_ the error and handle it gracefully without causing the program to crash.

#### 3.1.1 Handling Errors

To help catch any errors, JavaScript uses the `try-catch-finally` statement. The syntax is very similar to other modern language and looks like this:
```javascript
try {
  // this line of code might throw an error
} catch(err) {
  // if an error occurs the execution jumps to this block
  // if no error occurs the block is ignored
} finally {
  // this line runs whether or not an error was thrown
  // this block is optional
}
```

1. All code that could throw an exception _must_ be in a `try{}` block.
2. If an exception is _thrown_ the execution moves to the `catch{}` block.
  - the error object thrown will be passed as the parameter.

#### 3.1.2 The Error Object

When an error gets thrown it passes an Error object which contains three properties:
- the name of the error
- the message passed
- the stack trace.
  - the _stack trace_ is a list of the method calls that the application was in the middle of when an Exception was thrown and can help identify some of the more insidious errors. You should learn to read and understand what information it contains.

## 4 Passing Parameters on the Command Line

You have probably seen some commands that take startup parameters. Each time you run a script, everything you type at the shell is made available through the process object which contains an `argv` array.

This is useful since it means we can pass extra data to a script when we invoke it from the shell. We will be using this feature to pass in a sentence and measure its sentiment (positive or negative).

Open the script `sentiment.js` and make sure you understand how it works.

Try running the script without any extra parameters.
```
$ node sentiment
  [ '/Users/.../bin/node',
    '/Users/.../sentiment.js' ]
  missing parameters
```
Notice that it prints out an array which contains two indexes corresponding to the _node command_ and the script name (sentiment.js). There is also a message that there are missing parameters. Where is this message coming from?
```javascript
const minParam = 3
console.log(process.argv)
if (process.argv.length < minParam) {
  throw new Error('missing parameters')
}
```
In the code above you can see that the array printed to the shell is the contents of `process.argv`. The error was because the script expected an array of at least 3 indexes.

Now let's run the command and pass it a sentence.
```
node sentiment happy to meet you
$ node sentiment happy to meet you again
  [ '/Users/.../bin/node',
    '/Users/.../sentiment',
    'happy',
    'to',
    'meet',
    'you',
    'again' ]
  happy to meet you again
  { score: 3,
    comparative: 0.6,
    tokens: [ 'happy', 'to', 'meet', 'you', 'again' ],
    words: [ 'happy' ],
    positive: [ 'happy' ],
    negative: []
  }
```
So what's happened here? Well now the `process.argv` array contains the additional words we typed. because there were more than 2 indexes the error is not thrown.

Now we have some words to process we need to combine them into a single string.
```javascript
const words = process.argv.slice(minParam-1).join(' ')
console.log(words)
```
The built-in  `Array.slice()` method returns the section of array between the specified index and the end of the array. The `join()` method converts an array into a string using the parameter as separator. It is standard practice when programming in JavaScript to use _method chaining_ whereby several methods are called on the same data.

The final step is to pass this string to the sentiment tool which returns the sentiment of the sentence.

## 5 Functions

In JavaScript, as in most other languages, code can be divided in to modular blocks called functions. Once defined, these can be called from other code. Data can be passed in the form of parameters and functions can return data back to the calling code.

Open the `maths.js` file. Notice that this contains several functions. Each is called directly under its definition.

### 5.1 Function Syntax

Lets start with a simple example.
```javascript
function largestNumber(a, b) {
  if (a > b) return a
  if (b > a) return b
  return null
}

const biggest = largestNumber(5, 8)
```
1. The function is declared using the `function` keyword and the function is given a name which must be a valid variable name.
    a. If the name comprises more than one word these should be written using camel casing as shown above.
2. The function above takes two parameters, `a` and `b`.
    - These are variables with local scope (they can't ba accessed outside the function)
    - When the function is called, you need to pass two **values** which get assigned to the two parameters.
    - If you pass too many values the extra ones get _ignored_.
    - If you don't pass enough values the remainder are assigned a value of `null`. `Null` is an assignment value (means a value of no value).
3. The function returns a value.
  a. If the numbers are not the same it returns the largest.
  b. If they are the same it returns `null`.

### 5.2 The Spread Operator

If the data you want to pass to a function is stored in an `Array` (this is quite common), you could extract each value and assign to the function like this:
```javascript
const nums = [5, 8]
const biggest2 = largestNumber(nums[0], nums[1])
```
Because this is such a common task, there is a shortcut called the **spread operator**. Using this, the same task can be expressed like this.
```javascript
const nums = [5, 8]
const biggest2 = largestNumber(...nums)
```
Notice the syntax of the _spread operator_.

### 5.3 The Arguments Object

When a function is declared it has a **signature** which defines the number of parameters it is expecting, for example in the `largestNumber()` function, the signature defines two arguments.
```javascript
function largestNumber(a, b) { // this is the function signature.
  // function body
}
```
What happens if you try to call this with the _wrong_ number of arguments?

- If you supply too few arguments the remaining parameters are assigned a data type and value of `null`.
- If you supply too many arguments, the remaining ones are not assigned to the parameters, so where are they?

Every JavaScript function has an object called `Arguments` which contains all the parameters passed to that function, even ones no assigned to the formal parameters. This provides a mechanism to access arguments that don't get assigned to parameters. Lets take a look at the `add()` function.
```javascript
function add() {
	let total = 0
	console.log(arguments)
	console.log(arguments['1'])
	for(const arg of arguments) {
		total += arg
	}
	return total
}
```
As you can see, the function signature defines no parameters, but when we call it we pass 4 arguments. What happens to these and how can we access them?
```javascript
const addNums = add(1, 2, 3, 4)
```
Inside the function we can access the `arguments` object. The `add()` function shows three ways to do this (we will be covering objects in detail in the next chapter):

- display all the arguments (see below).
- access individual arguments by referencing a key.
- Use a `for...of` loop to iterate through the values.

### 5.4 The Rest Parameter
Whilst the `arguments` object provides a mechanism for accessing the function arguments, it returns an Object (the keys are `Strings`). It would be better if

- the arguments could be accessed in an `Array`.
- it ignored arguments already assigned to parameters.

ECMA6 introduced a special parameter called a _rest parameter_ which captures all the arguments that have not been assigned to parameters and stores them in an array. Look at the `add2()` function.
```javascript
function add2(...values) {
	let total = 0
	console.log(values)
  console.log(values[1])
	for (let i=0; i<values.length; i++) {
		total += values[i]
	}
	return total
}
```
The `...values` parameter has a `...` prefix which defines it as a _rest parameter_. In the body of the function it can be seen that this is an `Array` and so each argument has a numerical index. This is the preferred way to handle arguments that are not assigned to parameters.

### 5.5 Default Parameters

As explained above, if you don't supply enough arguments for the parameters in the function signature, all the parameters without arguments are assigned a value of `null`. This means you have to add code within the function to check that there is a value assigned to the parameters before you can safely use them. ECMA6 has introduced **default parameters**. These allow you to assign a default value to a parameter if one is not supplied by when the function is called. Lets examine the `divide()` function.
```javascript
function divide(dividend, divisor=1) {
	const quotient = dividend / divisor
	return quotient
}
```
Notice that the divisor has been assigned a value in the function signature. If this parameter is not assigned an argument, it defaults to this value.

### 5.6 Function Expressions

Functions are a data type in JavaScript (they are objects but more on that in the next chapter). As such they can be stored in variables for later execution. Prior to ECMA6 they were declared using the `function` keyword like this:
```javascript
const remainder = function(dividend, divisor) {
	const quotient = Math.floor(dividend / divisor)
	return dividend - quotient
}
```
To execute the function you simply reference the variable and append `()`.
```javascript
const rem = remainder(8, 5)
```

ECMA6 introduced a better way to handle function expressions, called an **arrow function expression**. This has a much shorter (and cleaner) syntax. Here is the same function expression written using this new syntax, make a careful note of the differences.
```javascript
const remainder2 = (dividend, divisor) => {
	const quotient = Math.floor(dividend / divisor)
	return dividend - quotient
}
```
The _arrow function expression_ has a number of important features:

1. It does not have its own function scope which means it does not bind its own `this` object (made clearer later).
2. In a concise body (one line) it has an implicit return and you don't need to use block braces. This results in very concise code, see the example below).
3. If there is only a single parameter the parameter brackets can be omitted.

Here is an example that should make points 2 and 3 clearer.
```javascript
const sqr = num => num * num
```

### 5.7 Test Your Knowledge

Start by running the `maths.js` script and map the output it generates against the `console.log` statements in the script.

1. Create a new function called `multiply()` that takes two parameters, `a` and `b` and returns the _product_ of the two.
    - what happens if you call it with only a single parameter?
2. Modify the function so it uses a default parameter to multiply by 1 if the second parameter is missing.
    - What happens if you don't supply _any_ parameters?
    - Add a second default parameter to prevent this.
3. Write an _arrow function expression_ stored in a constant called `squareRoot` which calculates and returns the square root of the supplied number. You will need to use the `sqrt()` method which is part of the `Math` object.

### 3.4 Test Your Knowledge

Implement the `validateEmail()` function and thoroughly test it, you should avoid using regular expressions at this stage:

1. Check that the string is at least 5 character long
2. Check that there is a `@` character and that it is not at the start of the string (HINT: use the [indexOf](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) String prototype method.
3. Check that there is a period (.) character after the `@` character but before the end of the string.
