# JavaScript Functions and Objects

This worksheet continues the work started in the **JavaScript Basics** worksheet. You should ensure this has been completed before starting this one.

## Task List
Aim to complete these in roughly 30-60 minutes of lab time.

1. Nest objects to define the internal sub-components of a car and engine.
2. Use an inner “helper function” to calculate fuel consumption.

## 1 Merging 

Over the course of the module there will be changes made to the original read-only repository on GitHub. Luckily Git keeps track of the original repository it was forked from. This is referred to as **upstream/master**. Before you start this worksheet take a few moments to sync your fork which will keep it up to date with the original.
```
git fetch upstream
git checkout master
git merge upstream/master
```
This will pull down any new files or changes from the GitHub repository.

## 2 Basic Debugging

For a much more detailed description read Google’s debugging JavaScript guide.

Sometimes your attempts to change the code will introduce bugs. A bug is usually signalled by some kind of error message, usually RED in colour, appearing on the console. If you find a bug has appeared in your code do the following to help track it down:

1. Note the line number that caused the problem, if any is mentioned on the console output (sometimes it is not)
2. Load the ‘Sources’ tab in the developer tools area and select the JS file
3. Click in the margin next to any line number to add a code break (add it
near but before the suspect line); you can add several if you wish
4. Now refresh the page and proceed as normal until the code execution stops
at the line break you created
5. On the information tab on the right hand side you will see details about
the call stack and currently scoped variables to help you pinpoint the state
of your program
6. Use the “Step over / into / out of” buttons to execute your JS line by line
and keep an eye on the stack and scope to catch anything unexpected

If your code is always perfect(!) then please introduce an intentional syntax
error in contact.js to practice the procedure above.


## 3 Nested Sub-Object Assignment

In this task you will extend an existing JS object by nesting further object(s).

1. Open the `function_returns_object.html` file in Brackets.
2. View the live preview and hit F12 to view the developer tools JS console.
NOTE: all output from the JS appears on the console.
3. Refresh the browser to see alternative outputs.
4. Review the JS in the html file and ensure you understand how it works.

### 3.1 Test Your Understanding

1. Add a `makeEngine()` function that constructs and returns random engine objects. Engines might be characterised by:
• Cylinders
• CC Volume
• Fuel type (diesel, petrol, etc.)
• Max torque
2. Use the new function inside the `makeCar()` function, to make an engine and add it to the car object returned by `makeCar()`.
3. Ensure you include the engine details in the console log to show that it works.

## 3. Nested Helper Functions

In this task you will modify an existing method of an object and “factor out” some of its code in to a separate internal “helper function” which does an intermediary calculation.
1. Open the object_methods.html file in Brackets.
2. View the live preview and hit F12 to view the developer tools JS console.
NOTE: all output from the JS appears on the console.
3. Review the JS in the html file and ensure you understand how it works.

### 3.1 Test Your Understanding

1. Add an empty internal `updateFuel()` function within the `drive` method of the **fiat** object.
2. Add code to the new helper function which updates the fuel by decrementing the fiat’s fuel by 1.
3. In the original `drive()` method, instead of the assignment `this.fuel = this.fuel - 1`, invoke your new function.
4. Refresh the page and ensure that the console output is exactly the same as before
5. Also test it by adding an appropriate code break in the *Sources* tab of your file in Chrome developer tools, and watch the value of `fiat.fuel` change as you step through the calls to the `fiat.drive()` method.