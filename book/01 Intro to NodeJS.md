
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

### 3.2 Functions

As with other programming languages, functions can be used to split the code into separate chunks. There is a lot more to functions and this will be covered in chapter 2.

### 3.3 Introspection


### 3.4 Numbers


### 3.5 Documentation


### 3.6 Test Your Knowledge

Implement the `validateEmail()` function and thoroughly test it, you should avoid using regular expressions at this stage:

1. Check that the string is at least 5 character long
2. Check that there is a `@` character and that it is not at the start of the string (HINT: use the [indexOf](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) String prototype method.
3. Check that there is a period (.) character after the `@` character but before the end of the string.
