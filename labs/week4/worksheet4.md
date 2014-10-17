# 305CDE Worksheet 4

## About

This week's lab tasks will focus on two important areas where JS is used on the client side:

* interacting with the DOM,
* and asynchronously getting or setting data on remote servers, often referred to as AJAX.

Note that AJAX technically uses XML as the data format, but we will be using JSON which is easier to parse, and becoming the defacto standard for much data on the web.

The principles of asynchronous communication and client side _callback functions_ are effectively identical for XML and JSON though.

## Task List

The tasks this week are split in to two "tracks" depending on your confidence with JS.

* Follow the "Basic" track if you are still building confidence with functions and objects.
* Follow the "Intermediate" track if you were able to complete most of the tasks on the previous weeks' worksheets (and wish to learn more advanced techniques for your Challenge assigments).

Aim to complete these in roughly 60-80 minutes of lab time.

**NOTE:** If you can't complete the tasks during the lab time, then commit your changes to a fork of the 305CDE git repository (see [last week's worksheet](https://gitlab.com/c0lin/305cde/blob/master/labs/week3/worksheet3.md)) so that you can continue later. The techniques and knowledge developed this week will be very useful later. 

### _Basic_ Track

1. `events.html`
2. `map.html`
3. `JSON.html`
4. `ajax_basic.html`

### _Intermediate_ Track

1. `dom_scripting.html` and `js/dom_utils.js` or `js/dom_utils_global.js`
2. `ajax_sync.html` and `ajax_utils.js`

## Resources

* Links
* To
* Resources

## Step-by-Step (_Basic Track_)

### 1. Respond to DOM events

You have already seen events in JS: `window.onload` for example, is fired when the window has completed loading. Most interactive JS requires event handlers for a number of types of events. A handler is just a piece of code (typically a function) that is run when the event happens.

Most events are context-specific: that means they relate to the DOM element that the event involved, for example a `<button>` or a `<div>` with a particular `id` or `class` attribute.

You also need to know how to "turn off" event handlers that you no longer need.

The code you will look at below invokes handlers that check for methods and properties that are not shared across all browsers (browser incompatibility implies that _the same JS does not work in all browsers_). Libraries such as jQuery do this automatically, but it is important that you see how it is achieved: loading all of jQuery just to handle a click event is usually massive overkill, it is often better to keep the dependencies to a minimum.

* Load `events.html` in Brackets and preview its functionality.
* Note that the `window.onload` event is given a function (this should be familiar from previous weeks)
	* Observe that the function checks whether particular methods are available on `div` in the DOM
	* Depending on the method availability, the `onload` handler invokes a click handler on the `div` and _passes it a callback function_ called `handleClick`
* Note that the callback `handleClick` looks for a property called `target` on the event it is passed
	* Depending on the property availability, the callback correctly identifies the target element in the DOM 

## Step-by-Step (_Intermediate Track_)
