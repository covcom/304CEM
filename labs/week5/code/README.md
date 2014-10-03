# JavaScript Promises

## About

This example code is based on the [HTML5Rocks JavaScript Promises Tutorial][tutorial]. It builds on the synchronous JS example from Week 4. Read the tutorial for a really good explanation of how it works.

The code applies promises in an increasingly efficient way.

## Order of Labs

1. `ajax_async.html`
2. `ajax_async_all.html`
3. `ajax_async_best.html`

## Files

The `js` directory contains a shim for browsers not supporting ECMAScript6 natively, called `promise-2.0.4.min.js`. You can generally ignore the shim.

Non-promise related functionality, i.e. the AJAX itself, is inside the `utils.js` file.

The `data` directory contains the JSON data for this example. **IMPORTANT NOTE:** read below if you are not using a web server.

## Running the Code

Due to browsers' security policies the code will fail if you are testing the page via a `file:\\` address in the browser, since [cross origin requests][cors] are only supported with `http(s):\\` and the relative URL supplied trips up the check.

In other words, to use the JSON files in the `data` directory you will need to serve the page from a web server and access the HTML files via `http(s):\\`.

#### Workaround

Swap in the suggested Github Gist URLs _found in the comments within the HTML_ files, which will allow direct access to the JSON files from the web.


[tutorial]: http://www.html5rocks.com/en/tutorials/es6/promises/
[cors]: http://en.wikipedia.org/wiki/Cross-origin_resource_sharing