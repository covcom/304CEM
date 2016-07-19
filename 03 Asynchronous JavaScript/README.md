
# Asynchronous Code

This week’s lab tasks will focus on how JavaScript is used to asynchronously get and set data on remote servers, often referred to as AJAX calls.

Note that AJAX technically uses XML as the data format, but we will be using JSON which is easier to parse, and becoming the defacto standard for much data on the web. The principles of asynchronous communication and callback functions are effectively identical for XML and JSON though.

## 1 Async Callbacks

In this first exercise you will learn about two important concepts.

1. How to pass parameters to your program as runtime parameters.
2. How to run code in multiple threads using callbacks.

When a JavaScript program is invoked from the console, the entire invocation string is available through the process.argv array, each word being stored in a different array index. This means that index 0 always contains the string `node`.

In our program you will be using passing the different currencies to convert from and to through the command invocation.

1. Try running the program with a single currency code `node currency GBP`.
2. Because we want to throw exceptions if something unexpected happens, the code needs to be enclosed in a try-catch block.
3. When the request.get() method is called it takes two parameters The url to call and the querystring which will be appended to it are passed as a single object parameter.
4. The second parameter is an anonymous function with three parameters, err, res and body. Note the use of the ECMA arrow syntax. This function **callback** will be run once the API call has completed, the API call running in its own thread.
5. If the API request fails, the first parameter, `err` will be non-null and will contain an Error object. At this point we simply throw an exception and exit.
6. The `res` parameter contains the entire response sent back from the server, we don't need this in this example.
7. The `body` parameter contains the data returned from the API, this is what we will be using. it is returned as a _string_ so we use `JSON.parse()` to turn it into a JavaScript object.
8. Finally we extract the data we need from the JavaScript object and send it to the console for display. the `JSON.stringify()` function does the opposite of `JSON.parse` in that it turns a JavaScript object into a JSON string. The second parameter can be used to filter the results. The third parameter specifies the indentation to use when formatting.

### 1.1 Test Your Knowledge

Lets improve the currency exchange tool. You will need to refer to the API [documentation](http://fixer.io) as you work through the tasks.

Its often helpful to see the complete response body. This allows you to see precisely what data was returned. Add a line to print out the entire JSON object. This needs to be immediately after the body was parsed as a JavaScript object.
```
console.log(JSON.stringify(json, null, 2))
```

1. At the moment, all the exchange rates are based on the € (EUR) however the API allows this to be changed by adding a second key to the querystring. Read through the documentation and modify the API call to use £ (GBP) as the base currency.
2. Modify the program to take two parameters: the first should be the base currency and the second the currency to convert to.
3. Use the [Number.prototype.toFixed()](https://goo.gl/DU4hvd) to truncate the number to 2 decimal places.
4. Use the Chrome POSTMan plugin to make an API call to convert £ (GBP) to $ (USD). Take a moment to make sense of the structure of the JSON data.
5. Modify the output of the script to display the currency conversion in a sensible format: e.g. `1 GBP = 1.33 USD`.
6. Finally, modify your program so that it throws an error if it doesn't recognise one of the currency codes.

## Address Finder

## 1 JSON Data

Most RESTful APIs return their data as a string in JSON format. This format allows primitives, objects and arrays to be converted into a string, passed between systems as text and then converted to the correct JavaScript object at the receiving end.

1. Open the `addressFinder.js` file and carefully read the comments in the code.
  1.

node modules

command-line arguments
arrow functions
asynchronous calls (callbacks) with err parameter

json data (parse, stringify)



## Directions

## Famous Quotes

## Weather