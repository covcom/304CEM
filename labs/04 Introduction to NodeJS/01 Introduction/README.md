
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

## Presentation

https://goo.gl/PYDXAI
