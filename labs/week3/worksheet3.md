# 305CDE Worksheet 3

## About

This week covers more advanced uses of objects and functions in JS.

Objects and functions are extremely powerful. This week explores some of the more advanced ways you can use both of them.

## Task List

Aim to complete these in roughly 30-60 minutes of lab time. Use SourceTree git client and Brackets editor, _or other equivalent software that you are familiar with_.

1. Set up a secondary remote repository to store your worksheet solutions.
2. Write a simple function to remove duplicates from a task list.
3. Nest objects to define the internal sub-components of a car and engine.
4. Use an inner "helper function" to calculate fuel consumption.

## Resources

[Working with git remote repositories](http://git-scm.com/book/en/Git-Basics-Working-with-Remotes)

## Step-by-Step

### 1. Set up a second remote repository

#### Motivation

Now that the code you are writing in lab sessions is more complex, you may wish to keep track of your solutions to the tasks.

Currently you are pulling changes from the remote origin on GitLab, containing the files for 305CDE. However, this repository is _read only_ and you cannot push any changes to the repository.

To enable you to work on the repository, keep it up to date, AND keep track of your versioned changes you need another read-write remote repository that you can push your changes to.

In this task you will use the _git shell/terminal_ to achieve this.

#### Fork the 305CDE repo

`Forking` allows you to copy an entire repository to your own account.

* Log in to your GitLab account
* Browse to the [305CDE repository]()
* On the top right of the project screen click "Fork"
* Load your GitLab dashboard and you will see `305CDE` in your list of projects
* View the project page and note that it shows the original repo you forked from, as shown in the screenshot.

![305CDE Repository forked to user account](static/gitlab-forked-project.png)

* If you wish to keep your new copy private, view settings and set the "Visibility Level" to _Private_. 
* Copy the project `https://` URL listed on the project page for the next steps.

#### Using the git shell

Next you will configure your git client to push any changes to your fork of the repository

* First select the git repo you are working on in the left hand column of SourceTree, if you have more than one  
* Click on 'Terminal' in the toolbar of SourceTree to load a git shell
	* The terminal provides a text-input interface to git
	* All changes you do are reflected in the GUI later
	* It is much faster to use than the GUI
	* It will become easier to understand and use than the GUI too
* For information, list the current remote origin by typing `git remote -v` in the terminal
	* You will see the 305CDE repo origin listed for pushing and pulling, as shown in the screenshot.

![Git remote origin in shell](static/git-remote-origin-305cde.png)

* To add a new remote corresponding to your fork of the project
	* `git remote add myfork https://your-https-url-for-the-fork`
* Check that it was added correctly with `git remote -v` again
	* This should now show a push and pull URL for `origin` and also for `myfork`

Now you can push any changes you make in labs to your remote `myfork`. The GUI gives you an option to choose which remote to push or pull from. In the terminal, you can push to the fork with the command `git push myfork`. 

NOTE: A simple `git push` will default to origin, which will fail.

### 2. Task List Manipulation

In this task you will write a simple function to detect and remove duplicates from a task list.

* Open the `simple_function.html` from `labs/week2/code/` in Brackets.
* View the live preview and test out what the page does.

![To-Do example live preview](static/to-do-live-preview.png)

* Load the associated JS file `js/tasks.js` in Brackets and check you understand how it works.

#### Test Your Understanding

1. Add a button to the html page labelled "Remove duplicates".
2. When clicked, this button should trigger a new function `removeDuplicates()` against the `tasks` list.
3. The removal function should parse the list and remove any identical copies of previous items (leaving at most one).

### 3. Nested Sub-Object Assignment

In this task you will extend an existing JS object by nesting further object(s).

* Open the `function_returns_object.html` file in Brackets.
* View the live preview and hit F12 to view the developer tools JS console. **NOTE:** all output from the JS appears on the console.
* Refresh the browser to see alternative outputs.
* Review the JS in the html file and ensure you understand how it works.

#### Test Your Understanding

1. Add a `makeEngine()` function that constructs and returns random engine objects. Engines might be characterised by:
	* Cylinders
	* CC Volume
	* Fuel type (diesel, petrol, etc.)
	* Max torque
2. Use the new function inside the `makeCar()` function, to make an engine and add it to the car object returned by `makeCar()`.
3. Ensure you include the engine details in the console log to show that it works.

### 4. Nested Helper Functions

In this task you will modify an existing method of an object and "factor out" some of its code in to a separate internal "helper function" which does an intermediary calculation.

* Open the `object_methods.html` file in Brackets.
* View the live preview and hit F12 to view the developer tools JS console. **NOTE:** all output from the JS appears on the console.
* Review the JS in the html file and ensure you understand how it works.

#### Test Your Understanding

1. Add an empty internal `updateFuel()` function within the `drive` method of the `fiat` object.
2. Add code to the new helper function which updates the fuel by decrementing the fiat's fuel by 1.
3. In the original `drive()` method, instead of the assignment `this.fuel = this.fuel - 1`, invoke your new function.
4. Refresh the page and ensure that the console output is _exactly the same as before_.
5. Also test it by adding an appropriate code break in the "Sources" tab of your file in Chrome developer tools, and watch the value of `fiat.fuel` change as you step through the calls to the `fiat.drive()` method.
