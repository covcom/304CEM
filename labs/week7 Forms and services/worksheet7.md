---
title: 305CDE Worksheet 7
author: Dr. Jianhua Yang
date: 12 November 2014
header-includes:
- \usepackage[margin=1.5in]{geometry}
- \usepackage{fancyhdr}
- \pagestyle{fancy}
- \lhead{305CDE Worksheet 5}
- \chead{}
- \rhead{\thepage}
- \lfoot{}
- \cfoot{}
- \rfoot{}
---

# About

This is the second of a series of 6 labs on AngularJS. In the first week, I introduced you some basic AngularJS concepts for example modules and controllers. I also briefly demonstrated some simple directives such as ng-repeat. The aim of the current lab is

1. Forms in AngularJS, including various controls and validations.
2. Introduction of AngularJS services.

# Resources

You should always remember to check out the manual, as that gives us the most accurate explanation.

* [Official AngularJS guide on forms](https://docs.angularjs.org/guide/forms)
* [Official AngularJS guide on services](https://docs.angularjs.org/guide/services)
* [Try, Catch, Fail: Angular JS: Form Validation](http://www.benlesh.com/2012/11/angular-js-form-validation.html)

# Task List

1. Setup basic forms and perform two-way data binding
2. Simple form validation, accessing form states
3. Using different controls within a form
4. Using AngularJS services

The first three tasks are today's main focus; while the last will take a while to understand, but it's also quite important.

# Step-by-Step

## 1. Setting up basic forms

Open file form_intro.html, get yourself familiar with the syntax of setting up forms in AngularJS. You should be familiar with HTML forms already. If not, try to find a good tutorial online. Try to answer the following questions:

1. Note the use of "ng-submit" attribute. Can we use an onClick listener instead?
2. "user" is not initialized in the controller. What advantages do we have doing it this way?

### Test your understanding

Set up an array to host all submitted names and display back in the HTML.

## 2. Form validation

The next file you will look at is validation.html. There are some new attributes introduced here, for example ng-disabled and ng-minlength. Try to input to the firstname textbox, and notice how the submit button becomes enabled.

In fact, the form and each of its control have five states, which we'll cover shortly in the theoretical section. Have a look at the online tutorial at [Try, Catch, Fail: Angular JS: Form Validation](http://www.benlesh.com/2012/11/angular-js-form-validation.html) and see how each state changes after your click.

### Test your understanding

Modify validation.html to display back the state of the two input textboxes in the html in a way similar to the online tutorial.

## 3. Drop-down list

Apart from textbox, there're quite a number of form UIs that are supported by AngularJS. Some are listed below for your convenience:

* [input](https://docs.angularjs.org/api/ng/input)
* [select](https://docs.angularjs.org/api/ng/directive/select)

In select.html you'll see an example of a drop-down list. Once you understand this file, go to the online manual at https://docs.angularjs.org/api/ng/directive/select and make sure you understand the example shown there.

### Test your understanding

Use a text box to build a drop-down list in a accumulative manner.

## 4. AngularJS services

AngularJS services are very important. It allows controllers to exchange info wich each other, and to use system-wide 'services' for example the browser winder. The example service.html is adapted from the online guide at https://docs.angularjs.org/guide/services. Note the syntax changes between the two versions, and try to answer the following:

In service.html, what is 'win', that argument passed into the anonymous function in line 26?

### Test your understanding

Give the user a warning message only if the number of errors in a form is more than 3.
