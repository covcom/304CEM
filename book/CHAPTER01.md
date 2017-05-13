
## Programming Language

Learning advanced programming techniques
All programming done in ECMAScript 6
Latest version of JavaScript
Significant update

## Server-Side Scripting

Communicate with file system
Databases

No web browser in sight...

## IO is Expensive

Waiting for IO to complete is big waste of resources
Three solutions:
synchronous
processes		Apache
threads			Node

## NodeJS

Node is a server-side runtime engine for JavaScript
A container that lets you run JavaScript without a browser
You can run programs written entirely in JavaScript to run the "server side" of web applications

## Why is this Good?

Often the web client will be written in JavaScript too
Less to learn
Not limited to web servers, it can do anything any other language can do (e.g. numerical modelling, statistics, image processing, etc.).

## NodeJS Threading Model

NodeJS runs in a single thread
JavaScript supports lambda / callbacks
Callbacks run in their own threads
After callback thread is destroyed

## NodeJS and ECMAScript 6

v6 supports most ECMAScript 6 features

Block scoping: let, const
Promises
Arrow functions
Iterators and Generators

## Object Creation

The preferred way to create objects in JS is using an “object literal”:
```
var empty_object = {}
var physicist = {
  "first-name": "Albert",
  "second-name": "Einstein"
  "age": 135
}
```
