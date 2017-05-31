

# Writing Robust Code

By now you have learned the core features of JavaScript as used by NodeJS and, in this chapter you will learn about some important features of NodeJS and some useful tools to make you a more productive programmer.

There is a slide deck https://goo.gl/XHBbMx to accompay this worksheet. Make sure you are familiar with its contents before proceeding.

In this chapter you will be covering:

1. Project metadata *
2. CommonJS modules *
3. Linters *
4. Debugging
5. Documentation *
6. Creating packages

Any section above marked with an asterix `*` should be considered essential knowledge.


## 1 Project Metadata

Every project has a range of _metadata_ associate with it. This includes basic information such as its name and author but also should include the package dependencies (the packages that should be installed). In NodeJS this information is stored in a special file called `package.json` which is located in the root directory of the project.

### 1.1 The Node Package Manager

Rather than manually creating the `package.json` file, it is created and maintained using the **Node Package Manager**. To create it you need to run `npm init` which will guide you through the process of creating the file by prompting you for key information.

### 1.2 Installing and Tracking Packages

Up to now you have been installing individual package dependencies such as `readline-sync` using the `npm` tool. Once you have a `package.json` file its important that these dependencies are recorded here. This is done by adding a special _flag_.

Packages are split into two different categories:

- Some packages are used by the running script. An example of this would be the `readline-sync` package.
- Some packages are used as part of the development process. An example of this would be the `jsdoc` package which we will use later to generate the documentation for our code.

It is important to keep track of both types of dependency. On our development computer we would want to install them all but on a live server we would only want the modules that are needed by the running script.

#### 1.2.1 Script Dependencies

To install a package needed by the script we use the `--save` flag when we install it using `npm`. This will add it to the `dependencies` object inside `package.json`.
```
npm install --save readline-sync
```
If we examine the `package.json` file we will see that it now contains a reference to `readline-sync`.
```json
{
  "name": "shopping",
  "version": "1.0.0",
  // additional data not shown
  "dependencies": {
    "readline-sync": "^1.2.22"
  }
}
```
To install all the packages listed in the `dependencies` object we can run.
```
npm install --production
```
If you have an environment variable `NODE_ENV=production` you don't need to use the `--production` flag and can install using.
```
npm install
```

#### 1.2.2 Developer Dependencies

Some packages are not used directly by the scripts but are used as part of the development process. An example of this is the `jsdoc` package which is used to extract and build documentation that is written in the _JSDoc_ syntax. The installation process uses a different flag.
```
npm install --save-dev jsdoc
```
This makes no difference to how the package is installed but adds the reference to a different object in `package.json` as shown below.

```json
{
  "name": "shopping",
  "version": "1.0.0",
  // additional data not shown
  "devDependencies": {
    "jsdoc": "^3.4.0"
  }
}
```
Normally, if you need the devDependencies you will also want the `dependencies` as well. To install all the packages we can run.
```
npm install
```

### 1.3 Global and Local Modules

Modules can either be installed _locally_ or _globally_ so what is the difference?

####1.3.1 Locally Installed Modules

If a module is installed locally it is installed using standard permissions in the `node_modules/` directory within the current directory. If there is a _binary executable_, it can be found in the `.bin/` directory. This is the recommended way to install packages and how we have been doing this until now.

You will see this approach used for the first time when we install and run our linter. Let's install the `eslint` package locally and run its binary from the terminal.
```
npm install eslint --save-dev
node_modules/.bin/eslint
```
Remember that the linter is used as a developer tool and not by the script itself so it needs to be added to the `devDependencies` object in `package.json`, this is done by specifying the `--save-dev` flag.

Also notice that the `eslint` binary is inside the `.bin/` directory which is inside the `node_modules/` directory. To run it we need to specify the relative path.

#### 1.3.2 Globally Installed Modules

There are some situations where you need to install a module globally, this is normally only done for packages with a _binary executable_ and needs to be done as `root`. The main benefit is that, once installed, a module can be called from any directory without needing to know the file path. The disadvantage is that these can't be automatically tracked and installed as part of the script dependencies (from `package.json`). It is not recommended this approach is used unless absolutely necessary.

### 1.4 Script Aliases

The last object to understand in `package.json` is the `scripts`. This is where we can define aliases for our scripts.
```json
"scripts": {
  "app": "node index.js",
  "lint": "node_modules/.bin/eslint modules/"
}
```
In the example above, the first alias, `app` is already defined and will execute the `index.js` script. The second one has been manually added and runs `eslint` on all the files in the `modules/` directory. To execute these you would type.
```
npm run app
npm run lint
```
As you can see, by using a script alias you can simplify how you call scripts, especially if there are a lot of flags and options.

### 1.5 Test Your Knowledge

1. modify the `package.json` file and change the version to 1.0.1
2. install the `request` module, making sure it is referenced in the `dependencies` object in your `package.json` file.
3. install the `jsdoc` module, making sure it is referenced in the `devDependencies` object and add an alias called `doc` set to `node_modules/.bin/jsdoc modules/`.
4. add a new script alias called `debug` and set its value to `node debug index.js`, you will be using this later in the worksheet.


## 2 CommonJS Modules

Up to this point you have written your scripts in single files. Whilst this keeps everything in one place there are a number of problems.

- Creates a huge file!
- Makes it difficult to find stuff.
- Makes it impossible to write unit tests (more on this in the next chapter).
- There are problems with public variables and objects.

A much better way is to keep any code related to _business logic_ in separate file(s) and to support this, NodeJS supports the CommonJS module standard which is part of the latest ECMA6 standards. You should aim to create one module for each chunk of functionality.


Here is a simple module:
```javascript
// shopping.js
var data = new Map()

exports.count = () => {
	return data.size
}
```
And here is how we import this module into our code:
```javascript
const list = require('./shopping')

const size = list.count()
console.log(`there are ${size} items`)
```

Open the `shopping/` directory and examine the files and directory structure.
```
.
├── debug.js
├── index.js
├── modules
│   └── shopping.js
├── node_modules
└── package.json
```
Notice that there is a `modules/` directory. In NodeJS we capture functionality in **modules** and these are what we will run the tests on. Each module should be self-contained. _All_ the application _business logic_ should be moved into modules.

Open the `modules/shopping.js` script and read it carefully.

1. Notice that the module imports its own dependencies which will not be visible to other scripts (node-persist in this case).
2. By default, all functions and variables are _private_ and not accessible from outside the module.
2. The `exports` object contains the public-facing functionality
  - each object stores an anonymous function which can be called by other parts of our app.
  - each anonymous function is defined using the [ECMA6 Arrow Function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) syntax
  - the functions in some of the properties (count, clear, getAll) take no parameters (indicated by a pair of empty brackets in front of the `=>` arrow)
  - the other functions take a single parameter, listed before the `=>` arrow
3. Some functionality has been completed but there are some [stub functions](https://en.wikipedia.org/wiki/Method_stub) which represent functionality we have not yet implemented.


## 3 Using a Linter

JavaScript is a powerful language and includes a number of powerful features but it also includes features that, whilst they may produce working code, will make your code difficult to read and debug! A **linter** is a program that analyses your scripts for _programmatic_ and _stylistic_ errors and will flag up anything that may cause problems. They define a _professional subset_ of the language and reject any code that doesn't meet that standard.

There are a number of _linters_ available for the JavaScript language. The original one was written by Douglas Crockford (the author of JavaScript: The Good Parts). This enforced _his_ idea  of good JavaScript and was notorously not configurable! There are now a number of popular linters available, your choice should be based on what will run in your IDE as well as your personal preferences. The most popular linters are:

1. [JSLint](http://www.jslint.com/help.html), the original, by Douglas Crockford
2. [JSHint](http://jshint.com/docs/)
3. [ESLint](http://eslint.org) which is supported by many _IDEs_ and _code editors_

EsLint is highly configurable through a hidden config file that needs to be added to the project root directory. When you submit your coursework you must demonstrate that it contains no errors or warnings when run using an identical configuration file.

### 3.1 The Linter Configuration

ESLint is completely configurable through a configuration file `.eslintrc` which should be located in the project's root directory. By default any file or directory starting with the period (.) character is hidden although most editors will show them by default. A sample configuration file has been provided in the sample code repository. Open it and take a look at the structure.


The `.eslintrc` file uses a _JSON_ string to organise its settings which are in three sections.
```json
{
	"env": {
		"es6": true,
		"jasmine": true,
		"node": true
	},
	"parserOptions": {
		"ecmaVersion": 8
	},
	"rules": {
		"no-var": 2,
    "semi": [1, "never"],
		"arrow-spacing": [1, { "before": true, "after": true }]
	}
}
```
Near the bottom of the file list you should see a file called `.eslintrc`, the initial dot (.) in the filename caused it to be hidden by default. Open the file now.

1. Notice that the file contents are using the _JSON_ format which should be familiar to you.
2. There are three JSON objects, `env`, `parseOptions` and `rules`.
  1. The **env** object describes the _environment_ you are using. In our example we indicate that we will be using the ECMA6 syntax, are writing _NodeJS_ code, and will be using _Jasmine_ tests.
  2. the **parserOptions** object defines the version of JavaScript it should use. Because we will be using the cutting edge language constructs we choose version 8.
  2. The **rules** object defines the rules we want to apply. As you can see we are requiring tab indentation, single quotes and avoiding the use of semicolons on each line. The full list of rules can be found in the [ESLint Documentation](http://eslint.org/docs/rules/).
  3. Each rule has a reporting level where 0 means _disabled_, 1 means _warning_ and 2 means _error_. This affects how the rule violations are reported.
  4. Some rules allow for additional options. If these are specified, both the reporting level and options need to be in an array.

Whilst you need to use the supplied configuration file in your assignment you should take time to understand the range of [rules](http://eslint.org/docs/rules/) available and adding them to your `.eslintrc` configuration file. To make this process easier you can use this handy [ESLint Rule Generator](http://rapilabs.github.io/eslintrc-generator/).

### 3.2 Running ESLint

Although there are plugins for many popular IDEs you should get used to running the linter from the terminal. ESLint is available as a NodeJS package which allows you to run it from the terminal. Since you may find yourself using an editor with support baked in, why would you want to do this?

1. Some editors don't have ESLint support.
2. Running ESLint in the Terminal gives a summary of the linting errors.to check if _all the scripts_ are fixed.
3. It can be configured to fix many of the most common error such as whitespace and semicolon usage.
4. The linting can be run as part of the _Continous Integration_ and _Continous Deployment_ process (more on this in a later worksheet)
5. Finally, it will be used during the marking of your assignment to make sure your code is formatted correctly!

#### 3.2.1 Test Your Knowledge

lets install, configure and run the console-based linter.

1. Start by opening a terminal window and navigating to the `shopping/` directory.
2. Install the NodeJS ESLint package `npm install eslint --save-dev`. This installs it and adds it to your `package.json` file in the `devDependencies` section.
3. Run the executable `node_modules/.bin/eslint index.js`. This runs the `eslint` executable located in the hidden `.bin/` directory in the `node_modules/` directory.
4. You will see a list of all the errors and warnings found together with a summary with the total number of errors and the total number of warnings.
5. Open the `index.js` file and, using the linter report, fix the issues. You should re-run the linter regularly to check your progress.
6. Run the linter on the module using `node_modules/.bin/eslint modules/shopping.js` and note the errors it finds.
7. Now run the same command but this time pass the `fix` flag, `node_modules/.bin/eslint --fix modules/shopping.js`
8. Open the `shopping.js` file and notice that most of the issues have gone. The fix tool is not perfect, it may have introduced new errors so use it with caution!
9. Manually correct any errors until the linter reports 0 errors and warnings.
10. Finally run the linter against all the files in the project using `node_modules/.bin/eslint .` to ensure there are absolutely no linting errors in your code. Well done!

## 4 Debugging

As our script grow larger, so the odds of introducing a bug. So how can we locate and fix them?

One option would be to insert lots of `console.log()` statements into our code. This would help us to:

1. Track the program flow.
2. Track the contents of variables and objects.

A much better solution is to use a **debugger**. A debugger allows you to:

1. Pause execution of the code at any point.
2. _Step through_ the code one line at a time.
3. Monitor the values of variables and objects at any point.

Debuggers offer a number of features. Breakpoints allow the code to be paused on specific lines of code. Code execution can be run a line at a time or resumed. Functions can be stepped in and out. Watchers can be used to monitor variables and objects.

There is a powerful debugger built-in to NodeJS and two alternative ways to work with it.

1. A **terminal debugger** controlled through the terminal window.
2. A **visual debugger** that allows you to interact using the mouse. There are two main choices.
    - A TCP-based debugger that uses the Chrome browser.
    - Using the integrated debugger built into modern code editors.

It is important to learn both these.

### 4.1 Terminal Debugger

NodeJS offers a [terminal debugger](https://nodejs.org/api/debugger.html) which allows you to debug code directly in the _terminal_ window. Whilst it is not the most intuitive of tools it does offer an impressive range of features. lets take a look at these in action. Start by opening the `simpleDebug.js` file in the `shopping` directory. Notice the `debugger` statement on line 10, this is now we insert a breakpoint. We can run the script in debug mode using.
```
node debug simpleDebug.js
< Debugger listening on 127.0.0.1:5858
connecting to 127.0.0.1:5858 ... ok
break in simpleDebug.js:2
  1 
> 2 'use strict'
  3 
  4 const data = new Map()
debug> 
```
Notice that the debugger has paused at the first line of code but _has not executed it yet_. You are now presented with a `debug>` prompt where you can enter a debugger command. These are:

| Command  | Abbr | Meaning            |
| -------- | ---- | ------------------ |
| cont     | c    | continue execution |
| next     | n    | step next          |
| step     | s    | step in            |
| out      | o    | step out           |
| quit     |      | exit the debugger  |
| restart  |      | restart the script |

It is also possible to attach and remove a watcher to or from a variable or object and list all watched variables.

| Command         | Meaning                           |
| --------------- | --------------------------------- |
| watch('expr')   | add expr to watch list            |
| unwatch('expr') | remove expression from watch list |
| watchers        | list all watchers and values      |

Breakpoints are added directly to the code

Script is run in debug mode

Can add watchers to monitor variables

Commands for stepping through code.

Let's try out some of the debugger features.

1. At the prompt lets add some variables to the _watch list_.
    - It would be good to see the content of the `item` variable which should hold the name of the item we are adding. type `debug> watch('item')` to add this variable to the _watch list_.
    - The items should get added to the `Map()` object. Its would be helpful to see what it contains by typing `debug> watch('[...data]')`, note the use of the _spread_ operator.
2. Now we can run the code. The first breakpoint is just after we have asked for the command so we can continue running the code from where it is currently (the first line), it will stop at the breakpoint. type `debug> c`, we will see the command prompt and can enter the first item (lets `add bread`).

Notice that the two objects in the watch list are listed followed by the current line of code plus a few lines before and after.
```
Watchers:
  0: item = "<error>"
  1: [...data] = []

  8 do {
  9 	input = String(readline.question('enter command: ')).trim()
>10 	debugger
 11 	if (input.indexOf('add ') === 0) {
 12 		const space = input.indexOf(' ')
```
At the moment the code is paused on the breakpoint. We can now single-step through the code by entering `debug> n`. You should repeat the command, stepping over each line of code until there is a value assigned to the `item` variable.

We are about to execute the code that handles the item quantity so it would be a good idea to add the `qty` variable to the _watch list_, `debug> watch('qty')`. Continue single stepping through the code until the new item has been added to the `item` map. Notice that as soon as the `if` statement has exited, both the `item` and `qty` variables are flagged as `<error>`, this is because they were defined inside the first `if` statement and are now out of scope.

#### 4.1.1 Test Your Knowledge

1. If you run the script outside the debugger you will notice that there are some logical errors. Use the debugger to trace the flow of the code and the values of the variables and objects to help you locate the error and fix it.
2. The script should ignore the case of the item you are entering, so `Bread`, `bread` and `BREAD` should all be treated as the same.
    - Use the debugger to see what currently happens when you add these three variations.
    - The script should store a single product `Bread` and a quantity of 3 units.
    - Use the debugger to help you implement this new feature.
3. Finally you should be able to remove a product using the command `remove bread`. This should remove the item from the list. Use the debugger to help you implement this feature.

### 4.2 Visual Debugger

Whilst the terminal debugger offers the key features it is not simple to use. A _visual debugger_ is far more intuitive.

Many modern editors include built-in debuggers and it is worth learning how these work but even it your editor does not have this facility, NodeJS provides an out of process TCP-based debugger that connects to the Chrome web browser. We will explore this. Start by opening the `shopping/` directory. The main script is `index.js`. Open this, notice it imports a module called `shopping.js` which is located in the `modules/` directory.

To start the visual debugger you need to navigate to the `shopping/` directory and run the main `index.js` script but pass two _flags_.
```
node --inspect --debug-brk index.js
```
1. The `--inspect` flag starts the debugger.
2. The `--debug-brk` flag pauses the debugger on the first line of the script.

Then open `about:inspect` in the Chrome browser. You should see some options appear in the browser window. Click on the _Open dedicated DevTools for Node_ link and this will open a new window containing the visual debugger. Let's take a look at the key features and how these relate to the _terminal debugger_ we have already used.

1. The screen is split into 3 panes. We don't need the left one so this can be closed using the button to the left of the _simpleDebug.js_ tab.
    - The middle pane contains the code we are debugging. Rather than adding `debugging` commands into the source code we can click in the left gutter (where the line numbers are) to add blue breakpoint markers. Add one to first `if` statement and another to the second one.
2. The right-hand pane contains a number of collapsable sections. In this exercise the only one you need to keep open is the **Scope** pane. This lists the variables and objects and is grouped into different scopes.

    - The _Local_ scope section contains the variables and object within the current script.
    - The _Global_ scope is not needed.
    - If the script is in a _block_ you will see another section which lists the locally scoped variables.

At the top of this right-hand pane are the _script execution buttons_, these replicate the _debugger commands_ we used in the previous exercise.

Start by clicking on the **Resume script execution** button which will run the script up to the next breakpoint. The debugger is now greyed out because it is waiting for input in the terminal. Switch to the terminal and type `add bread`, this will return control to the debugger.

Now try the next button, **Step over next function call**. This will step through your code one line at a time. Repeat this until you get to the `List.add(item)` line.

Now it's time to use the next button, **Step into next function call**. This will load the `shopping.js` file and place the program execution on the first line of the `add` function. If we used the **Step over** button we would have run this function and returned control to the next line in the `index.js` script.

Use the **Step out of current function** button. This returns control to the controlling script back in `index.js`.

Now use the buttons to loop back to the `List.add(item)` line but this time use the **Step over next function call** button. Notice that this time control moves directly to the next line without going _into_ the function definition.

One really useful feature is that the browser-based debugger will automatically reconnect if the dvript is restarted. Press `ctrl+c` to quit the script then restart with `node --inspect --debug-brk index.js` and see how the debugger reconnects.


## 5 Documentation

Whenever we write a program it is important that it is fully documented. A simple solution is to add comments to the code which can then be read by anyone who opens the script. A better solution would be to write up detailed _human readable_ documentation.

A **documentation generator** is a tool that takes structured comments added to source files and turns them into properly-formatted documentation. We will be using the [jsdoc]( http://usejsdoc.org) tool which is based on the **JavaDoc** tool used by Java programmers. JSDoc is a markup language used to annotate JavaScript source code files. Using comments containing JSDoc, you can add documentation describing the application programming interface of your code and turn these into a documentation website.

In this exercise you will learn how to use JSDoc to create detailed professional documentation for your code.

### 5.1 Adding JSDoc Comments

So what needs to be documented?

1. all function signatures (names, purpose, parameter, return types)
2. any exceptions that may be thrown.
3. an explanation of the purpose of any obscure lines of code

Let's look at a simple example, taken from `modules/shopping.js`
```javascript
/**
 * Returns details for the named item.
 * @param   {string} item - The item name to retrieve.
 * @returns {string} The name of the item
 * @throws  {InvalidItem} item not in list.
 */
exports.getItem = item => {
	if (data.get(item) === undefined) {
    // error thrown in the item is not in the Map()
		throw new Error('item not in list')
	}
	return data.get(item)
}
```
Notice that the JSDoc comments start with `/**` and end with `*/`. Each line starts with an asterix `*` and the first line describes the purpose of the function. All parameters are then listed together with their preferred data type and this is followed by the return value and its expected type. Finally any errors/exceptions thrown by the function are shown.

You should also add standard JavaScript comments to explain the code itself. These begin with `//`. Even though these won't be extracted into the documentation they are important when trying to understand the code logic.

### 5.2 Generating the Documentation

JSDoc is available as a NodeJS plugin. It has already been added as a _Dev Dependency_ in the `package.json` file and so it should already be installed. Lets use it to build the documentation for our modules.
```
node_modules/.bin/jsdoc modules/
```
This will create an `out/` directory containing the complete documentation as a website.
```
.
├── fonts
├── index.html  < this is the documentation home page...
├── module-shopping.html
├── scripts
├── shopping.js.html
└── styles
```
Right-click on the `index.html` file and choose _preview_. This will open the home page. The module list can be found down the right-hand side of the screen. Locate the **shopping** link and click to see the full documentation.

1. Notice that each variable and method definition has been lifted from the source code.
2. Notice that each method has a _description_, this was added to the source code file using the special JSDoc markers `/** */`.
3. The `getItem()` method documentation includes a lot more detail, this is defined in _block tags_:
  - a list of the parameters and their types
  - an explanation of the return value and type
  - a list of any exceptions that could be thrown

There are a lot more features that can be added to this, you should take time to read the full [documentation](http://usejsdoc.org) to find out what _block tags_ can be used.

### 5.1 Test Your Knowledge

1. Your challenge is to complete the documentation for the `shopping.js` module. You should use the `getItem()` documentation as a guide.
    - Make sure you add the JSDoc documentation block and also add comments to explain the code.
2. To check your results, run the documentation tool and reload the documentation web page.
3. Carefully read through the generated documentation to ensure it is both complete and makes sense.


## 6 Creating Packages

### 6.1 Local Packages


Importing modules you have created has a problem

Correct path needs to be provided

Can get messy:
```javascript
const async = require('../../mod/async')
```
We want:
```javascript
const async = require('async')
```

Local Module Dependencies

You have already imported modules from npmjs

You can also define and import local modules
```
npm install --save ./mod/async
```
This will copy your module into node_modules
```json
{
  "name": "bookshop",
  "dependencies": {
    "request": "^2.67.0",
    "async": "file:local_modules/async",
  }
}
```

What is a Module?

Any directory that has a package.json file

Everything in the directory will be included

Files in the .gitignore or .npmignore file will not be published

Reloading a Module

There are several approaches:

Use the `rm-local-modules` command

Increment the version number in its `package.json` then `npm install`

Delete and reload
```
rm -rf node_modules/async
npm install
```


https://www.hacksparrow.com/how-to-write-node-js-modules.html
```
$ npm pack
  currency-0.0.1.tgz
```

#### 6.1.2 Installing a Local Package

TODO
```
$ npm install --save ../currency
```

# 6.2 Publishing Packages


### Logging into NPMJS

Need an account and to be logged in
```
npm adduser
npm login
```
Check account details
```
npm config ls
```

https://www.npmjs.com/~

### Publishing to NPMJS

Package name must not exist in npmjs
```
npm publish
```

TODO
