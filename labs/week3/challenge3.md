# 305CDE Challenge 3

This challenge should be attempted after you have attended the third lab and worked through Worksheet 3 (_Functions and Objects Part 2_). You may need to attend other labs to fulfil some of the requirements.

## Guidelines

* Commit your solution to a new private project/repository in GitLab, and give it a sensible name: for example `305CDE Challenge 3`.
* Add the following members with _reporter_ permissions under `Settings > Members` for your project:
	- Mark Tyers `marktyers`
	- Jianhua Yang `jianhua`
	- Colin Stephen `c0lin`
* You are free to commit changes to your code to improve it further at any point up to the assessment submission deadline.
* You may not manage to satisfy all of the requirements, but you should aim to do so.
* Extended requirements may require knowledge from future lab sessions to complete.
* Marking will be based on how closely you meet the requirements, whether you attempt any of the extended requirements, and how maintainable your JS code is.

## Specification

Implement "Shopping Basket" functionality in JS, suitable for a basic e-Commerce web application.

## Requirements

### Minimal

#### Items

* Implement an `Item` constructor function that can be invoked with the `new` keyword to create shopping items
* Each item object should have:
	* Title
	* Description
	* Price
* Invoke the constructor several times to create a number of objects
* Each item should then be displayed on the page with its details and a "Add to basket" button

#### Basket

* The internal state of the basket should be maintained via a function closure
* Basket state should include:
	* list of items
	* total number of items
	* running total of cost
* The current number of items in the basket should be displayed somewhere on the page
* Include a "Show Basket" button on the page
	* Clicking the button should pop up an alert showing the current Basket state

### Extended

* Implement your Basket as a module that can be added to any page with `Item` objects on it which contain `Title`, `Description` and `Price` properties.

## Constraints

Use only HTML, JavaScript, and optionally CSS styling. Do not use any additional JS libraries.