
# Objects and Functions

This is the second lab. Before starting make sure you have completed lab 1 (Introduction to JavaScript) and _fully understand_ the concepts presented.

The lab materials are frequently updated to fix bugs and improve your experiences. Before starting any lab you should use the Termonal to navigate to your local repository directory pull any updates from the _upstream remote_.
```
cd 305CDE
git pull upstream
```

## 1 Unit Testing

Building robust code is vitally important which means it should be frequently tested against the agreed spec. You will have already been shown the principles of Test-Driven Development (TDD) in the module 205CDE but in this module you will be taking your skills to an entirely new level and building the process into everything you do.

Open the `shopping/` directory and examine the files and directory structure.
```
.
├── debug.js
├── index.js
├── modules
│   └── shopping.js
├── node_modules
├── package.json
└── spec
    └── shopping-spec.js
```
Notice that there is a `modules/` directory. Unit testing is carried out on _units_ of code. In NodeJS we capture functionality in **modules** and these are what we will run the tests on. Each module should be self-contained. _All_ the application _business logic_ should be moved into modules.

Open the `package.json` file and read it carefully.

1. the `scripts` section defines four script shortcuts
2. the `dependencies` section defines the same dependencies as were used in the previous lab
3. the `dev-dependencies` section defines any dependencies required as part of the _development process_

Now install all the dependencies using `npm install`.

### 1.1 NodeJS Modules

Open the `modules/shopping.js` script and read it carefully.

1. Notice that the module imports its own dependencies which will not be visible to other scripts (node-persist in this case).
2. The `exports` object contains the public-facing functionality
  - each object stores an anonymous function which can be called by other parts of our app.
  - each anonymous function is defined using the [ECMA6 Arrow Function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) syntax
  - the functions in some of the properties (count, clear, getAll) take no parameters (indicated by a pair of empty brackets in front of the `=>` arrow)
  - the other functions take a single parameter, listed before the `=>` arrow
3. Some functionality has been completed but there are some [stub functions](https://en.wikipedia.org/wiki/Method_stub) which represent functionality we have not yet implemented.

Next open the `debug.js` script and study it carefully.

1. Notice that it _imports_ our **shopping** module into an _immutable variable_
  - the relative path needs to be included (its in the `modules` directory)
  - the file extension does not need to be included
2. Any functions in our module that are _exported_ can be accessed through the immutable variable.

There is a shortcut defined to run this script, run it now and see what happens.
```
npm run debug
```

### 1.2 Test Your Knowledge

1. Open the `debug.js` script and place a breakpoint on the line `list.add('cheese')`.
2. Use the **Run** button to run the script and open the debugger tools when the script stops on the breakpoint.
3. Add `data` to the _Watch Expressions_.
4. Single-step through the code.
  - start by using the _Step Into_ button to step into the module code
  - once in the module use _Step Over_ to run each line
  - as you step through watch the program flow and contents of the local variables

## 2 Unit Testing

There is also a `spec/` directory that contains the _unit tests_ we want to run. All test files must be in the format `xxx-spec.js` to be recognised by the _test runner_.
