
# Asynchronous Code

This week’s lab tasks will focus on how JavaScript is used to asynchronously get and set data on remote servers, often referred to as AJAX calls.

Note that AJAX technically uses XML as the data format, but we will be using JSON which is easier to parse, and becoming the defacto standard for much data on the web. The principles of asynchronous communication and callback functions are effectively identical for XML and JSON though.

There is a slide deck https://goo.gl/qF1iAy to accompay this worksheet. Make sure you are familiar with its contents before proceeding.

## Contents

The lab covers a wide number of topics associated with running async code. The first 4 should be considered **essential** and the rest are topics that, whilst not essential to completing the assignment will greatly improve your knowledge of how asyncronous code works and, should you choose to implement these, will lead to much cleaner code.

1. Async callbacks
2. JSON data
3. Modules and callbacks
4. Nested callbacks
5. Generators
6. Promises
7. Async functions
8. Screen scraping

## 1 Async Callbacks

In this first exercise you will be studying the `currency.js` script to learn about two important concepts.

1. How to pass parameters to your program as runtime parameters.
2. How to run code in multiple threads using callbacks.

### 1.1 Runtime Parameters

When a JavaScript program is invoked from the console, the entire invocation string is available through the `process.argv` array, each word being stored in a different array index. This means that index 0 always contains the string `node`.

Study the `currency.js` script carefully. When we run this script we need to pass the currency we want as a _runtime parameter_ like this: `node currency GBP`.

1. If the script is invoked correctly there should be 3 indexes in the `process.argv` array. Index 0 contains the string `node`, index 1 contains the string `currency` and index 2 contains the string `GBP`.
2. If the array is shorter than 3 indexes we throw an error
3. Finally we take the third index and convert it to upper case, storing the resulting string in an immutable variable (constant).

### 1.2 Callbacks

NodeJS is a single-threaded event loop that processes queued events. This means that if you were to execute a long-running task within a single thread then the process would block. To solve this problem, NodeJS  relies on callbacks, which are functions that run after a long-running process has finished. Instead of waiting for the task to finish, the event loop moves on to the next piece of code. When the long-running task has finished, the callback is added to the event loop and run.

Because callbacks are such a fundamental part of NodeJS you need to spend time to make sure you fully understand how they work.

1. The script uses a third-party package called `request`. To install this, make sure your terminal in pointing to the script directory and install it with the `npm` command (Node Package Manager) like this: `npm install request`.
2. Try running the program with a single currency code `node currency GBP`.
3. Because we want to throw exceptions if something unexpected happens, the code needs to be enclosed in a try-catch block.
4. Next the URL is created. This string is known as a [template literal](https://goo.gl/3vznuR) and is enclosed using backticks instead of quotes. This allows variables to be embedded.
5. When the `request.get()` method is called it takes two parameters The url to call and an anonymous function with three parameters, `err`, `res` and `body`. Note the use of the [ECMA arrow function](https://goo.gl/4pRqUs). This function **callback** will be run once the API call has completed, the API call running in its own thread.
6. If the API request fails, the first parameter, `err` will be non-null and will contain an Error object. At this point we simply throw an exception and exit.
7. The `res` parameter contains the entire response sent back from the server, we don't need this in this example.
8. The `body` parameter contains the data returned from the API, this is what we will be using. it is returned as a _string_ so we use `JSON.parse()` to turn it into a JavaScript object.
9. Finally we extract the data we need from the JavaScript object and send it to the console for display. the `JSON.stringify()` function does the opposite of `JSON.parse` in that it turns a JavaScript object into a JSON string. The second parameter can be used to filter the results. The third parameter specifies the indentation to use when formatting.

### 1.3 Test Your Knowledge

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

## 3 Modules and Callbacks

Lets recap a little about JavaScript functions. Functions are _first-class objects_ of the type _Object_. This means they can be used just like other objects. You have already seen them stored in other variables.

In the previous examples you passed a function as an argument to another function. By passing a function argument we can execute it when we wish, for example after a network operation to retrieve data. In this context, the function is called a **callback function**.

In this topic you will learn how to create your own functions that take a callback function argument and how to store these in CommonJS modules, importing them where needed. 

Locate the `directions/` directory then open and run the `index.js` script. You will be prompted to enter a start and finish address, the script will return the driving distance between them. Test the exception handling by using both valid and invalid data.

1. The `directions` module is imported.
2. The `getDistance()` function it contains is called:
  1. This takes two string parameters
  2. The third parameter is a callback function
3. The callback function takes two arguments:
  1. The first should always be an error object, this will be `null` if no error occurred.
  2. The second argument is the data returned.
4. Exceptions are handled _inside_ the callback function.
5. The final line in the script executes _before the callback function_
6. The callback function executes once the data has been retrieved, _without blocking the thread_.

Open the `directions.js` file and study it carefully.

1. The `request` module is imported.
2. The `getDistance()` function is exported.
3. The third argument is the _callback function_ which has two arguments, the error and the data. This is the recommended callback argument pattern sequence.
4. The `getDistance()` function makes an aynchronous call to the `request.get()` function.
  - by isolating the API call in its own private function we won't need to duplicate this code when we add more functionality (the DRY principle).
5. Its third parameter is a _callback function_.
6. In the callback function we check for a non-null first parameter which would indicate an error has occurred.
  - If there has been an error we call our callback function and pass an Error object as its first parameter.
  - If no error has occurred we return null for the first parameter and the data as the second one.

### 3.1 Test Your Knowledge

1. When the script runs, the url used in the API call is printed to the console. Copy this into [Chrome Postman](https://goo.gl/Twyycv) to see the entire API response body.
2. Write a second function in your module called `getDuration()` which should print out how long the journey takes (in minutes).
3. Write a third function called directions which returns an array of directions (HINT: `html_instructions`).

## 4 Nested Callbacks

Because the code to be run after a callback is run needs to be _inside_ the callback code it is very challenging to build a script that contains several long-running tasks you get into a situation where you nest callbacks inside callbacks (inside callbacks) which makes the code very difficult to write, debug and read and means its very difficult to split into separate functions, a situation commonly known as **Callback Hell**.

Open the file `nestedCallbacks.js` which asks for a _base_ currency code then prints out all the exchange rates against other currencies. Notice that there are four functions defined, three of which include a callback. Our script is designed to capture user input using `stdin` (needing a callback), identify whether a currency code is valid (requiring a second callback) and then getting the currency conversion rates for the specified currency (requiring a third callback).

1. Notice that the `checkValidCurrencyCode()` function is called by the callback for the `getInput()` function and the `getData()` function is called by the callback for the `checkValidCurrencyCode()` function.
2. Each callback takes two parameters as normal. The first contains the error (if any) and this needs to be handled in each callback.
3. The data from the first callback is needed when calling the third function so needs to be stored in an immutable variable (constant).
4. The fourth, and final, function does not have a callback.

Callbacks are the simplest possible mechanism for asynchronous code in JavaScript. Unfortunately, raw callbacks sacrifice the control flow, exception handling, and function semantics familiar from synchronous code.

### 4.1 Test Your Knowledge

The callbacks are already nested 3 deep. To test your knowledge of deeply nested callbacks you are going to create a script that has 6 levels of nested callbacks!

1. modify the script to ask for the currency to convert to and display only the one conversion rate.
2. instead of printing the exchange rate, ask for the amount to be converted and them return the equivalent in the chosen currency
3. use the [OpenExchangeRates](https://openexchangerates.org/api/currencies.json) API to display the full name of the chosen currency.

Even though the script is still simple you are probably already getting in a tangle! Imagine a more complex script with conditions, it would quickly get out of hand and become practically impossible to debug.

Thankfully there are a number of advance features in NodeJS that are designed to flatten out these callbacks and to treat asynchronous code in a more _synchronous_ manner. These care called _Generators_, _Promises_ and _Async Functions_ and are described below. Even though you don't technically _need_ to know these, its worth learning them to keep your code manageable.

## 5 Generators

Until now we have made certain assumptions about NodeJS functions. One of these is that once a function starts running it will always run to completion before any other code runs. A **Generator** is a different kind of function that can be _paused_ at any time and _resumed_ later.

In concurrent programming there are two types of concurrency, _cooperative_, which allows the process to determine when the interruption happens, and _preemptive_, which allows the process to be interrupted by another process. A Generator is an example of _cooperative concurrency_ and use the `yield` keyword to trigger the interruption. To resume execution requires external control.

The cool feature of Generators is that messages can be passed to and from it.

Start by opening the `generators.js` file.

1. The `function *main()` function declares a _function generator_ which behaves much like a standard function.
2. At the end of the script we use this to instantiate an _iterator_ object we are calling `it`. This instantiates the iterator object but doesn't execute any of its contents.
3. To start iterating over the _generator function_ we call its `.next()` property, this runs the generator function up to the first `yield` keyword.
4. The `yield` function pauses the _generator function_ and passes control to the `getInput()` function, passing the parameter as normal.
5. At the end of the `getInput()` function the `.next()` function is called on the `it` _iterator object_ which passes control back to the _generator function_ which runs until it encounters the next `yield` keyword...
6. if an error occurs, the error object is passed to the _iterator object_'s `.throw()` function (see the `checkValidCurrencyCode()` function to see this in action).
7. Errors passed in this way are caught by the `catch` block in the _generator function_.

Simply by looking at the _function generator_ you can see how it has completely eliminated the nested callbacks, making the code much easier to read (and debug).

### 5.1 Test Your Knowledge

The sample script `generators.js` has the same functionality as the previous script `nestedCallbacks.js` and your challenge is to implement the same changes as the previous challenge (repeated below). The good news is that you have already solved a lot of the coding challenges and so you can focus on how to implement it using generators.

1. modify the script to ask for the currency to convert to and display only the one conversion rate.
2. instead of printing the exchange rate, ask for the amount to be converted and them return the equivalent in the chosen currency
3. use the [OpenExchangeRates](https://openexchangerates.org/api/currencies.json) API to display the full name of the chosen currency

## 6 Promises

_A promise is an object that proxies for the return value thrown by a function that has to do some asynchronous processing (Kris Kowal)._

The key component is the `.then()` method which is how we get the resolved (or fulfilled) value or the exception it has thrown.

### 6.1 Test Your Knowledge

1. modify the script to ask for the currency to convert to and display only the one conversion rate.
2. instead of printing the exchange rate, ask for the amount to be converted and them return the equivalent in the chosen currency
3. use the [OpenExchangeRates](https://openexchangerates.org/api/currencies.json) API to display the full name of the chosen currency

## 7 Async Functions

async await.

### 7.1 Test Your Knowledge

1. modify the script to ask for the currency to convert to and display only the one conversion rate.
2. instead of printing the exchange rate, ask for the amount to be converted and them return the equivalent in the chosen currency
3. use the [OpenExchangeRates](https://openexchangerates.org/api/currencies.json) API to display the full name of the chosen currency

## 8 Screen Scraping

In the previous tasks we have been working with data that is available via a RESTful API but what do you do if the information you need is only found in human-readable format in an HTML webpage?

In this task you will learn how to extract data from HTML web pages, a technique known as **Screen Scraping**. This is a much harder that using an existing API because:

- the html won't have semantic information
- if the website author changes the page your script will need to be rewritten.

Despite these issues sometimes this approach is the only way to get the information you need.


Open the `quotes/index.js` file and notice that it imports a custom `quotes` module, the `./` indicates that it is in the current directory. Because the parsing code can get quite complex it is best practice to place this in a custom module.

There is only one function in this module, called `getQuotes()` which takes two parameters, the author name plus a callback. The callback follows best practice by passing an error as the first parameter followed by the data.

Now open the `quotes/quotes.js` module. The screen-scraping functionality is in a private function which is referenced by the exported function, this makes it easier to update if the web page layout changes.

If an error occurs the callback is called with an Error as the first parameter. If no error occurs, the callback takes a `null` first parameter with the data as a second parameter. This pattern is consistent with the built-in JavaScript functions that take a callback.

Run the `index.js` script and try searching for a valid person (such as _Asimov_), copy the URL into the chrome web browser.

Open the _Developer Tools_ and choose the _Elements_ tab. As you hover over the DOM elements in the _Elements_ tab you will see the content highlighted in the browser window.

Use this to expand the DOM until you can highlight the first quote in the list.

- Notice that all the quotes are in a `<dl>` (definition list) tag.
- Each quote is in an `<a>` (anchor) tag a `<dt>` (definition term) tag.

In the `scraper()` function:

1. The supplied parameters are used to create a **unique url**. It is absolutely vital that:
  - each resource have a unique URL.
  - the URL for each resource can be calculated based on the supplied parameters.
2. The url is logged to the console so that it can be pasted into a browser to check for validity.
3. The `request` module is used to grab the web page html which is available i the `body` parameter of the callback.
4. The `cheerio` module loads the page DOM into a constant which can be parsed using JQuery syntax.
5. We then check the DOM for particular elements.
  - If there is a `<p>` tag containing the text `No quotations found` we know the search has returned no quotations so an error is returned.
  - The number of quotes is extracted from the DOM and stored as a property of the data object.
  - An empty `quotes[]` array is added to the `data` object.
  - [JQuery.each()](http://api.jquery.com/jquery.each/) is used to loop through each of the tags of interest.
  - Each quote is then pushed onto the `quotes[]` array.
6. Once all the data has been extracted from the DOM and added to the `data` object this is passed to the callback function.

### 4.1 Test Your Knowledge

The best way to learn about screen scraping is to have a go. In this task you will be writing a script to search for books based on ISBN numbers and returning useful data.

You will be using the Amazon website, start by searching for a specific ISBN such as `1449336361`, this will give you a URL to parse.

https://www.amazon.co.uk/JS-Next-ECMAScript-6-Aaron-Frost/dp/1449336361/ref=sr_1_1?ie=UTF8&qid=1475398158&sr=8-1&keywords=1449336361

The next step is to remove the unnecessary parts of the URL until you are left with something you can work with. This is a process of trial and error but you need to be able to construct this URL using only the ISBN number.

https://www.amazon.co.uk/dp/1449336361

Have a go at writing a `books` screen scraper and try to return:

1. Title
2. Authors
3. Description
4. Price
5. Rating

# Extension Activity

By now you whould have decided on the theme for your API.

1. Identify any existing APIs you can integrate into your assignment. Write a NodeJS script to extract and display appropriate data.
2. Identify websites that contain useful data and Write a NodeJS screen scraper to extract and display useful data (lists of items and details on specific items).
