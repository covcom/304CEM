# JavaScript AJAX and DOM manipulation

## About

This week covers two big JS topics, so there are examples of each.

AJAX allows "on the fly" access to data from elsewhere (usually a remote server) by the browser client. Often the data passed around is in JSON format.

DOM manipulation by JS allows you to 'read', 'write', 'update', and 'delete' actual elements of the web page itself. In other words, you can use JS to modify the HTML presented to the user dynamically.

## Order of Labs

* DOM
	1. events.html
	2. map.html
	3. dom_scripting.html
* AJAX
	1. ajax_basic.html
	2. ajax_sync.html 

## Running the Code

The `data` directory contains the JSON data for this example. **IMPORTANT NOTE:** read below if you are not using a web server.

Due to browsers' security policies the code will fail if you are testing the page via a `file:\\` address in the browser, since [cross origin requests][cors] are only supported with `http(s):\\` and the relative URL supplied trips up the check.

In other words, to use the JSON files in the `data` directory you will need to serve the page from a web server and access the HTML files via `http(s):\\`.

#### Workaround

Swap in the suggested Github Gist URLs _found in the comments within the HTML_ files, which will allow direct access to the JSON files from the web.


[cors]: http://en.wikipedia.org/wiki/Cross-origin_resource_sharing