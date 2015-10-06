# Closures

This week covers objects and functions again, but with more advanced uses. These code patterns are what brings out the full power of JS and are essential for understanding JS code libraries that you might use for bigger projects. Before you start this or any other worksheet you should make sure you have the latest commits from the upstream repository on **GitHub**.
```
git pull upstream master
```

## 1 Closure to Maintain Internal State

Open the `function_closure.html` file and take a look at the functionality.
• Observe that the `button.onclick` event handler is a function that uses the **count** variable
• Observe also that this function does not specify any value for **count**
• Instead, count inside the handler function is given its value by the *enclosing
function context*

Since the window.onload handler function encloses the button.onclick one, the latter has an “environment” of local variables that it can work with. The onclick function is therefore able to keep track of the state of a higher-level variable, namely count.

This technique adds a lot of power to the language. For example, as we see here, state can be maintained in “private” scoped variables, even after the enclosing function has returned.

### 1.1 Test Your Understanding

1. Add three buttons to the function_closure.html page: ‘-’, ‘0’, ‘+’ (You can think of these as the playback speed controls for a media)
player
2. Add a **&lt;div&gt;** with ID playback-speed to the page as well
3. Using the existing onload handler as an example, write another
window.onload handler: This one should have an internal state representing the current playback speed
4. Clicking on one of the ‘+’ or ‘-’ buttons should increment or decrement the current speed as appropriate. Clicking on the ‘0’ button should reset the current speed to 0 – The current speed should be displayed in the **&lt;div&gt;** you added
5. use a single helper function to update the &lt;div&gt; rather than update it in each separate click handler.

## 2 Immediately-Invoked Function Expression

If you recall, JavaScript uses function-scoping which means that any variable or function defined inside a function is only visible inside it (local variable/private scope). Whenever you invoke a JavaScript function you create a new execution context and this context will contain any private variables and functions.

The *traditional* way to create this context is a two-step process, to *define* a function and then *call* it.

Open the `todo.js` file and note the todo variable has been assigned an anonymous function. If you look carefully at the end of this function you will see that once the function declaration is complete there are a pair of braces. These cause the function to immediately execute. The initial opening brace on the first line and its matching one right at the end enclose the function value.

The IIFE exports two functions, one to add an item and one to return the list of items.

This is an example of an **IIFE** (Immediately Invoked Function Expression). if you look closely it contains a **closure** and so will maintain its function state.

The principle behind an **IIFE** is to call a function as part of its definition

### 3.1 Using an IIFE

Now open the `todo.html` file which makes use of the IIFE. The file containing the IIFE is imported at the top of the file. As soon as it loads the function executes and is available for use by our script as the object **todo**. We can use this to access any public methods (lines 16 and 18).

#### 3.1.1 Advanced Debugger Techniques

Load the page in Chrome and open the debugger, adding a breakpoint to **line 15**.

1. use the step-over button to execute the script line by line. Notice what happens when the execution moves from line 19
2. repeat the exercise but this time use the **step into** button (the down-arrow and dot symbol). Can you explain the difference in behaviour?
3. Repeat for a third time but this time use stepover until you reach line 19. Then execute a step-into. next step-over until you reach line 22 then execute a **step-out** (the up arrow and dot). What does this do?

By understanding the purpose of the three actions you should be able to explore the execution of your code in an effective manner.

### 3.2 Test Your Knowledge

1. Modify the IIFE so that any empty strings are ignored and not added to the list
2. Modify the IIFE so that the items are capitalised (first letter capitalised) before being added
3. Add checks to prevent duplicate items being added

### 3.3 Event Delegation

Reload the page and add a few items. There is an event handler attached to the &lt;ol&gt; element. What happens if you click on one of the items? Read through the data in the console window. Notice that the element passed to the anonymous function is the list item, not the ordered list. This is a feature known as **event delegation** which means the event listener will bubble down to any child nodes without needing to be assigned specifically to them. This is a powerful feature which makes your code easier to write.

#### 3.3.1 Test Your Knowledge

1. Add a method to your IIFE to remove specific list items then make use of event delegation to allow the user to click on any of the lists items to remove it.



## References

IIFEs: http://benalman.com/news/2010/11/immediately-invoked-function-expression/

Event Delegation: http://davidwalsh.name/event-delegate
