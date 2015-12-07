# JavaScript Basics

This worksheet is mainly about getting started with JavaScript development. It will also cover some of the absolute basics of the language.

Before starting this worksheet you must complete the introductory steps described on the repository home page (https://github.com/covcom/305CDE). This covers configuring the Cloud 9 IDE and forking the repository.

## Tasks

1. Get the first JS example running in your browser and try to understand
the code
2. Use the Chrome browser developer tools to fix any bugs introduced in the
second JS example
3. Use the Brackets JSLint feedback to improve the code in the third JS
example

## 1 Live Preview

In this first exercise you will learn how to preview your running website. This will allow you to make changes to the code and quickly se how it affects the page. There are two ways to achieve this and you will be shown both.

Start by opening the file basic_math.html in the Cloud 9 editor.

### 1.1 Embedded Browser
<img align="right" width="250" src="images/preview.png">
Cloud 9 contains an embedded browser to allow you to view your running page in a panel within the IDE. Select the html document by clicking anywhere inside it then from the top navigation click on the **Preview** button and select the **Live Preview** option. Note that it indicates which file you will be previewing.

### 1.2 External Browser
Whilst the embedded browser can be useful, sometimes you will want to make use of the powerful debugging tools provided by the native browser. For this to work, Cloud 9 spins up an Apache web server and displays the URL to paste into the browser.

Click on the **Run** button in the top navigation. This will start up the Apache web server. If you look at the bottom panel of the editor you will see the url. Select this, copy to the clipboard then paste into the **Chrome** web browser.
```
Starting Apache httpd, serving https://.../basic_math.html.
Started apache2
```
### 1.3 Test your understanding
1. modify the JS code to double the discount applied when the quantity ordered is greater than 100 items
2. modify the HTML form to include a shipping field, and include this value in the total calculation in shopping.js
3. commit your changes locally (see detailed instructions below)
```
git status
git add .
git status
git commit -m 'completed basic math exercise'
git status
git push origin master
```
## 2 Chrome Developer Tools

The **Chrome Developer Tools** are a set of debugging tools built into the Chrome web browser. For complete documentation you should visit https://developers.google.com/web/tools/chrome-devtools/

### 2.1 Console Output

- Load up `conditionals_booleans.html` and go to the live preview
- Enter some valid inputs into the form and submit it

"Nothing" happens... Actually, the result is being logged to the console which is a part of the *Chrome Developer Tools* integrated in to the browser.

- load the developer tools (either F12 or via the *hamburger* menu in the top-right of the toolbar)
- Click on the console tab and try submitting the form again (you can ignore
errors at this point) to see output
• Go back to the Cloud 9 IDE and load `contact.js` to see where this output comes
from

#### 2.1.1 Test your understanding
1. modify the HTML form to include a “Full Name” field
2. add validation in contact.js to ensure that the name entered has at least two parts separated by a space, and is between 3 and 100 characters in length

## 3 Code Checking

Writing clean, readable, and error-free high-quality code is essential to main- tainability. Therefore most languages now have automated syntax and style “checkers” called linters that code editors and IDEs can use to alert potential problems to programmers immediately, when they are writing their code.

One such linter for JavaScript is called JSLint, and it is built in to the Brackets editor to help you improve any code you work with.

1. Load up switch_case.html in Brackets
2. Locate any warnings, these appear next to the line numbers. Hover over each of these to find out the cause
3. Correct the code to remove all errors and warnings

Note that many of the highlighted issues are about things like indentation, and consistency of style, as well as syntax. That is because linters take readable code very seriously, and so should you! You should aim to have no JSLint warnings when you write your JavaScript or other programming code.

1. Go to the live preview of the switch_case.html file to see what it does
2. Load the js/membership.js file and follow the code to determine how it
works

### 3.1 Test your understanding

Once you have corrected for any JSLint errors found by the code linter, do the following.
1. Add a payment method field to the form with options for "Debit Card, Credit Card, Cash, Gold Bullion"
2. Add additional switch-case processing in the JavaScript to apply a 2% charge for Credit Card, and a 5% discount for Gold Bullion

## 4 Task List Manipulation

In this task you will write a simple function to detect and remove duplicates from a task list.
1. Open the `simple_function.html` file.
2. View the live preview and test out what the page does.
3. Load the associated JS file `js/tasks.js` in Brackets and check you undestand how it works. In particular you need to identify the function that gets called when the button is clicked.

### 4.1 Test Your Understanding

1. Modify the function that is called when the button is clicked
2. when clicked the new item should only be added to the list if it is not already in it (prevent duplicates being added)
3. add a new button called **Capitalise**.
4. when clicked this should trigger a new function that loops through the list items and makes them all upper-case.

## Presentation

The lab slides can be accessed below:

https://goo.gl/YMWU2s
