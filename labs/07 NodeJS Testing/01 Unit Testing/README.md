
# Unit Testing

In this worksheet you will learn about how to automate the testing for your _NodeJS modules_. By designing a set of comprehensive tests we can be assured that the modules work correctly. By running them automatically we can quickly test our code which encourages us to test frequently.

## 1 Testing Synchronous Code

Open the `shopping/` directory and examine the files and directory structure.
```
.
├── index.js
├── modules
│   └── shopping.js
├── package.json
└── spec
    └── shopping-spec.js
```
Notice that there is a `modules/` directory that contains the _NodeJS module_ we want to test. There is also a `spec/` directory that contains the _unit tests_ we want to run. All test files must be in the format `xxx-spec.js` to be recognised by the _test runner_.

Finally there is the _package_ file and a simple script, `index.js` for you to use to get comfortable with the module.

1. read through the `package.json` file and notice the `devDependencies` object which lists any modules used for debugging and testing.
2. install the module dependencies using `npm install` and read through the documentation for the [node-persist](https://www.npmjs.com/package/node-persist) module to understand how it works.
2. run the `index.js` script and use it to interact with the module, ensure you are clear on how it works.
3. launch a new terminal window and launch the _test runner_ with `npm test`.Open the `package.json` file to understand what is happening.
4. open the `shopping-spec.js` file and read through the tests so you understand the results of running them.
5. open a new terminal and execute `npm run coverage` to run the code coverage tests, this displays a coverage summary and creates a `coverage/` directory.
  - if you get errors you should install **istanbul** globally using `sudo npm install -g istanbul` and then run `istanbul cover -x **/spec/** -x **index.js** jasmine-node spec`
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

In this task we will be testing and debugging a module that uses third-party APIs to calculate taxi fares between named places. Taxi fares are calculated according to an [agreed formula](https://yourtaximeter.com/local-authorities/view/london-black-cabs). Start by understanding the project files.
```
.
├── index.js
├── modules
│   └── taxi.js
├── package.json
└── spec
    ├── medium-spec.js
    ├── routedata
    │   ├── cov_uni_cat.json
    │   └── cov_war_uni.json  
    └── short-spec.js
```
The key differences between this and the previous example are the multiple specs and the json documents in the `routedata/` directory. Examine the files to understand the purpose of each file and how they interact.

1. install the module dependencies and read through the documentation for [rewire](https://www.npmjs.com/package/rewire) and [sync-request](https://www.npmjs.com/package/sync-request) to understand how the module works.
2. run the `index.js` script and use it to interact with the module, ensure you understand fully how it works.
  - compare these tests with the synchronous version, there is a `done()` parameter that needs to be called to indicate the callback has completed.
3. The tests have been split into two **suites**. A suite contains a group of related **specs**. Each spec contains one or more **expectations** which will either pass or fail. Launch the test-runner in a new terminal window and run the two suites.
4. notice that both the suite and spec descriptions appear in the test results. The execution time is displayed against each spec. Notice that at least one of the _specs_ will fail. Why can't we be certain how many tests will pass or fail?
  - the module calculations make use of live data from an external API. Sometimes the API will return _exactly the same data as before_ but often the return data will be different. This is not helpful when testing a module!
  - the `getRouteData` property contains the API call so the test will substitute this for a function that _always returns the same data_, known as a **Mock**.
  - notice we used the **rewire** package to load the `taxi` module, this allows us to _replace any private property_
  - open the `medium-spec.js` file and uncomment the `taxi.__set__()` method which substitutes a different function, this loads data from a file rather than make the API call.
  - check the results of the test suite

## 2.1 Test Your Knowledge

1. create a third _test suite_ to simulate a longer journey of more than 150 miles
  - use the `index.js` script to generate a suitable URL for the API and print this to the console
  - paste this into a browser tab to capture the standard response
  - paste this into a [json parser](http://jsonlint.com/) to check it is valid and tidy up the formatting
  - paste this into a new json file in the `routedata/` directory.
  - use the [taxi fare calculator](https://yourtaximeter.com/local-authorities/view/london-black-cabs) to calculate the correct fare.
  - add suitable specs to the new test suite
2. there is an error in the fare values returned, fix the error so that the tests pass.

## Presentation

https://goo.gl/H744dE
