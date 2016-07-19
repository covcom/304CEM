
# Asynchronous Code

This week’s lab tasks will focus on how JavaScript is used to asynchronously get and set data on remote servers, often referred to as AJAX calls.

Note that AJAX technically uses XML as the data format, but we will be using JSON which is easier to parse, and becoming the defacto standard for much data on the web. The principles of asynchronous communication and callback functions are effectively identical for XML and JSON though.

## 1 Async Callbacks

In this first exercise you will learn about two important concepts.

1. How to pass parameters to your program as runtime parameters.
2. How to run code in multiple threads using callbacks.

When a JavaScript program is invoked from the console, the entire invocation string is available through the process.argv array, each word being stored in a different array index. This means that index 0 always contains the string `node`.

In our program you will be using passing the different currencies to convert from and to through the command invocation.

1. The script uses a third-party package called `request`. To install this, make sure your terminal in pointing to the script directory and install it with the `npm` command (Node Package Manager) like this: `npm install request`.
2. Try running the program with a single currency code `node currency GBP`.
3. Because we want to throw exceptions if something unexpected happens, the code needs to be enclosed in a try-catch block.
4. When the request.get() method is called it takes two parameters The url to call and the querystring which will be appended to it are passed as a single object parameter.
5. The second parameter is an anonymous function with three parameters, err, res and body. Note the use of the ECMA arrow syntax. This function **callback** will be run once the API call has completed, the API call running in its own thread.
6. If the API request fails, the first parameter, `err` will be non-null and will contain an Error object. At this point we simply throw an exception and exit.
7. The `res` parameter contains the entire response sent back from the server, we don't need this in this example.
8. The `body` parameter contains the data returned from the API, this is what we will be using. it is returned as a _string_ so we use `JSON.parse()` to turn it into a JavaScript object.
9. Finally we extract the data we need from the JavaScript object and send it to the console for display. the `JSON.stringify()` function does the opposite of `JSON.parse` in that it turns a JavaScript object into a JSON string. The second parameter can be used to filter the results. The third parameter specifies the indentation to use when formatting.

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

## 2 JSON Data

Most RESTful APIs return their data as a string in JSON format. This format allows primitives, objects and arrays to be converted into a string, passed between systems as text and then converted to the correct JavaScript object at the receiving end.

In this exercise you will learn how to extract information from complex _JSON_ data.
1. Run the script by entering `node addressFinder 'coventry'`, the address you are looking for needs to be enclosed in single quotes. Notice the result (lots of data).
2. Open the `addressFinder.js` file and notice that the script requires at least three parameters. The user will need to enter an address to look up.
3. The third parameter (index 2) contains the address to find.
4. The API call is made, passing the correct parameters and when it is complete the callback code is executed.
5. The `body` parameter string is parsed into a JavaScript Object.
6. This is then converted back into a formatted JSON string and printed to the console.

### 2.1 Test Your Knowledge

In this exercise you will be extracting data from the JSON object and displaying it in the console.

1. Try using a non-sensical address. What data is sent if Google can't resolve the address? Add an if statement to check for this and throw an exception if it is found.
2. If a match is found, the JSON data will contain the longitude and latitude of the location. Extract this data and display it in a human format: `lon: xxx, lat: xxx`.
3. The `address_components` array contains objects describing the full address. Write code to loop through this array and extract the `long_name properties`, printing them to the console.
4. The `bounds` object contains the geo data defining the top-right and bottom-left of a box that contains the location. Write code to calculate the width and height of the box in degrees.



- Directions: create module with callback function
- Famous Quotes: xml parsing
- Weather: create from scratch
