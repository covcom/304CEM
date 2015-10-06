## About

This week covers objects and functions again, but focuses on the advanced concepts of **prototypes** and **classes**. These code patterns are what brings out the full power of JS.

In particular, the todo app in the `advanced_obj_fun` directory contains some example code that uses many of the key techniques you need to learn.



# Prototypes and Classes

3. Use functions to construct objects and modify their prototype

Object Oriented JavaScript

- Load the js_classes.html file and view it in a browser using Brackets live preview (or otherwise)
- Hit F12 in the browser, since all output is on the console
- Note the creation of three “coffee objects” in the JS code, using the new
keyword and a constructor function called Coffee
- Now open extending_js_types.html to see the use of JavaScript’s inher-
itance mechanism: the prototype
- Live preview the page and note the console output.
- Note that the prototype object of the built-in String JS data type has allowed us to “extend” the functionality of strings by adding a new string method called palindrome.
Prototype inheritance applies to any JS data type / object, including objects created as instances of constructor functions like Coffee(). The prototype of an object can be modified or overridden by JS code at runtime. Any other object sharing this prototype is also modified in the same way.

Test your understanding

- First, add a Tea(type, ounces) constructor function to the js_classes.html JavaScript.
– Add properties for type and ounces
– Add methods: getSteepTime() and order(), and use appropriate
code within them
- Now create some new Tea instance objects and invoke the order() method to check that it works

• Once it is working, extend the Tea and Coffee prototypes by giving both a new method sip()
– Each invocation of sip() should simply log “Hmm, tasty” to the console

4. Create a JavaScript module (N.B.: advanced)
See JS module pattern along with Immediately-Invoked function expressions for a good discussion of what follows.
This is more advanced but begins to show the power of JS as a fully fledged language for designing and building large-scale applications. In particular, function closures and immediate invocation allows us to define self-contained modules that do not pollute the global namespace. This is how libraries such as, for example, jQuery and YUI, are put together.
• Load the advanced_obj_fun folder in Brackets and preview index.html.
• Play with the app, it is a simple task list. However, it is implemented as a
proper application, using modules. Load the following files in the editor:
• advanced_obj_fun/
– js/
∗ model.js
∗ store.js
∗ app.js – index.html
Together these JS modules implement the “model” part of MVC (Model View Controller).
• Look at the JS files and note some of their similarities:
– Each one defines an “immediately invoked function”
– Each one contains a constructor function at the top
– store.js and model.js both extend their constructor prototypes
– store.js and model.js both export their constructor to a global
namespace at the end
These things are all typical of the “module pattern” in JS. For more on it, see the website linked to above.
6
Test your understanding
• Write a short module that exports a utility object called “$” to the global namespace.
• This object should reimplement the JS document.getElementById() se- lector method using its own method $.id().
In other words, any page that includes your new module JS file should be able to call $.id("myButton") and this will return a reference to the DOM element with ID “myButton” (if any).
By doing this you should start to see how libraries such as jQuery add to or simplify the standard functionality of core JavaScript!
