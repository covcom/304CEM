---
title: 305CDE Week 11
subtitle: Using `map()` and `reduce()` in JavaScript and CouchDB
author: Colin Stephen
date: December 2014
header-includes:
    - \usepackage[all]{xy}
---

## Overview

* Types of programming
    * Imperative `for` loops over arrays
    * A bit about functional programming
* Important JS array methods
    * `Array.prototype.map()`
    * `Array.prototype.reduce()`
    * `Array.prototype.filter()`
* CouchDB
    * Selecting (map)
    * Grouping (reduce)
    * Searching (filter)

## Imperative vs Declarative vs Hybrid Languages

Imperative Languages

* Focus on _what steps the computer should take_ rather than what the computer will _do_.
    * C++, C, Java

Declarative

* Focus on what the computer should _do_ rather than on how it should do it.
    * Logic (Prolog)
    * Functional (Haskell)

Hybrid

* Mix imperative and declarative approaches.
* Python, _JavaScript_

# Imperative Approach

## Some Typical Code

Lots of `for` and `while` loops: i.e. _how_ to do the computation.

Example to retrieve a list of incomplete tasks for a user and sort by days remaining. First get the tasks.

```javascript
var getIncompleteTasksFor = function(who) {
  return fetchMonthlyTasks()  // returns a promise
    .then(function(data) {
      return data.tasks;
    })
```

## Some Typical Code (continued 1)

Then find the ones for this user.

```javascript
    .then(function(tasks) {
      var results = [];
      for (var i = 0, len = tasks.length; i < len; i++) {
          if (tasks[i].member == who) {
              results.push(tasks[i]);
          }
      }
      return results;
    })
```

## Some Typical Code (continued 2)

Then find the ones that are not completed.

```javascript
    .then(function(tasks) {
      var results = [];
      for (var i = 0, len = tasks.length; i < len; i++) {
          if (!tasks[i].complete) {
              results.push(tasks[i]);
          }
      }
      return results;
    })
```

## Some Typical Code (continued 3)

Then summarise with their title and a (calculated) number of remaining days.

```javascript
  .then(function(tasks) {
    var results = [], task;
    for (var i = 0, len = tasks.length; i < len; i++) {
        task = tasks[i];
        var today = new Date().getDate();
        results.push({
            title: task.title,
            remain: task.due - today
        })
    }
    return results;
  })
```

## Some Typical Code (continued 4)

Finally sort based on days remaining to complete.

```javascript
  .then(function(tasks) {
    tasks.sort(function(first, second) {
        return first.remaining - second.remaining;
    });
    return tasks;
  });
```

# The Functional Approach

## Previous Code Refactored

```javascript
var getIncompleteTasksFor = function(who) {
  return fetchMonthlyTasks()  // returns a promise
    .then(function(data) {
      return data.tasks
      .filter(function(task){return (task.member==who)})
      .filter(function(task){return !(task.complete)})
      .map(function(task){
        var remaining = task.due-(new Date().getDate());
        return {title: task.title, remain: remaining}
      })
      .sort(function(first,second){
        return first.remain - second.remain;
      });
    })
```

## Benefits of Functional Approach

* Code describes _what to do_ not how to do it
* Much shorter
    * Less to go wrong (e.g. changing a variable value)
    * Easier to read
    * Quicker to debug
    * Easier to unit test
* Can be parallelised easily
    * e.g. if task list contains 10 Billion tasks!

## How to Achieve These Benefits in JS

Available in "everyday" JS:

* first class functions
* lambdas / anonymous functions with closures
* compact (terse) functions
* function composition
* __functional array methods__ -- rest of this lecture

Available with some care in JS:

* mostly stateless processing
* currying: $f(x,y) \rightarrow f(x)(y)$
* side-effect-free function calls

## Array Methods

A few key array methods in JS offer a lot of "functional programming benefits". Look them up on MDN: map, reduce, and filter. These are present in many hybrid languages.

`Array.prototype.map()`

* Creates a new array with the results of calling a provided function on every element in this array.

`Array.prototype.reduce()`

* Apply a function against an accumulator and each value of the array (from left-to-right) so as to reduce it to a single value.

`Array.prototype.filter()`

* Creates a new array with all of the elements of this array for which the provided predicate function returns `true`.

## Map

* Takes a unary (1-argument) callback.
* Callback can return any JS object.

```javascript
var nums = [2,3,4,5,6,7];

var square = function(num) {return num*num};
var Counter = function(start) {this.value=start}

nums.map(square);  // returns [4,9,16,25,36,49]
nums.map(toString);  // returns ["2","3",...,"7"]
nums.map(function(num){ return new Counter(num); });
  // returns an array of Counter objects
  // with different start values
```

## Filter

* Takes a unary (1-argument) callback.
* Callback must return `true` or `false`.
* Such a callback is called a _predicate function_.

```javascript
var nums = [2,3,4,5,6,7];

var even = function(num) {return (num % 2 == 0)};
var morethan = function(min) {
  return function(num) { return (num > min); };
};

nums.filter(even);  // returns [2,4,6]
nums.filter(morethan(4));  // returns [5,6,7]
```

## Reduce

* Takes a binary (2-argument) callback and an _optional initial value_.
    * First callback argument represents the _intermediate result_ of processing so far
    * Second callback argument represents the next array item to be processed

```javascript
var nums = [2,3,4,5,6,7];
var sum = function(a,b) {return a+b};
nums.reduce(sum,0);  // returns 27
nums.reduce(sum,10);  // returns 37

var arrs = [[1,3], [5,7], [2,4]];
var concat = function(a,b) {return a.concat(b)};
arrs.reduce(concat,[]); // returns [1,3,5,7,2,4]
```

## Chaining

The array operations can be chained, for convenience.

```javascript
var nums = [2,3,4,5,6,7];

nums
  .filter(even)
  .map(square)
  .reduce(sum)

  // returns sum of squares of evens
  // i.e. 2*2 + 4*4 + 6*6 = 56
  // without using for loops
```

NB: all of this works on arrays of _any JS object_, for example __promises__!

# Application To CouchDB Views

## Key Observation

* You can just think of a CouchDB database like an _array of documents_!
    * (Actually it is a key/value store, but the same ideas apply).
* Which means you can use map, reduce, and (indirectly) filter across the DB documents.

## CouchDB Views

* Map and reduce callbacks are stored in _views_ by CouchDB.
* A map view will `emit` key/value pairs rather than `return` arbitrary objects.
    * Otherwise they are the same thing as described above.
* Reduce views have a `rereduce` flag to determine when to stop the reduction.
    * Otherwise they are (basically) the same thing as described above.

## Permanent vs Temporary

Primary tool used for querying and reporting on CouchDB documents.

**Permanent**

* stored inside special documents called design documents
* can be accessed via an HTTP GET request to `/{dbname}/{docid}/{viewname}`
    * `{docid}` has the prefix `_design/`
    * `{viewname}` has the prefix `_view/`

**Temporary**

* executed on demand
* HTTP POST request to `/{dbname}/_temp_view`
    * body of the request contains the code of the view function
    * Content-Type header is set to `application/json`.

## Map View Example

It is just a `map()` callback as we saw above!

```javascript
function(doc) {
  if (doc.Type == "customer") {
    emit(doc._id,
      {LastName: doc.LastName,
       FirstName: doc.FirstName});
  }
}
```

For each document in the database that has a `Type` field with the value `customer`, a row is created in the view. The value column of the view contains the LastName, and FirstName. The key for each documents is just the _id.

## Using a Different Key

If you wish to sort or filter on a field other than `_id`, just define your map function to emit the appropriate key:

```javascript
function(doc) {
  if (doc.Type == "customer") {
    emit(doc.LastName,
      {FirstName: doc.FirstName,
       Address: doc.Address});
  }
}
```

Here we have made the customer's LastName the key.

## Reduce View Example

* If a view has a reduce function, it is used to produce __aggregate results__ for that view.
* Reduce functions are associated with maps.
* It is essentially a `reduce()` callback as we saw above, with a few additional rules applied.
    * A reduce function is passed a set of intermediate values and combines them to a single value.

```javascript
function (key, values, rereduce) {
    return sum(values);
}
```

* the `rereduce` parameter is a boolean which can be used to stop the reduction at an "intermediate" stage
* __Constraint__: reduce functions must accept, as input, results emitted by its corresponding `map` function (in the same view) as well as results returned by the reduce function itself.

## Grouping

* Calling a reduce view over HTTP defaults to reducing to a single value
* Passing `group=true`, you get a separate reduce value for each unique key emitted by the map.
* For example given a DB of customer purchases:
    * use the map to emit a `(customer_ID, purchase_price)` key/value pair _for each purchase_
    * you may have multiple records in the view with the _same key_
    * do a reduce that returns the sum of the values (purchase prices) with `group=true`
    * this will return `(customer_ID, total_purchases)` key/value pairs, where the keys are now unique

## Reference

* See `http://wiki.apache.org/couchdb/` `Introduction_to_CouchDB_views`
* CouchDB map and reduce are only slightly different from regular `map()` and `reduce()` in JS
* If you understand the latter, then you can understand the former.