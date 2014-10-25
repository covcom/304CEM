# 305CDE Worksheet 5

## About

This week's lab tasks extend what you were working on in last week's tasks, namely:

* Responding to asynchronous events in your program.

The difference is that we will use a programming pattern that differs from _nested callbacks_ due to limitations of the latter.

We will employ a pattern that uses future-facing objects called "Promises", designed to deal with things that happen at any time in the future. See the [HTML5Rocks blog post](http://www.html5rocks.com/en/tutorials/es6/promises/) in the resources for further discussion of the type of code you will be working with in this lab.

The code here will take a while to fully understand. However, perseverance will pay off as promises are a very powerful pattern to invoke in event-based programming with JavaScript.

* They make your code more readable
* They make your code asynchronous

## Resources

### Tutorials

* [HTML5Rocks JavaScript Promises Overview](http://www.html5rocks.com/en/tutorials/es6/promises/)
* [Using native JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_native_JSON)
* [Getting Started with AJAX](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started)

### Downloads

* [ES6 Promise Polyfill code](https://github.com/jakearchibald/es6-promise) - use for reverse compatibility in non ES6-compliant browsers.
* [RSVP.js Asynchronous Library](https://github.com/jakearchibald/es6-promise) - contains ES6-promises and more!

## Task List

**NOTE:** Remember to commit your changes to a fork of the 305CDE git repository (see the [Week 3 worksheet](https://gitlab.com/c0lin/305cde/blob/master/labs/week3/worksheet3.md)) so that you can continue later. The techniques and knowledge developed this week will be very useful later.

1. Use promises to get a series of URLs and display their content.
2. Chain promises (that get URLs) together, then post-process their data in bulk.
3. Chain promises (that get URLs) together, while processing their data in real-time.

These three stages mirror the development of code in the [HTML5Rocks blog post on JS promises](http://www.html5rocks.com/en/tutorials/es6/promises/) so you can read that too, to aid understanding.

# Step-by-Step

## 1. Using promises to get a series of URLs

Here we begin to move from synchronous programming to asynchronous programming by introducing `Promise` objects.

* Begin with a quick review of the [Week 4 Worksheet](https://gitlab.com/c0lin/305cde/blob/master/labs/week4/worksheet4.md) which contains analysis of `ajax_sync.html`. That file contains code which synchronously gets URLs and populates the DOM with the contents parsed from the returned JSON data.
	* To show that the AJAX get request "blocks" other operations, add the following line before the final `</script>` closing tag in the `week4/code/ajax_sync.html` file: `addTextToPage("Hi from the end of the code");`
	* Tick the "Fake network delay" box and notice that the newly added text only appears after a few seconds, once the AJAX requests have completed.

The code you will look at this week gets and processes AJAX data _outside of the function execution chain_ - in other words "in the background" or asynchronously. That means your code does not get "blocked" from doing useful things while the data is still downloading.

* Open `ajax_async.html` and `js/utils.js` in Brackets and preview the functionality with 'live preview'.
* To simulate a more realistic scenario, tick the "Fake network delay" box and watch the page reload
	- Note that each chapter text arrives after some delay
* Hit F12 and load the "Network" tab to view the files being fetched using AJAX calls
* Refresh the page again
	- In the development tools, note the large gaps between the files being received (simulated network traffic).
	- This is what causes the slow chapter-by-chapter loading of the text on to the screen.

The loading of the text and its presentation in the DOM happens "chapter by chapter" here. This is similar to the sync version you looked at last week. _However, this time there is no **blocking** of other code in your program_. To see that your AJAX requests no longer block other code:

* As before, add the following line before the final `</script>` closing tag in the `ajax_async.html` file: `addTextToPage("Hi from the end of the code");`
* Refresh the page
	- Note that the newly added text appears immediately! The AJAX calls are left to execute in the background.

### Understanding how promises work

Promises essentially define actions to perform once other actions complete, whether successfully or not.

* Read through the JS code in `ajax_async.html`
* Note that there is only one big chain of code:
	- begins with `getJson(url)`
	- chains various `.then()` methods as well as a `.catch()` method

The chain of `then()` and `catch()` methods indicates that the `getJson()` call returns an object with these methods available. The object returned is called a "JavaScript promise object", and the methods set out what to do _when the action associated with the promise completes successfully or fails to complete_.

* To confirm that `getJson()` returns one of these "promise" objects, look in `js/utils.js` at the definition of the function `getJson()`
* Note that it is a wrapper for a call to `get()` which also has a `then()` method.
* This indicates that `get()` returns a "promise" object. To verify this, look at the definition of `get()` and you will see that it does indeed:
	- _construct_ a `new Promise()` object
	- returns a promise (actually one composed of two actions)

### Test your understanding

* Add an additional `then()` call at an appropriate place in `ajax_async.html` (you will need to be careful with nesting) which pops up a confirmation dialog after each new chapter is displayed.
* The confirmation should ask whether the user wishes to continue downloading the next chapter
	- if so, progress as normal
	- if not, throw an exception, for example:

```javascript
var err = {message: "User aborted download"};
throw(err);
```

* Throwing an `err` object like this will pass it on to the `.catch()` method down the chain, which will show the message on the screen.

