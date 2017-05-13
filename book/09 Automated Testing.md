
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
