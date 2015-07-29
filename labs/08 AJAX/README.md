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

## AJAX with Closures

One common scenario is to encapsulate the AJAX calls within a closure. Because the AJAX calls are asyncronous the exported functions need to include a callback that gets triggered once the AJAX call has completed.

Open up the `weather.html` file and locate its associated JavaScript file that contains an *IIFE*. Locate the two calls to the IIFE (these are located in the html file), notice how the `setTown()` method takes two parameters, the name of the town and an anonymous callback function.

### Tasks

Open the `weather.html` file in your web browser and examine the *JavaScript Console*. Note both the data displayed and the order in which this occurs. Can you explain this? Why does one method return *undefined* and how could you fix this? Make sure your code runs before continuing.

Add a form to the html document to allow the user to enter a town. Display the town details in the web page. What happens if the user enters an unknown town? Can you modify the code to take this into account?

### Test Your Knowledge

1. Add two methods called `today()` and `tomorrow()`. These should return the weather for the appropriate days.
2. At the moment the data contains unnecessary information, and the useful information is not clearly identifiable. Create a private function that takes the data for a day and returns a tidied version. Apply this to the data returned in the first challenge.