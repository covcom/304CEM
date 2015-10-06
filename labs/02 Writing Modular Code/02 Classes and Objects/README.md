
# About

This worksheet covers objects and functions again, but focuses on the advanced concepts of **prototypes** and **classes**. These code patterns are what brings out the full power of JS.

In particular, the todo app in the `advanced_obj_fun` directory contains some example code that uses many of the key techniques you need to learn.

## 1 Object Oriented JavaScript

In this exercise we will be constructing objects and modifying their prototypes.

- Load the `js_classes.html` file, start the web server (the **run** button) and view it in a new *Chrome* browser tab. Open the *console tab* in the *developer tools*.
- Note the creation of three “**coffee** objects” in the JS code, using the **new** keyword and a constructor function called **Coffee**.
- Now open `extending_js_types.html` to see the use of JavaScript’s inheritance mechanism: the **prototype**. Open the page in a new *Chrome* browser tab and note the console output.
- Note that the *prototype* object of the built-in **String** JS data type has allowed us to “extend” the functionality of strings by adding a new string method called **palindrome**.

Prototype inheritance applies to any JS data type / object, including objects created as instances of constructor functions like `Coffee()`. The prototype of an object can be *modified* or *overridden* by JS code at runtime. *Any other object sharing this prototype is also modified in the same way*.

### 1.1 Test your understanding

First, add a `Tea(type, ounces)` constructor function to the `js_classes.html` JavaScript.

- Add properties for **type** and **ounces**.
- Add methods: `getSteepTime()` and `order()`, and use appropriate code within them

Now create some new Tea instance objects and invoke the `order()` method to check that it works

- Once it is working, extend the **Tea** and **Coffee** prototypes by giving both a new method `sip()`. Each invocation of `sip()` should simply log **"Hmm, tasty"** to the console

## 2 Create a JavaScript module

See JS module pattern along with Immediately-Invoked function expressions for a good discussion of what follows.

This is more advanced but begins to show the power of JS as a fully fledged language for designing and building large-scale applications. In particular, function closures and immediate invocation allows us to define self-contained modules that do not pollute the global namespace. This is how libraries such as, for example, **jQuery** and **YUI**, are put together.

• Load the advanced_obj_fun folder in Brackets and preview index.html.
• Play with the app, it is a simple task list. However, it is implemented as a
proper application, using modules. Open the `advanced_obj_fun` directory and load the following files in the editor:
```
.
├── index.html
└── js
    ├── app.js
    ├── model.js
    └── store.js
```
Together these JS modules implement the “model” part of MVC (Model View Controller).

Look at the JS files and note some of their similarities:

- Each one defines an “immediately invoked function”
- Each one contains a constructor function at the top
- `store.js` and `model.js` both extend their constructor prototypes
- `store.js` and `model.js` both export their constructor to a global namespace at the end

These things are all typical of the “module pattern” in JS. For more on it, see the website linked to above.

### 2.1 Test your understanding

- Write a short module that exports a utility object called “$” to the global namespace.
- This object should reimplement the JS `document.getElementById()` selector method using its own method `$.id()`.

In other words, any page that includes your new module JS file should be able to call `$.id("myButton")` and this will return a reference to the DOM element with ID **“myButton”** (if any).

By doing this you should start to see how libraries such as jQuery add to or simplify the standard functionality of core JavaScript!

## 3 AMD Modules

In this final activity you will be exploring the use of modules that follow the *Asynchronous Module Definition* (AMD). This is an API for defining modules and their dependencies and allows them to be loaded asynchronously on-demand for improved performance. This solution is a superior replacement for the IIFE approach we used in the previous worksheet.

Since JavaScript has no native support for AMD modules we need to make use of a module loader, in this case the **RequireJS library**.

### AMD Modules

Start by opening the `today.html` document, open it in the browser to understand what it does. The modules are loaded in the script tag in line 6.

Notice that we load the module loader `require.js` and also specify our main script in the  **data-main**  attribute (without the .js extension). data-main is a custom data attribute. We can create our own html5 attributes but they must begin with  `data-` . These are ignored by the validator and are used to store data needed by our scripts.

Open the  `js/today.js`  script and see if you can understand its structure. The `require` function takes two parameters, an array containing the paths to our custom modules (without .js extensions) and an anonymous function. The function takes a parameter for each of the paths in the first array parameter. These parameters are how we access our modules in the code.

In the main code body you should notice that each module becomes a *JavaScript object*, we can then create instances of them and access their properties and methods.

Locate the module to be loaded ( modules/time.js ), open it and study it carefully to understand its structure. The structure should be familiar to you from your previous lab. Note that it returns a single method called  showTime()  which returns a string representing the current time.

### 3.1 Test Your Knowledge

1. Use your knowledge of the JavaScript Date object to return the time in the format 5.45pm.
2. Create a second method called  show24hrTime()  that returns the time in the format 17:45
3. Create a second module called `date` which returns the *current date*. You will need to load *both* modules into your main script.
