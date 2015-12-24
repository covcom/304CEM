
# Unit Testing

In this worksheet you will learn about how to automate the testing for your _NodeJS modules_. By designing a set of comprehensive tests we can be assured that the modules work correctly. By running them automatically we can quickly test our code which encourages us to test frequently.

## 1 Testing Synchronous Code

Open the `shopping/` directory and examine the files and directory structure.
```
.
├── index.js
├── modules
│   └── shopping.js
├── package.json
└── spec
    └── shopping-spec.js
```
Notice that there is a `modules/` directory that contains the _NodeJS module_ we want to test. There is also a `spec/` directory that contains the _unit tests_ we want to run. All test files must be in the format `xxx-spec.js` to be recognised by the _test runner_.

Finally there is the _package_ file and a simple script, `index.js` for you to use to get comfortable with the module.

1. install the module dependencies using `npm install` and read through the documentation for the [node-persist](https://www.npmjs.com/package/node-persist) module to understand how it works.
2. run the `index.js` script and use it to interact with the module, ensure you are clear on how it works.
3. launch a new terminal window and launch the _test runner_ with `npm test`.Open the `package.json` file to understand what is happening.
4. open the `shopping-spec.js` file and read through the tests so you understand the results of running them.
5. open a new terminal and execute `npm run coverage` to run the code coverage tests, this displays a coverage summary and creates a `coverage/` directory.
6. open the `coverage/` directory and preview the `index.html` file it contains and navigate to the  `modules/shopping/` web page.
7. try to understand what information it telling you about the state of code coverage.

## 1.1 Test Your Knowledge

Make sure your IDE is configured so you can see access all of the following files:

- `shopping.js`
- `shopping-spec.js`
- the terminal running the test runner
- the terminal for running the coverage tests
- the web page showing the test coverage for `shopping.js`

1. the last test is set to 'pending'. Release the test. The _test runner_ automatically runs the tests every time you save a file. The automated tests fail so make changes to the `shopping.js` module until the tests all pass.
2. study the code coverage report to identify any _code paths_ that are not being tested and devise additional tests to ensure 100% coverage.
3. the code coverage report also indicates how many times each line of code is called in the tests. Add additional tests to check for:
  - illegal values such as blank strings or indexes out of range
  - _edge cases_.

## 2 Asynchronous Testing

In the previous section all module calls resolved immediately however it is often the case that a call may take a callback parameter to be executed in a different thread. Obviously we need to be able to test this type of code.

The module you will be testing and debugging should calculate taxi fares for any given start and end point. The fare is calculated based on an [agreed formula](https://yourtaximeter.com/local-authorities/view/london-black-cabs)

Start by examining the project files:
```
.
├── index.js
├── modules
│   └── taxi.js
├── package.json
└── spec
    ├── routedata
    │   └── cov_war_uni.json
    └── taxi-spec.js
```
The files are similar to those in the previous exercise with the addition of a routedata file containing a single json document. We will use this later in the exercise. Open all the files and get familiar with their content. Use the `index.js` file to see how the module works.

## Presentation

https://goo.gl/H744dE
