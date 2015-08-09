# AJAX

In your previous labs you have been working solely with data provided as part of the application however most of the time your app will make use of external data sources.

Most of this data is supplied through RESTful web APIs which provide a simple machanism that supplies data in a machine-readable format. In this worksheet you will complete three important exercises that cover the following subjects.

1. **Making AJAX Calls**: this exercise covers how to use JavaScript to request data from online APIs. This forms the core knowledge required to develop even the simplest useful app.
2. ** IIFEs with Callbacks**: the second exercise shows you how to hide the details of your API calls inside a module (modules were covered last week). As part of this you will learn how to write methods that take a callback parameter.
3. **JSON Data**: In the third and final exercise you will learn how to manipulate the complex JSON data returned from your API calls and extract the data of interest.

Each of these exercises will take you approximately 20 minutes and you should aim to complete all of these within the first hour of your lab session.

## 1. Making AJAX Calls

xxx

### 1.1 Test Your Knowledge

xxx

## 2. AJAX with Closures

One common scenario is to encapsulate the AJAX calls within a closure. Because the AJAX calls are asyncronous the exported functions need to include a callback that gets triggered once the AJAX call has completed.

Open up the `weather.html` file and locate its associated JavaScript file that contains an *IIFE*. Locate the two calls to the IIFE (these are located in the html file), notice how the `setTown()` method takes two parameters, the name of the town and an anonymous callback function.

### Tasks

Open the `weather.html` file in your web browser and examine the *JavaScript Console*. Note both the data displayed and the order in which this occurs. Can you explain this? Why does one method return *undefined* and how could you fix this? Make sure your code runs before continuing.

Add a form to the html document to allow the user to enter a town. Display the town details in the web page. What happens if the user enters an unknown town? Can you modify the code to take this into account?

### Test Your Knowledge

1. Add two methods called `today()` and `tomorrow()`. These should return the weather for the appropriate days.
2. At the moment the data contains unnecessary information, and the useful information is not clearly identifiable. Create a private function that takes the data for a day and returns a tidied version. Apply this to the data returned in the first challenge.

## 2. Callbacks

In this second exercise you will be building a simple Closure (see previous week) which will encapsulate the raw AJAX calls. As part of this you will learn how to pass a function as a parameter to be executed once the call has completed.

Callbacks are derived from a programming paradigm known as **functional programming** and makes use of a **callback** mechanism which forms a very important part of the JavaScript language and is essential to understand if you are to progress beyond the basics.

## 3. JSON Data

As you have seen, most AJAX calls return data in JSON format and it is important that you know how to manipulate this to extract the data you need and render it to the user. You will learn how to make use of some of the built-in functionality of the JavaScript language to convert between objects and strings and learn how to extract objects and arrays.

In this next exercise you will be using the Google Geocode API V3. Full documentation can be found at https://developers.google.com/maps/documentation/geocoding/. Unlke the previous exercises, Google provides its own library to make requests.

Start by opening the file `address_finder.html` together with its JavaScript module `geocoder.js` which contains a single **IIFE**. Take time to read through the code so that you understand how it works. Notice that we import the Google library at the top of the html document before we load our own module (IIFE).

Modify the form by removing the button and performing the address lookup every time the string in the textbox changes. Can you disable this behavour if the user has typed in fewer than five characters?

### Test Your Knowledge

1. The JSON data returned comprises an array with each index containing the information for a possible match. For each array index, use the JSON data to construct a properly formatted address.
2. Display these formatted addressed in an html table underneath the textbox.
