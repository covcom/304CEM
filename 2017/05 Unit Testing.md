

# Automated Testing

In the previous lab you learned about a range of tools and techniques to help you write robust code, in this lab you will learn about the most important tool to improve your productivity.

Building robust code is vitally important which means it should be frequently tested against the agreed spec. You will have already been shown the principles of Test-Driven Development (TDD) in the module 205CDE but in this module you will be taking your skills to an entirely new level and building the process into everything you do.

In this chapter you will be introduced to the principles behind test-driven development (TDD) and shown how to apply unit testing to automate the testing of NodeJS modules.

## 1 Unit Testing

_Unit testing_ is a vital skill if you are planning a career in software development. It is also a key part of your module assessment. In this exercise you will be using a framework called [Jasmine](http://jasmine.github.io/2.0/introduction.html). In this exercise you will learn how to run tests.

We will need to install some packages to allow us to run the tests. These are all developer dependencies and so need to be added to the `devDependency` object in `package.json`. This was covered in the previous chapter.
```
npm install --save-dev jasmine jasmine-console-reporter
```
Now the testing packages are installed we can execute the unit tests by running the `/spec/runTests` script. Open this file and study it.

1. First we import the `jasmine` package and this is used to call the `Jasmine()` constructor function to create a new object.
2. Next we call the `loadConfigFile()` method which loads the testing config from the `jasmine.json` file. This contains a `spec_file` array listing the test suites to run.
3. Now we create a _reporter_ which is responsible for displaying the test results. Different reporters output the results in different ways, our chosen one renders this in colour to the terminal. The `addReporter()` method loads this data into Jasmine.
4. Finally we call the `execute()` method to run the tests.

Run the test suite using.
```
node spec/runTests
```
Watch the results output to the terminal window.
```
1) Shopping List
   ✔ should add a new item
   ✔ should increment the qty if item exists
   ✔ should return an array containing all items in order of entry
   ✖ should be able to return a shopping item (1 failure)
   ⚠ should throw an error if item not in list
   ⚠ should delete first item
   ⚠ should delete last item
   ⚠ should throw error if item not in list
```
The start of the output shows that there are 8 tests.

- The first 3 tests pass.
- The next test fails.
- The remaining 4 tests are _pending_ meaning they have been disabled.

Following this you can see details of any failed tests.
```
Failures:
1) Shopping List should be able to return a shopping item
  Message:
    TypeError: Cannot read property 'title' of undefined
  Stack:
    TypeError: Cannot read property 'title' of undefined
        at Object.it (/.../shopping/spec/shopping-spec.js:41:31)
```
Reading this you should get an idea of the problem. The test is trying to retrieve a shopping item however there is a problem on line 41, character 31 in the test suite which is trying to retrieve a 'title' property but this has failed. There is more information about the pending tests but this can be ignored.

Now lets take a moment to understand the test suite we have run. Open `spec/shopping-spec.js`.

Carefully read this test suite file:

1. notice that we import the module we are testing, specifying the relative path
2. the **test suite** is defined using the `describe()` function, it takes two parameters, the description and an anonymous function containing the _specs_
3. each **spec** is defined in either an `it()` or `xit()` function. By placing an `x` in the function name the spec is set as _pending_ which means it won't run.
4. each spec contains tests, called **expectations** that are used to check the state of the code.
5. the `beforeEach()` function is executed before each spec is run (once per spec) and is used to configure a known environment
6. the `afterEach()` function runs after each spec finishes and is used to tidy up before the next spec is run.

### 1.1 Test Your Knowledge

1. Implement the `getItem()` function in `shopping.js` so that the new test passes (you will need to use the `get()` method that forms part of the [Map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map) prototype). As soon as this test passed you can move on.
2. Uncomment the next spec (should throw an error if item not in list) by removing the `x` from `xit` and run the test suite. You should see this test fails.
3. modify the `getItem()` function in `shopping.js`. You will need to correctly implement _exception handling_ which was covered in the previous lab. As soon as the test passes you know you have implemented the function properly.
3. Uncomment the next spec (should delete first item) and implement the `removeItem()` function in `shopping.js`. You will need to use the `Map.delete()` method. Move on once the test passes.
4. Uncomment the next spec (should delete last item) and make sure the tests pass.
5. Finally Uncomment the last spec (should throw error if item not in list) and implement error handling so that the test passes. You have now implemented the required functionality and you know it has been done properly because the tests pass.

### 1.2 Test-Driven Development

TODO

### 1.3 Regression Testing

TODO

## 2 Code Coverage

If we are going to rely on our automated tests to guarantee our code runs as expected we need to check that these tests are _comprehensive_. There are two aspects we need to check:

1. Can our script handle both _good_ and _bad_ data.
  - bad data might include missing parameters as well as invalid data types or values (trying to access an array index that doesn't exist for example)
2. Do the automated tests test _every line of our code_ including all conditional branches.
  - this is called code coverage and there are automated tools to help us with this.

### 2.1 Running the Code Coverage Test

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

### 2.2 Installing Apache (Only for CodeAnywhere Users)

Thanks to _Jack Tidbury_ for supplying this solution.

If you are using **CodeAnywhere** as your development environment you will need to install a web server if you want to preview html web pages. Follow the instructions below. If you are developing locally you can just double-click the `index.html` file.

Start by istalling the **Nano tect editor** the **Apache** web server.
```
sudo apt-get update
sudo apt-get install nano apache2 -y
```
Now edit the configuration file `sudo nano /etc/apache2/sites-available/000-default.conf`.

Identify the line `DocumentRoot /var/html/` and change it to `/home/cabox/workspace` then save and exit the editor.

Next edit the main config file `nano /etc/apache2/apache2.conf` and edit the end to look like this:
```
<Directory /home/cabox/workspace/ >
    Options FollowSymLinks
    AllowOverride None
    Require all granted
</Directory> 

<Directory /usr/share> 
    AllowOverride None
    Require all granted
</Directory>

<Directory />
    Options Indexes FollowSymLinks
    AllowOverride None
    Require all granted
</Directory>
```
We have changed the directory that apache will use to server files and pointed it to our workspace directory. Secondly it allows requests from the root folder found at `/` to Require all granted allowing files to be served. Lastly the apache server needs to be restarted via the `sudo service apache2 restart` command.

This should restart the server without any errors. All thats left is to right click and preview the file you want to view, and hopefully it should all work.

### 2.3 Analysing the Code Coverage Report

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

### 2.3 Test Your Knowledge

It is immediately clear from the coverage report that there is a large chunk of code that is not being tested! If we are not testing code we have no confidence that it is working. The detailed report flags up the `decrement()` function.

1. Write unit tests to test that the `decrement()` function works correctly.
  - Make sure you test all code paths.
2. Periodically re-run the coverage tool and refresh the report page.
3. You are aiming for 100% code coverage.


## 4 Asynchronous Testing

In the previous section all module calls resolved immediately however it is often the case that a call may take a callback parameter to be executed in a different thread. Obviously we need to be able to test this type of code.

In this task we will be testing and debugging a module that uses third-party APIs to calculate taxi fares between named places. Taxi fares are calculated according to an [agreed formula](https://yourtaximeter.com/local-authorities/view/london-black-cabs). Start by understanding the project files.
```
.
├── index.js
├── modules
│   └── taxi.js
├── package.json
└── spec
    ├── medium-spec.js
    ├── routedata
    │   ├── cov_uni_cat.json
    │   └── cov_war_uni.json  
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

### 4.1 Test Your Knowledge

1. create a third _test suite_ to simulate a longer journey of more than 150 miles
  - use the `index.js` script to generate a suitable URL for the API and print this to the console
  - paste this into a browser tab to capture the standard response
  - paste this into a [json parser](http://jsonlint.com/) to check it is valid and tidy up the formatting
  - paste this into a new json file in the `routedata/` directory.
  - use the [taxi fare calculator](https://yourtaximeter.com/local-authorities/view/london-black-cabs) to calculate the correct fare.
  - add suitable specs to the new test suite
2. there is an error in the fare values returned, fix the error so that the tests pass.

## 5 Continuous Integration

TODO

## 6 Continuous Deployment

TODO

-------------------------

# Automated Testing

- Unit Testing
- Code Coverage
- Acceptance Testing

### Traditional Development

we write code until it 'works'

follow an agreed architectural design

### Why Test

Adding features often introduces bugs

Testing needs to take place on a regular basis

- Check that our new code works
- Check we have not broken earlier code!

Unfortunately manual testing is time consuming

So it is often left out…

### Automated Testing

Involves writing code to test your code

This code can be quickly run whenever you add a new feature

Like a robot to do all the boring stuff

Benefits:

- Run same tests repeatedly/accurately
- Run a large 'suite' of tests
- No human time wasted

- Quick one-click testing of all the code
- Prevents human error creeping in
- Ensure bugs have not crept into existing code
- Check that there are no bugs in new code
- When all the tests pass, your software is complete!

### Types of Automated Testing

- Unit Testing
  - Testing code logic directly (functions)
  - Sometimes called ‘white-box’ testing
- Acceptance Testing
  - Testing the application as a ‘user’
  - Sometimes called ‘black-box’ testing

### How Many Tests?

Cover all routes in code

Test median, edge and bad data cases

If in doubt add more tests…

Check code coverage

### Unit Testing

Automated testing

Write logic to test discrete parts of the application

Tests written before code is written

Take a bit of up-front time to write

Long-term savings

### Components

- An Assert Module
  - defines the tests to carry out
    - The built-in NodeJS Assert module
- A Test Runner
  - Carries out the tests and reports the results
    - The Jasmine package

The test runner is a program that runs the tests

In these examples we will be using Jasmine

a nodejs package

### Regression Testing

Are we introducing bugs in previously working code?

All existing code should be supported by exhaustive tests

Even if a test is passed we should always carry it out

All tests run every time code changes

### Fixing Bugs

Write a test to replicate the bug

Test should of course fail every time it runs

Try to fix the bug

Bug is fixed when the test(s) pass

Test name should match bug name/code

### Test-Driven Development

start by defining the goal

unit tests are both specification and documentation

we define our functionality through the tests

we write our tests before starting to 'code'

forces us to think about what we are writing

### TDD Workflow

- Write the tests first (they will fail)
- Write enough code to pass the tests
  - simplest solution that could possibly work
- Commit the working code
- Refactor the code to improve
- Comments/documentation
- Commit (again)

## Code Coverage

How much of the code is being tested?

Are all code branches being tested?

How many times are each line tested?

Helps identify any blind-spots

also consider range of test data...

### Coverage Criteria

- Function coverage
  0 Has each function in the program been called?
- Statement coverage
  - Has each statement in the program been executed?
- Branch coverage
  - Has each branch of each control structure been executed?
- Condition coverage (or predicate coverage)
  - Has each Boolean sub-expression evaluated both to true and false?

### Benefits of TDD

- Working code
- Enforcing single responsibility
- Conscious development
- Improved productivity

----------

Continuous Integration

The Problem

Adding new features can add bugs
Automated tests need to be run frequently
Possible to add commits that break code

If all tests pass the code needs to be deployed live

The Solution

Isolated changes are immediately tested and reported on as they are added
Gives quick feedback
If a bug is introduced into the code it can be quickly identified and fixed
Automates testing

GitLab CI

Built-in continuous integration service
Add a .gitlab-ci.yml file to the root directory of the repository
Configure the GitLab project to use a Runner
Each merge request or push triggers your CI pipeline.

Runners

A Docker Machine
Picks up builds through the coordinator API
Two types:
Shared Runners
Specific Runners

Pipelines

Three-stage pipeline:
Build
Test
Deploy
Stages can be omitted
Moves to next stage if tests return non-zero

Sample Build File
```yaml
stages:
 - test
 - deploy

unit_tests:
  stage: test
  script:
    - npm install
    - npm test

acceptance_tests:
  stage: deploy
  script:
    - gem install dpl
    - dpl --provider=heroku --app=test_server --api-key=xxxxxxxx
  only:
    - master
```