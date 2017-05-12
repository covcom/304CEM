
# Introduction

This book covers advanced programming concepts using multiple paradigms. It is assumed that you are already comfortable writing and testing large amounts of code.

By the end of this book you will:

- Have learned cutting-edge JavaScript skills
- Be capable of developing powerful, complex APIs using NodeJS, a version of JavaScript that runs on the server
- Be able to employ industry-standard skills
- Be able to write complex automated testing suites
- Have mastered the key aspects of version control

So why learn about developing web APIs?

- Businesses rely on Web APIs.
- All modern websites and smartphone apps rely on APIs to communicate.
- JavaScript is the most popular language in the world.
- NodeJS is the most important language for server-side programming.

## Book Structure

The book is divided into three parts. In part (chapters 1-3) one we cover the principles behind the latest JavaScript (ECMA) language. In part two (chapters 4-6) we cover how to design RESTful APIs and how to build these. In the final part we cover a range of advanced topics to help you when you start writing more complex API.

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
