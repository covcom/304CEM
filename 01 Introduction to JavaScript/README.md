
# Introduction to NodeJS

In this worksheet you will be introduced to **NodeJS**, a runtime environment that allows you to run JavaScript code on a web server. NodeJS is based on the Chrome V8 JavaScript engine that runs inside the Chrome browser but adapted for server use.

It uses an event-driven, non-bocking I/O model which makes it very efficient when handling large numbers of connections.

The runtime uses a single thread running an *event loop* to to handle **all** incoming requests. When a connection is received we typically fire a callback to handle the request, returning control to the main thread once the work is done. This is termed **non-blocking** because the callback is used to handle the work leaving the main event loop free to deal with other requests.

Before you start this or any other worksheet you should make sure you have the latest commits from the upstream repository on **GitHub**.
```
git pull upstream master
```

## 1 Configuring Node

Before we start learning about NodeJS we should take a few moments to check which version of Node is installed on Cloud9 and make sure this is up to date. Node is being developed at a fast rate so we need to update our installed version regularly.

To manage and upgrade Node we use the **nvm**  (Node Version Manager). By default this is not installed. Start by installing it using **npm** (Node Package Manager). The _-g_ flag tells npm to install this module globally as a _tool_ rather than locally as a _module_.
```
npm install -g nvm
```
If this fails to install nvm you may need to run the command as sudo. If this fails you will need to install it manually using _curl_, try the following.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
```

After checking the current version, our next task is to list all the versions we can install and install the latest version. As of writing (November 2015) the latest version was v5.1.0. Finally we check that we are now using the latest version.
```
node -v
  v0.10.35
nvm list-remote
nvm install 5.2.0
node -v
  v5.2.0
```
Try closing the current terminal window and opening another one. If you check the current version on Node you will see that it has reverted back to the previously installed one! This is because the old version is flagged as the _default_. To fix this we need to set our new version as default.
```
node -v
  v0.10.35
nvm alias default 5.2.0
node -v
  v5.2.0
```
To check that this has has the desired effect, close the current terminal window, open a new one and check the current node version.

Node is based on the Chrome v8 runtime and supports any features supported by that runtime. Sometimes its helpful to know which runtime version is included in the NodeJS install. Thankfully this is straightforward to find out.
```
node -p process.versions.v8
  4.6.85.31
```

## 2 A Simple Example

In the following examples we will be using a _node module_ to capture user input.

Load up the `todo.js` script and read through it to understand how it works. There are lots of code comments to assist you. Note:
1. the use of **const** instead of var. Node already supports many ECMA6 features, there is a full [list](https://nodejs.org/en/docs/es6/) available so you know what is supported.
2. the work is handled by a callback to avoid blocking the main thread.

Before you can run the script you need to install the _module dependencies_. These are listed in the `package.json` file. This is formatted as a `json` document, you will learn mre about this in a later topic. Open this up and look for the `dependences` array, it specifies that we need to install the `readline-sync` module. To install this you need to use the _terminal_ to navigate to the directory then run `npm install`. Notice that you now have a new directory called `node_modules/`.

Return to the `todo.js` script and run it by clicking on the **Run** button in the top toolbar. Once running you can use the `add` command to add new items to the list and the `list` command to print out the list items. The final command will terminate the application.
```
node index.js
add cheese
add bread
add butter
list
exit
```

## 3 Linting

JavaScript is a pwerful language and includes a number of powerful features but it also includes features that, whilst they may produce working code, will make your code difficult to read and debug! A **linter** is a program that analyses your scripts for _programmatic_ and _stylistic_ errors and will flag up anything that may cause problems. They define a _professional subset_ of the language and reject any code that doesn't meet that standard.

There are a number of _linters_ available for the JavaScript language. The original one was written by Douglas Crockford (the author of JavaScript: The Good Parts). This enforced _his_ idea  of good JavaScript and was notorously not configurable! There are now a number of popular linters available, your choice should be based on what will run in your IDE as well as your personal preferences. The most popular linters are:

1. [JSLint](http://www.jslint.com/help.html), the original, by Douglas Crockford
2. [JSHint](http://jshint.com/docs/)
3. [ESLint](http://eslint.org) which is supported by _Cloud 9_

### 3.1 Linter Configuration

ESLint is completely configurable through the `package.json` file you examined earlier. Locate the `eslintConfig` object.

1. the **env** object imports groups of pre-defined global variables based on the _environment_ they are used in. In our example we will be writing scripts using the NodeJS environment so we want the linter to recognise any NodeJS global variables.
2. the **rules** object defines any additional rules we want to enforce. In this example we are specifying that we _don't want semicolons_ at the end of each line, that we will use a 2 space tab for indenting, we will use single quotes for strings and that we are using UNIX line endings.


## 2.1 Cloud9 Debugger

The **Cloud9** IDE includes a powerful debugger. Lets test how this works. You should then make use of it when attempting the *Test Your Knowledge* tasks.

Stop the script using `ctrl+C` and restart it. By stopping and restarting the script it will have lost the list items you typed in previously.

1. add the cheese item to the list (see above)
2. add a breakpoint to the code just inside the callback by clicking in the left margin next to `console.log(typeof chunk)`. Breakpoints are indicated by red circles.
3. add the *bread* item. Notice that the program execution stops on `console.log(typeof chunk)` without executing it.
4. notice all the script's variables are listed as *undefined* in the right-hand pane.
5. click on the **step over** button (indicated in the screenshot below) twice to execute lines 11 and 12. The local text variable should now contain the string you typed in. Locate this in the *local variables* pane. Now hover your mouse pointer over the variable name.
6. practice using the debugger buttons *Resume*, *Step Into*, *step out* until you understand their function.
7. the `lists` array is not a local variable and so doesn't appear in the right-hand pane. To keep track of this we can add it as a _watch expression_. In the **Watch Expressions** pane type in `lists` and press enter. You can now see the contents of the array change as the program executes. You can of course also hover over the variable name in the code...

![Cloud9 Debugger](images/node_debugger.png)

You can read more about Cloud9 debugger capabilities in their [online documentation](https://docs.c9.io/docs/running-and-debugging-code). You should take time to get familiar with its capabilities.

### 2.2 Test Your Knowledge

1. modify the code to prevent duplicate items being added. You will need to use the [`Array.indexOf()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) method.
2. create a **remove** option so an item such as *cheese* can be removed using the syntax `remove cheese`. You may need to use the [`Array.splice()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) method.
3. The current version is case sensitive. Modify the code so that items are converted to lowercase before being added or searched for. You will need to use the [`String.toLowerCase()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) method.

## 3 Exception Handling

When JavaScript executes code errors and exceptions may occur. These may be due to incorrect user input or a broken network connection for example. JavaScript includes a rich set of tools for handling these.

1. Errors are serious problems that normally mean the application will terminate
2. Exceptions on the other hand are problems that can be handled by the program logic and thus prevent the application from terminating. In this task we will be focussing on _exception handling_.

Open the `contact.js` script and study it carefully, as before, the code includes detailed comments to explain how it works.

### 3.1 Test Your Knowledge


## 4 Switch Statements


### 4.1 Test Your Knowledge
