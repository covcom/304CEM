# Closures

## About

This week covers objects and functions again, but with more advanced uses. These code patterns are what brings out the full power of JS and are essential for understanding JS code libraries that you might use for bigger projects.

In particular, the todo app in the `advanced_obj_fun` directory contains some example code that uses many of the key techniques you need to learn.

## Priority of Labs

* Basics
	- first_class_functions.html
	- function_closure.html
    - iife.html

## 3 Immediately-Invoked Function Expression

If you recall, JavaScript uses function-scoping which means that any variable or function defined inside a function is only visible inside it (local variable/private scope). Whenever you invoke a JavaScript function you create a new execution context and this context will contain any private variables and functions.

The *traditional* way to create this context is a two-step process, to *define* a function and then *call* it.

The principle behind an **IIFE** is to call a function as part of its definition