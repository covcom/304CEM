# 305CDE Challenge 2

This challenge should be attempted after you have attended the second lab and worked through Worksheet 2 (_Functions and Objects Part 1_). You may need to attend other labs to fulfil some of the requirements.

## Guidelines

* Commit your solution to a new private project/repository in GitLab, and give it a sensible name: for example `305CDE Challenge 2`.
* Add the following members with _reporter_ permissions under `Settings > Members` for your project:
	- Mark Tyers `marktyers`
	- Jianhua Yang `jianhua`
	- Colin Stephen `c0lin`
* You are free to commit changes to your code to improve it further at any point up to the assessment submission deadline.
* You may not manage to satisfy all of the requirements, but you should aim to do so.
* Extended requirements may require knowledge from future lab sessions to complete.
* Marking will be based on how closely you meet the requirements, whether you attempt any of the extended requirements, and how maintainable your JS code is.

## Specification

Implement a user registration system (JS-based prototype).

## Requirements

### Minimal

* Provide a minimal user registration HTML and JavaScript page containing:
	- a form to input new user profile data
	- a list of currently registered users (initially empty)
* The profile form should contain:
	- Username
	- Name
	- Email address
	- Password
	- Age
* Form data should pass basic validation (done with JS)
* User profiles in the list should be stored as JavaScript objects with the appropriate properties and data types
* In addition to the form properties, each user should have a (hidden) unique ID number saved in their profile object
* When a user submits the form, JavaScript should update the list of currently registered users displayed
* There should be a button somewhere on the page to calculate the average age of currently registered users
* When the user clicks the button, the page should pop up an alert showing the average age of the users

### Extended

* Give the user an option to sort the current user list by age or by name, and update the list accordingly
* Prevent two users choosing the same username
* Give the user an option to filter the current user list by age `>=` a certain number, or age `<=` than a certain number

## Constraints

Use only HTML, JavaScript, and optionally CSS styling. Do not use any additional JS libraries.