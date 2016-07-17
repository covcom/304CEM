
# Objects and Functions

This is the second lab. Before starting make sure you have completed lab 1 (Introduction to JavaScript) and _fully understand_ the concepts presented.

The lab materials are frequently updated to fix bugs and improve your experiences. Before starting any lab you should use the Termonal to navigate to your local repository directory pull any updates from the _upstream remote_.
```
cd 305CDE
git pull upstream
```

## 1 The Debugger

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

_Unit testing_ is a vital skill if you are planning a career in software development. It is also a key part of your module assessment. In this exercise you will be using a framework called [Jasmine](http://jasmine.github.io/2.0/introduction.html). In this exercise you will learn how to run tests.

1. Open the necessary windows:
  - split the main screen into two panels (View > Layout > Horizontal Split)
  - open the `shopping.js` script in the left panel, this is the module we are testing.
  - open the `spec/shopping-spec.js` script in the right panel. This is the _test suite_ containing the tests we are running
  - open a terminal window at the bottom of the screen and run the tests `npm test`.
2. Carefully read the test file:
  - notice that we import the module we are testing, specifying the relative path
  - the **test suite** is defined using the `describe()` function, it takes two parameters, the description and an anonymous function containing the _specs_
  - each **spec** is defined in either an `it()` or `xit()` function. By placing an `x` in the function name the spec is set as _pending_ which means it won't run.
  - each spec contains tests, called **expectations** that are used to check the state of the code.
  - the `beforeEach()` function is executed before each spec is run (once per spec) and is used to configure a known environment
  - the `afterEach()` function runs after each spec finishes and is used to tidy up before the next spec is run.
3. Launch the Test Runner
  - in the open terminal window use the Jasmine-Node **Test Runner** to automatically run your test suite. There is already a shortcut configured in the `package.json` file so use `npm test`.
  - you will see the tests in the test suite run successfully.
  - remove the pending status from the 'should throw an error if item not in list' spec. Notice that as soon as you save the changes the tests run automatically.
  - notice that this spec _fails_.

### 2.1 Test Your Knowledge

1. Implement the `getItem()` function in `shopping.js` so that the new test passes (you will need to use the `get()` method that forms part of the [Map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map) prototype)
2. Uncomment the next spec (should throw an error if item not in list) and modify the `getItem()` function in `shopping.js`. You will need to correctly implement _exception handling_ which was covered in the previous lab.
3. Uncomment the next spec (should delete first item) and implement the `removeItem()` function in `shopping.js`. You will need to use the `Map.delete()` method.
4. Uncomment the next spec (should delete last item) and make sure the tests pass.
5. Finally Uncomment the last spec (should throw error if item not in list) and implement error handling so that the test passes.

## 3 Code Coverage

If we are going to rely on our automated tests to guarantee our code runs as expected we need to check that these tests are _comprehensive_. There are two aspects we need to check:

1. Can our script handle both _good_ and _bad_ data.
  - bad data might include missing parameters as well as invalid data types or values (trying to access an array index that doesn't exist for example)
2. Do the automated tests test _every line of our code_ including all conditional branches.
  - this is called code coverage and there are automated tools to help us with this.

### 3.1 Running the Code Coverage Test

Start by installing the node **Istanbul** module has already been installed so we can run our coverage tests. Note that any command-line tools installed by a package can be found in the `node_modules/.bin` directory.
```
./node_modules/.bin/istanbul cover -x **spec/** -x **index.js** -x **debug.js** jasmine-node spec
```
There are a number of important parameters and flags so lets analyse these:

1. the command we use is called `istanbul` which was installed using the command on the previous line.
2. to generate a complete coverage report we need to pass the `cover` parameter.
3. There are some files we don't want to check for code coverage:
  - the `spec/` directory contains our tests and we won't be writing tests for our tests!
  - the `index.js` file is used to run our app interactively, its not part of the application logic model.
  - the `debug.js` script serves a similar purpose.
4. Finally we specify the command to run the unit tests.

The parameters and flags won't change between runs so we should create an _alias_ to make it easier to trigger the coverage suite. These are stored in the `package.json` file under the `scripts` key. If you open this you will see that there is an alias called `coverage`, so to run our coverage suite we call.
```
npm run coverage
  =============================== Coverage summary =============================
  Statements   : 65.85% ( 27/41 )
  Branches     : 37.5% ( 6/16 )
  Functions    : 100% ( 0/0 )
  Lines        : 65.85% ( 27/41 )
  ==============================================================================
```

### 3.2 Analysing the Code Coverage Report

When the coverage test has finished it generates a report in a `coverage/` directory.
```
.
├── coverage.json
├── lcov-report
│   ├── base.css
│   ├── index.html  < this is the file you need to open...
│   ├── modules
│   ├── prettify.css
│   ├── prettify.js
│   ├── shopping
│   ├── sort-arrow-sprite.png
│   └── sorter.js
└── lcov.info
```
1. Open the `index.html` file (as shown above), then click on the **Run** button at the top of the screen (we need to be running the Apache web server to view our report).
2. Right-click on the index.html file and choose **Preview**. You will see a code coverage summary screen where you will immediately spot we have very poor coverage with only 27 out of 41 lines of code being tested!
![Code Coverage Summary Screen](.images/coverage_overview.png)
3. Click on the `modules/` link and drill down to the `shopping.js` file to see details which appear down the left margin.
  - any line of code that is being tested appears in green (the number represents the number of times it was called in the test suite)
  - any line in red has never been called by the test suite and so has not been tested.
![Code Coverage of the Module](.images/code_coverage_by_line.png)

### 3.3 Test Your Knowledge

It is immediately clear from the coverage report that there is a large chunk of code that is not being tested! If we are not testing code we have no confidence that it is working. The detailed report flags up the `decrement()` function.

1. Write unit tests to test that the `decrement()` function works correctly.
  - Make sure you test all code paths.
2. Periodically re-run the coverage tool and refresh the report page.
3. You are aiming for 100% code coverage.

## 4 Documentation

Whenever we write a program it is important that it is fully documented. A simple solution is to add comments to the code which can then be read by anyone who opens the script. A better solution would be to write up detailed _human readable_ documentation.

So what should we be documenting?

1. all function signatures (names, purpose, parameter, return types)
2. any exceptions that may be thrown.
3. an explanation of the purpose of any obscure lines of code

In this exercise you will learn how to use JSDoc to create detailed professional documentation for your code. JSDoc is a markup language used to annotate JavaScript source code files. Using comments containing JSDoc, you can add documentation describing the application programming interface of your code.

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

### 4.1 Test Your Knowledge

1. Your challenge is to complete the documentation for the `shopping.js` module. You should use the `getItem()` documentation as a guide.
2. To check your results, run the documentation tool and reload the documentation web page.
