# 305CDE Worksheet 4

## About

This week's lab tasks will focus on two important areas where JS is used on the client side:

* interacting with the DOM,
* and asynchronously getting or setting data on remote servers, often referred to as AJAX.

Note that AJAX technically uses XML as the data format, but we will be using JSON which is easier to parse, and becoming the defacto standard for much data on the web. The principles of asynchronous communication and client side _callback functions_ are effectively identical for XML and JSON though.

## Resources

* [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
* [The DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
* [Using native JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_native_JSON)
* [Getting Started with AJAX](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started)

## Task List

The tasks this week are split in to two "tracks" depending on your confidence with JS.

* Follow "Track 1" if you are still building confidence with functions and objects.
* Follow "Track 2" if you were able to complete most of the tasks on the previous weeks' worksheets (and wish to learn more advanced techniques for your Challenge assigments).

Aim to complete these in roughly 60-80 minutes of lab time.

**NOTE:** If you can't complete the tasks during the lab time, then commit your changes to a fork of the 305CDE git repository (see [last week's worksheet](https://gitlab.com/c0lin/305cde/blob/master/labs/week3/worksheet3.md)) so that you can continue later. The techniques and knowledge developed this week will be very useful later. 

### Track 1

DOM:

1. `events.html`
2. `map.html`

AJAX:

3. `JSON.html`
4. `ajax_basic.html`

### Track 2

The JavaScript on this track is a little more complex.

DOM:

1. `dom_scripting.html` and `js/dom_utils.js` or `js/dom_utils_global.js`

AJAX:

2. `ajax_sync.html` and `ajax_utils.js`

# Track 1

## 1. DOM events

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

### Test your understanding

* Add a new `div` containing some text
* Add a "mouseover" event listener on your new `div`
* Add a mouseover handler which alerts the user which element ID was hovered over

## 2. DOM elements

The DOM is essentially a description of the elements on a web page along with their attributes, properties, and accessible methods. See the references above for a more detailed run through of what the DOM is. To see JS interacting with the DOM, follow the next steps.

* Load `map.html` and preview the functionality via Brackets
* Observe that the `showCoords()` function sets the `innerHTML` property of a DOM element
* Also observe that the `addtext()` function _dynamically adds a new element to the DOM_ ( a "text node").
	* Similarly you can add other HTML tags such as `<a>` or `<p>` etc., or update their attributes 

### Test your understanding

Do these after a quick scan of the [MDN DOM introduction](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).

* Use the `createElement` method of the `document` object to add a new list `<ul>` to the DOM
* Populate this list using a JS `for` loop which uses `appendChild` to add list items `<li>`, using the new `<ul>` as the parent node.
* Use a nested `innerHTML` assignment to put some text in your list items.

## 3. JSON

See the MDN [Using native JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_native_JSON) guide to help understanding the two key JSON methods described here.

JSON is the "JavaScript Object Notation" and is a way of describing structured data which is particularly useful in JS because it corresponds very closely to the object literal syntax.

It's two main methods are for converting strings to and from "native" JSON objects that your JavaScript program can work with.

* Load `JSON.html` and preview it, making sure to view the console output using F12.
* Note that the first output corresponds to accessing a property of a JS object that was _created_ from a string using `JSON.parse()`.
* Note that the second output corresponds to displaying in text format (also suitable for transmission over HTTP) the contents of a JS object, including its property names and values. 

### Test your understanding

* Define a new JS object in the `JSON.html` script which also contains _nested objects_ (recall that JS objects can be nested multiple times) as some of its properties. For example:

```javascript
var employee = {
	name: { first: "Colin",
			second: "Stephen" },
	title: "Assistant Lecturer"
}
```

* Convert your object to a JSON string `myString` and display it in a `<div>` somewhere on the page
* Convert the string _back to a JS object_ `myObject` and assign one of the _nested_ objects to a new variable. For example:

```javascript
var employeeName = myObject.name;
```

* Stringify the new subobject and display it in another `<div>` elsewhere on the page.

## 4. AJAX in different browsers

AJAX essentially uses the JavaScript `XMLHttpRequest` object to communicate with server-side scripts. It can send as well as receive information in a variety of formats, including JSON, XML, HTML, and even text files.

In this section we will see the main "workflow" involved in making an AJAX request and processing a response using a _callback function_. The code also takes account of browser inconsistencies, which is usually done automatically if you are using jQuery, for example.

* Load the `ajax_basic.html` file in Brackets and preview it with live preview
	* **NOTE** If you do not use live preview the AJAX call will fail due to cross domain security restrictions used by most servers/browsers
* Note that clicking on the "ajaxButton" will call a function that makes a request to a certain URL
* The `makeRequest()` call first checks which suitable HTTP request methods are available in the browser
	* In _modern_ browsers, `window.XMLHttpRequest` will be available. This is the standard approach to AJAX if you don't need to support older browsers.
* Having set an appropriate `httpRequest` object, the code assigns a callback called `alertContents` to an event listener `onreadystatechange` on the object that is triggered when the actual HTTP request completes and returns some data or an error.
* Finally the `httpRequest` objects calls its `open()` and `send()` methods to get the data from the given URL.

The `alertContents` function also uses the `httpRequest` object (note that it is defined within an immediately invoked function expression!):

* The alert checks whether the new `readyState` on the request object corresponds to the completion of the request (value `=== 4`)
* If so, and if the server response status indicates success (value `=== 200`), then the `responseText` from the HTTP response is shown in an alert.  

### Test your understanding

You can make a simple "404" checker as follows.

* Add a text input element to the page which the user can type a URL in to.
* Add a button that when clicked tries to do an AJAX http request to the given URL.
* Define a new callback function, similar to `alertContents` which checks whether the requested URL has a "404" status or not.
* If it does, pop up an alert saying "Site is DOWN!"
* Adjust the appropriate event listener in the `makeRequest` function of `ajax_basic.html`, so that your new callback is set as the handler for all HTTP requests made by your checker page.
