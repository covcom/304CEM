# 305CDE Challenge 1

This challenge should be attempted after you have attended the first lab and worked through Worksheet 1. You may need to attend other labs to fulfil some of the requirements.

## Guidelines

* Commit your solution to a new private project/repository in GitLab, and give it a sensible name: for example `305CDE Challenge 1`.
* Add the following members with _reporter_ permissions under `Settings > Members` for your project:
	- Mark Tyers `marktyers`
	- Jianhua Yang `jianhua`
	- Colin Stephen `c0lin`
* You are free to commit changes to your code to improve it further at any point up to the assessment submission deadline.
* You may not manage to satisfy all of the requirements, but you should aim to do so.
* Extended requirements may require knowledge from future lab sessions to complete.
* Marking will be based on how closely you meet the requirements, whether you attempt any of the extended requirements, and how maintainable your JS code is.

## Specification

Implement a browser-based calculator.

## Requirements

### Minimal

* The calculator contains form buttons for the numbers and all mathematical operations: "+, *, /, -, ="
* The calculator displays its result in an input field in the same form when the user clicks "=".
* Only single operations are permitted: for example "4-393" is OK, but "5+2+9" is not (it has two "+" operations).

### Extended

* Either of:
	* The calculator displays "ERROR" if the calculation is not valid: for example, "123+*/321" is not valid.
	* The calculator prevents invalid calculations being input.

* The calculator has a "batch mode":
	* It allows you to enter multiple calculations and queue them by pressing a new button "Q" on the calculator instead of "=".
	* All queued calculations are shown on the page.
	* When the user presses "=" all the calculations are performed and the results ouput to the page.

* Your solution does not use `eval()`.

## Constraints

Use only HTML, JavaScript, and optionally CSS styling.