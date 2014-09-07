# JavaScript Promises

This example code comes from the HTML5Rocks JavaScript Promises [tutorial](http://www.html5rocks.com/en/tutorials/es6/promises/). It builds on the synchronous JS example from Week 4.

The code applies promises in an increasingly efficient way.

## Order of Labs

1. `ajax_async.html`
2. `ajax_async_all.html`
3. `ajax_async_best.html`

## Running the Code

Each of the HTML files contains a script calling `getJson()` on a URL. Due to browsers' [same origin security policy](http://en.wikipedia.org/wiki/Same-origin_policy) the code will fail if you are testing the page via a `file:\\` address in the browser, since the AJAX call will use `http:\\`. In other words, to use the JSON files in the `data` directory you will need to serve the page from a web server and access the HTML files via `http:\\`.

Alternatively: swap in the suggested URLs found in the comments within the HTML files.