% 305CDE Lab 3
% JavaScript Objects and Functions: Part II
% October 2014

## Overview

* Objects
* Functions

# Objects

## Prototypes

* There are _no classes_ in JavaScript
* JS is a "prototypal" inheritance language
* Objects can inherit properties _directly from other objects_

# Functions II

## Function Invocation and `this`

Remember from last week:

* The value of `this` inside the scope of the function _depends on how the function was invoked_:
    - method (last week)
    - function (last week)
    - constructor
    - `apply`

## Constructor Invocation

```javascript
var Quo = function(string) {
  this.status = string;
};

Quo.prototype.get_status = function() {
  return this.status;
};

var myQuo = new Quo("confused");
myQuo.get_status();  // returns "confused"
```

* Keyword `new` used during function invocation
* Creates a new object which includes a link to the function's `prototype` member
* Keyword `this` becomes bound to the new object
* Constructor invocation returns the object