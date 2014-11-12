---
title: 305CDE Challenge 7
author: Dr. Jianhua Yang
date: 12 November 2014
header-includes:
	- \usepackage[margin=1.5in]{geometry}
	- \usepackage{fancyhdr}
    - \pagestyle{fancy}
    - \lhead{305CDE Challenge 4}
    - \chead{}
    - \rhead{\thepage}
    - \lfoot{}
    - \cfoot{}
    - \rfoot{}
---

# 305CDE Challenge 7

This challenge should be attempted after you have attended the seventh lab and worked through Worksheet 7. You may need to attend other labs to fulfil some of the requirements.

## Guidelines

* Commit your solution to a new private project/repository in GitLab, and give it a sensible name: for example `305CDE Challenge 4`.
* Add the following members with _reporter_ permissions under `Settings > Members` for your project:
	- Mark Tyers `marktyers`
	- Jianhua Yang `jianhua`
	- Colin Stephen `c0lin`
* You are free to commit changes to your code to improve it further at any point up to the assessment submission deadline.
* You may not manage to satisfy all of the requirements, but you should aim to do so.
* Extended requirements may require knowledge from future lab sessions to complete.
* Marking will be based on how closely you meet the requirements, whether you attempt any of the extended requirements, and how maintainable your JS code is.

## Specification

Implement a Twitter-posting form using AngularJS and the Twitter JSON API.

## Requirements

You should design your form using various controls for example textbox, radio button, drop-down list etc. All these inputs need to be displayed back to the user before it is posted using a submit button.

You should perform different validations to check user inputs, and make sure the total length of the message doesn't exceed 140 characters. 

