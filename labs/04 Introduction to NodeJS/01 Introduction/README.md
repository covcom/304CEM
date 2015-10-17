
# Introduction to NodeJS

In this worksheet you will be introduced to **NodeJS**, a runtime environment that allows you to run JavaScript code on a web server. NodeJS is based on the Chrome V8 JavaScript engine that runs inside the Chrome browser but adapted for server use.

It uses an event-driven, non-bocking I/O model which makes it very efficient when handling large numbers of connections.

The runtime uses a single thread running an *event loop* to to handle **all** incoming requests. When a connection is received we typically fire a callback to handle the request, returning control to the main thread once the work is done. This is termed **non-blocking** because the callback is used to handle the work leaving the main event loop free to deal with other requests.

## 1 A Simple Example

Load up the `todo/index.js` script and read through it to understand how it works. There are lots of code comments to assist you. Note:
1. the use of **const** instead of var. Node already supports many ECMA6 features, there is a full [list](https://nodejs.org/en/docs/es6/) available so you know what is supported.
2. the work is handled by a callback to avoid blocking the main thread.

Run the script by using *terminal* to navigate to the directory then running the script using the `node` command. Once running you can use the `add` command to add new items to the list and the `list` command to print out the list items. To quit the script and return to the terminal prompt press `ctrl+C`.
```
node index.js
add cheese
add bread
add butter
list
```

### 1.1 Test Your Knowledge

1. modify the code to prevent duplicate items being added. You will need to use the [`Array.indexOf()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) method.
2. create a **remove** option so an item such as *cheese* can be removed using the syntax `remove cheese`. You may need to use the [`Array.splice()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) method.
3. The current version is case sensitive. Modify the code so that items are converted to lowercase before being added or searched for. You will need to use the [`String.toLowerCase()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) method.

## 2 Modules

NodeJS already supports **CommonJS** modules which will eventually become the *defacto* module standard in ECMA6. Functionality is exported from a module by adding keys to the `exports` object which is then imported into a script using the `require` function.

Open the `modules/index.js` script and the `modules/todo.js` module. Notice:
1. most of the functionality is now in the module, there is almost no code in the main `index.js` script.
2. the module is imported using the `require()` function and stored in an object called `todo`.
3. the functions exported by the module are now accessed as properties of the `todo` object.
4. the todo module only contains a single public property storing a method, everything else is private.

Run the index.js file and try adding and listing items. The functionality should mirror the previous version.

### 2.1 Test Your Knowledge

Try to implement the three changes listed in the previous *Test Your Knowledge* section. You should be able to copy and paste most of the code with only minor changes being required.

## 3 Node Package Manager

One of the strengths of NodeJS is the large number of third-party modules available as installable packages. In this exercise you will learn how to manage and install packages as well as how to manage your app using a config file.

Start by opening the `weather/index.js` and `weather/package.json` files. Note:

1. the `package.json` file contains the project *metadata*. Use the [interactive tutorial](http://browsenpm.org/package.json) to understand the purpose of each of the keys.
2. the **scripts** field contains any *aliases* you want to set up. You can see that a **start** alias has been defined. Try running your app by entering `npm start`. If you try this now you get an error, can you understand why?
3. the app requires the **request** package of around version *2.65.0*.
4. to install all the pre-requisites you should enter `npm install`. Once this has run you should have a new directory called `node_modules`. This contains the code for the module packages you have installed.
5. try running the app.
6. public modules/packages can be found in the [Node Package Manager](https://www.npmjs.com). Search for the **node-persist** package. Install it by running `npm install node-persist --save`. The `--save` flag (long flags have _two_ dashes) adds the package to the dependency list in `package.json`. You should check that the package has been added to the `node_modules` directory and the `package.json` file has been updated.

### 3.1 Test Your Knowledge

1. move the application logic into its own `weather.js` module. Since the API call is *async* you will need to implement a callback.
2. extract and display the wind speed and temperature.
3. use the **node-persist** module to store the weather forecast for a given location. Each location is given a unique **id** which can be found in the JSON data. Use this as the storage key.

## Presentation

https://goo.gl/PYDXAI
