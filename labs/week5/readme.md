# JavaScript Promises

## About

This example code comes from the HTML5Rocks JavaScript Promises [tutorial](http://www.html5rocks.com/en/tutorials/es6/promises/). It builds on the synchronous JS example from Week 4.

The code applies promises in an increasingly efficient way.

## Order of Labs

1. `ajax_async.html`
2. `ajax_async_all.html`
3. `ajax_async_best.html`

## Files

The `js` directory contains a shim for browsers not supporting ECMAScript6 natively, called `promise-2.0.4.min.js`. Non-promise related functionality is inside the `utils.js` file.

The `data` directory contains the JSON data for this example. **NOTE:** read below if you are not using a web server.

## Running the Code

Each of the HTML files contains a script calling `getJson()` on a URL. Due to browsers' [same origin security policy](http://en.wikipedia.org/wiki/Same-origin_policy) the code will fail if you are testing the page via a `file:\\` address in the browser, since the AJAX call will use `http:\\` and there is no way for the browser to know that your filesystem is OK with that.

In other words, to use the JSON files in the `data` directory you will need to serve the page from a web server and access the HTML files via `http(s):\\`.

Alternatively: swap in the suggested Github Gist URLs found in the comments within the HTML files, which allow cross domain requests.
