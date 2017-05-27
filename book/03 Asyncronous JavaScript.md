
# Asynchronous JavaScript

Outcomes

- Understand and use command line options.
- Understand and use callbacks to produce asynchronous code.
- Understand the JSON data format and know how to convert between it and JavaScript objects.
- Understand Screen Scraping

## IO is Expensive

Waiting for IO to complete is big waste of resources
Three solutions:
synchronous
processes		Apache
threads			Node

## NodeJS Threading Model

NodeJS runs in a single thread
JavaScript supports lambda / callbacks
Callbacks run in their own threads
After callback thread is destroyed





Using Request.

Main methods correspond to HTTP verbs:
```
request.get(url, callback)
request.put(url, data, callback)
request.post(url, data, callback)
request.del(url, callback)
```
Be careful, because callbacks are asynchronous

## Callbacks

A callback (higher-order) function

Passed around like a variable

a function that is passed to another function as a parameter

the callback function is called (or executed) inside the other Function.

When we pass a callback function as an argument to another function, we are only passing the function definition.

The containing function has the callback function in its parameter as a function definition

The function is not executed in the parameter.

It can execute the callback anytime.

Callbacks are important!

NodeJS runs in a single threaded event loop.

If a long-running operation occurs, the process stops "blocks" until the event has finished.

To prevent blocking operations any long running activities are run in callbacks.

The callback is a function that should be run after the operation is complete.

While it is processing, control is passed back to the main event loop.

Simple GET request with callback:
```javascript
'use strict'
const request = require('request')
request.get( 'http://api.fixer.io/latest?symbols=GBP', (err, res, body) => {
  if (err) {
  console.log('could not complete request')
  }
  console.log(body)
})
```

## Data Exchange Formats

RESTful APIs send data across the Internet

Needs to be transmitted as text (ASCII/UniCode)

Needs to communicate both the data and its structure.

- Variables
- Objects
- Arrays

Common data exchange formats

- XML		(Extensible Markup Language)
- JSON	(JavaScript Object Notation)
- YAML	(Yet Another Markup Language)
- CSV		(Comma-Separated Values)

XML Example
```xml
<address>
  <org>Coventry University</org>
  <street>4 Gulson Road</street>
  <city>Coventry</city>
  <country>United Kingdom</country>
  <postcode>CV1 5FB</postcode>
</address>
```
JSON Example
```json
address {
  "org": "Coventry University",
  "street": "4 Gulson Road",
  "city": "Coventry",
  "country": "United Kingdom",
  "postcode": "CV1 5FB",
}
```
YAML Example
```yaml
address:
  org: "Coventry University"
  street: "4 Gulson Road"
  city: "Coventry"
  country: "United Kingdom"
  postcode: "CV1 5FB"
```
CSV Example
```csv
"org", "street", "city", "country", "postcode" 
"Coventry University", "4 Gulson Road", "Coventry", "United Kingdom", "CV1 5FB"
```
Why do we prefer the JSON format?

- Text-based
- Position independent
- Lightweight
- Interoperable with JavaScript Objects

Converting to and from JSON
```javascript
const jsObj = {
firstname: 'John',
lastname: "Doe"
}
const jsonStr = JSON.stringify(jsObj)
const jsonStr2 = JSON.stringify(jsObj, null, 2)
const newObj = JSON.parse(jsonStr)
```

## Screen Scraping

Sometimes called Data Scraping

Extracting data from a human-readable web page

Why use screen scraping?

Some data not available through an API

Usually a last resort

Sometimes companies scrape their own websites!

There are some challenges:

- Complex process
- Needs deconstructable URLs
- Success depends on the DOM not changing
- Most search results are paginated

Deconstructable URLs.

To access search results:

- Search term needs to be inserted into URL

To access resources:

- Product ID needs to be inserted into URL.

Here are some examples:

Amazon Book Search URL (javascript)
```
https://www.amazon.co.uk/s/ref=nb_sb_noss_2?url=search-alias%3Dstripbooks&field-keywords=javascript
https://www.amazon.co.uk/s/?url=search-alias%3Dstripbooks&field-keywords=javascript
```
Guardian Bookstore
```
http://bookshop.theguardian.com/catalogsearch/result/?q=javascript&order=relevance&dir=desc
http://bookshop.theguardian.com/catalogsearch/result/?q=javascript
```
BBC iPlayer search for history
```
http://www.bbc.co.uk/iplayer/search?q=history
```

Accessing resources.

Amazon Books
```
https://www.amazon.co.uk/JavaScript-Definitive-Guide-Guides/dp/0596805527/ref=sr_1_2?s=books&ie=UTF8&qid=1476384737&sr=1-2&keywords=javascript
https://www.amazon.co.uk/dp/0596805527

http://bookshop.theguardian.com/javascript-patterns.html
But the ISBN is 0596806752

http://www.bbc.co.uk/iplayer/episode/b019c88d/the-grammar-school-a-secret-history-episode-2
http://www.bbc.co.uk/iplayer/episode/b019c88d
```

Screen scraping techniques

- Browse to web page using Google Chrome
- Open the Developer tools (elements tab)
- Expand DOM structure and see what content it controls
- Uniquely identify the data
- Extract data using JQuery patterns

Module for screen scraper.

Process is messy

Needs updating when page structure changes

Need to isolate in its own module

Keep public interface simple

Public interface:

- Pass a search string and get a JavaScript array in return
- Pass a resource identifier and get a JavaScript resource back