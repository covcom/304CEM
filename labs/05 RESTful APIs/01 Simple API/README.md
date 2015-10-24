
# Simple API

You have already been introduced to NodeJS which allows for JavaScript to be run efficiently on a web server. In the exercises you interacted with the server through the Terminal window. In this worksheet you will be applying your existing skills to build an API that adheres to REST principles. By the end of the worksheet you will be in a position to start designing and building your own as part of your module assignment.

Before you start this or any other worksheet you should make sure you have the latest commits from the upstream repository on **GitHub**.
```
git pull upstream master
```

## 1 HTTP Revision

The `todo/` directory contains a simple API that demonstrates some key concepts. The first step is to run it and interact with it to understand the REST principles and how they are implemented.

1. use the **terminal** to navigate to the `todo` directory and install the module dependencies using `npm install`. This will install the [restify](http://restify.com/), [xmlbuilder](https://github.com/oozcitak/xmlbuilder-js) and [csprng](https://www.npmjs.com/package/csprng) modules. Take a few moments to read through their documentation.
2. run the `index.js` script using node.
3. launch **Chrome** and install the **Postman** REST plugin.
4. use *Postman* to access the API root URL, the format will be similar to `xxx`.
5. each request returns a [response code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Response_codes) that indicates its success or failure. Look up the response code to find out more.
6. the response also includes a **body** which contains any data returned from the API. Notice that the data is returned in **JSON** format. The data returned is known as its **representation**.

## 2 Collections, Resources and Representations

You need to fully understand the concepts of *Collections*, *Resources* and their *Representations*. We will learn about these by interacting with the lists API.
