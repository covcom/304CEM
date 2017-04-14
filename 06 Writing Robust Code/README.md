
# Writing Robust Code

In this worksheet you will be introduced to the tools and techniques you will need to successfully complete your work. If you learn and apply these to your assignment you will increase your chances of gaining a much higher grade.

The lab materials are frequently updated to fix bugs and improve your experiences. Before starting any lab you should use the Terminal to navigate to your local repository directory pull any updates from the _upstream remote_.
```
cd 305CDE
git pull upstream
```

There is a slide deck https://goo.gl/XHBbMx to accompay this worksheet. Make sure you are familiar with its contents before proceeding.

## 1 Using a Linter

JavaScript is a powerful language and includes a number of powerful features but it also includes features that, whilst they may produce working code, will make your code difficult to read and debug! A **linter** is a program that analyses your scripts for _programmatic_ and _stylistic_ errors and will flag up anything that may cause problems. They define a _professional subset_ of the language and reject any code that doesn't meet that standard.

There are a number of _linters_ available for the JavaScript language. The original one was written by Douglas Crockford (the author of JavaScript: The Good Parts). This enforced _his_ idea  of good JavaScript and was notorously not configurable! There are now a number of popular linters available, your choice should be based on what will run in your IDE as well as your personal preferences. The most popular linters are:

1. [JSLint](http://www.jslint.com/help.html), the original, by Douglas Crockford
2. [JSHint](http://jshint.com/docs/)
3. [ESLint](http://eslint.org) which is supported by many _IDEs_ and _code editors_

EsLint is highly configurable through a hidden config file that needs to be added to the project root directory. When you submit your coursework you must demonstrate that it contains no errors or warnings when run using an identical configuration file.

### 1.1 The Linter Configuration

ESLint is completely configurable through a configuration file `.eslintrc` which is located in the `01 Introduction to NodeJS` directory. By default any file or directory starting with the period (.) character is hidden. To display hidden files and directories click on the **gear icon** at the top of the _Documents Tree_ and choose _Show Hidden Files_.

1. the **env** object imports groups of pre-defined global variables based on the _environment_ they are used in. In our example we will be writing scripts using the NodeJS environment so we want the linter to recognise any NodeJS global variables.
2. the **rules** object defines any additional rules we want to enforce. In this example we are specifying that we _don't want semicolons_ at the end of each line, that we will use a 2 space tab for indenting, we will use single quotes for strings and that we are using UNIX line endings.

Near the bottom of the file list you should see a file called `.eslintrc`, the initial dot (.) in the filename caused it to be hidden by default.

1. Notice that the file contents are using the _JSON_ format which should be familiar to you.
2. There are two JSON objects, **env** and **rules**.
  1. The **env** object describes the _environment_ you are using. In our example we indicate that we will be using the ECMA6 syntax, are writing _NodeJS_ code, and will be using _Jasmine_ tests.
  2. The **rules** object defines the rules we want to apply. As you can see we are requiring tab indentation, single quotes and avoiding the use of semicolons on each line. The full list of rules can be found in the [ESLint Documentation](http://eslint.org/docs/rules/).
  3. Each rule has a reporting level where 0 means _disabled_, 1 means _warning_ and 2 means _error_. This affects how the rule violations are reported.
  4. Some rules allow for additional options. If these are specified, both the reporting level and options need to be in an array.

Whilst you need to use the supplied configuration file in your assignment you should take time to understand the range of [rules](http://eslint.org/docs/rules/) available and adding them to your `.eslintrc` configuration file. To make this process easier you can use this handy [ESLint Rule Generator](http://rapilabs.github.io/eslintrc-generator/).

### 1.2 Running ESLint

Although there are plugins for many popular IDEs you should get used to running the linter from the terminal. ESLint is available as a NodeJS package which allows you to run it from the terminal. Since you may find yourself using an editor with support baked in, why would you want to do this?

1. Some editors don't have ESLint support.
2. Running ESLint in the Terminal gives a summary of the linting errors.to check if _all the scripts_ are fixed.
3. It can be configured to fix many of the most common error such as whitespace and semicolon usage.
4. The linting can be run as part of the _Continous Integration_ and _Continous Deployment_ process (more on this in a later worksheet)
5. Finally, it will be used during the marking of your assignment to make sure your code is formatted correctly!

#### 1.2.1 Test Your Knowledge

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


## 2 Documentation

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

### 2.1 Test Your Knowledge

1. Your challenge is to complete the documentation for the `shopping.js` module. You should use the `getItem()` documentation as a guide.
2. The _Linter_ tool (see section 1) will help you identify where you need to add additional JSDoc comments.
3. To check your results, run the documentation tool and reload the documentation web page.
4. Carefully read through the generated documentation to ensure it is both complete and makes sense.

## 3 Project Metadata

Applications written in NodeJS typically contain a file called `package.json` which contains the _metadata_ associated with the project. This includes:

- information about the project such as name, description, keywords and author
- information about the remote repository where the project is hosted
- any modules needed for the project to run (dependencies)
- any modules needed to support development (devDependencies)
- aliases to any useful commands and scripts (scripts)

When you create a new project you should run the `npm init` command to run a wizard. This will build a skeleton `package.json` file for you. There is no need to do this in this case since the file already exists.

### 3.1 Adding Third-Party Modules

You are already familiar with the process of importing modules into your projects however if you are using a metadata file you need to make sure any modules you import are listed. This is achieved by using _flags_.

- To add a module to the `dependencies` list you need to use the `--save` flag. For example to import the _request_ module and add a reference into your `package.json` file you would run `npm install request --save`.
- To add a module to the `devDependencies` list you use the `--save-dev` flag instead.

Open the `package.json` file and read it carefully.

1. the `scripts` section defines four script shortcuts
2. the `dependencies` section defines the same dependencies as were used in the previous lab
3. the `dev-dependencies` section defines any dependencies required as part of the _development process_

Now install all the dependencies using `npm install`.

### 3.2 Test Your Knowledge

1. modify the `package.json` file and change the version to 1.0.1
2. install the **request** module, making sure it is referenced in the `dependencies` object in your `package.json` file.
3. install the **node-inspector** module, making sure it is referenced in the `devDependencies` object.
4. add a new script alias called `debug` and set its value to `./node_modules/.bin/node-inspector debug.js`, you will be using this later in the worksheet.

## 4 Writing Modular Code

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

### 4.1 NodeJS Modules

Open the `modules/shopping.js` script and read it carefully.

1. Notice that the module imports its own dependencies which will not be visible to other scripts (node-persist in this case).
2. The `exports` object contains the public-facing functionality
  - each object stores an anonymous function which can be called by other parts of our app.
  - each anonymous function is defined using the [ECMA6 Arrow Function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) syntax
  - the functions in some of the properties (count, clear, getAll) take no parameters (indicated by a pair of empty brackets in front of the `=>` arrow)
  - the other functions take a single parameter, listed before the `=>` arrow
3. Some functionality has been completed but there are some [stub functions](https://en.wikipedia.org/wiki/Method_stub) which represent functionality we have not yet implemented.

# 5 Creating Packages

# 5.1 Local Packages

# 5.2 Publishing Packages

# Extension Activity

In this worksheet you have learned about two important techniques you can use to improve the quality of your code. The extension task will use this to improve your local development environment.

Most desktop code editors support plugins which will extend their functionality. Your challenge is to investigate, install and document the following:

1. Find out how your preferred editor supports eslint. When configured, your browser should highlight linting errors against the appropriate lines of code, making them easier to locate and fix.
2. Several errors and warnings are caused by bad use of whitespace. Locate the setting in your editor that allows you to see whitespace characters (spaces, tabs, newlines) and how to specify that indentations are added as 2 space tabs.
3. There will be plugins that support autocomplete. Identify how you can add autocomplete for NodeJS, ECMAScript 6, etc. This will speed up your development.
  - Many editors such as VS Code support the Typescript Definition Language. This can be installed as a NodeJS global module `npm install -g tsd`. Once installed, it can be used to load support for different languages, eg. `tsd install node`.
4. You will be interacting with a terminal during the development process, most editors allow you to embed a terminal window.
5. You will be regularly interacting with Git (both your local and remote repository). Find out whether there are any plugins that can improve your workflow. Ideally these should highlight the file diff in the code editor line by line as well as offer a simple way to stage, commit, push and pull (and change branches?).
