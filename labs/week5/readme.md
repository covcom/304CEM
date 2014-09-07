# JavaScript Promises

## About

This example code comes from the HTML5Rocks JavaScript Promises [tutorial](http://www.html5rocks.com/en/tutorials/es6/promises/). It builds on the synchronous JS example from Week 4.

The code applies promises in an increasingly efficient way.

## Order of Labs

1. `ajax_async.html`
2. `ajax_async_all.html`
3. `ajax_async_best.html`

## Files

The `js` directory contains a shim for browsers not supporting ECMAScript6 natively, called `promise-2.0.4.min.js`. Non-promise related functionality, i.e. the AJAX, is inside the `utils.js` file.

The `data` directory contains the JSON data for this example. **NOTE:** read below if you are not using a web server.

## Running the Code

Due to browsers' security policies the code will fail if you are testing the page via a `file:\\` address in the browser, since [cross origin requests](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) are only supported with `http(s):\\` and the relative URL supplied trips up the check.

In other words, to use the JSON files in the `data` directory you will need to serve the page from a web server and access the HTML files via `http(s):\\`.

### _Alternatively_

Swap in the suggested Github Gist URLs found in the comments within the HTML files, which will allow direct access to the JSON files from the web.
