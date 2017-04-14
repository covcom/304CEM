
# Introduction to NodeJS

In this worksheet you will be introduced to **NodeJS**, a runtime environment that allows you to run JavaScript code on a web server. NodeJS is based on the Chrome V8 JavaScript engine that runs inside the Chrome browser but adapted for server use.

It uses an event-driven, non-bocking I/O model which makes it very efficient when handling large numbers of connections.

The runtime uses a single thread running an *event loop* to to handle **all** incoming requests. When a connection is received we typically fire a callback to handle the request, returning control to the main thread once the work is done. This is termed **non-blocking** because the callback is used to handle the work leaving the main event loop free to deal with other requests.

Before you start this or any other worksheet you should make sure you have the latest commits from the upstream repository on **GitHub**.
```
git pull upstream master
```

There is a slide deck https://goo.gl/EGvS5Z to accompay this worksheet. Make sure you are familiar with its contents before proceeding.

## 1 Configuring Node

During this module you will be using NodeJS, a server-side version of ECMAScript 6 (JavaScript) to develop an API. Before wer start, this will need to be installed. To check this we can try to view the version.
```
node -v
  -bash: node: command not found
```
The tool used to install and upgrade NodeJS is called the Node Version Management tool (`nvm`).

Installation is carried out through the `Terminal`. Start by downloadeding the installation script using the `curl` command and executing it.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```
The installation script has added a new path to your shell configuration and this needs to be loaded again using `source ~/.bashrc`, then we can check for the versions of NodeJS available. The latest version (7.2.0 at the time of writing) will be at the end of the list.
```
nvm list-remote
         ...
         v7.0.0
         v7.1.0
         v7.2.0
         ...
         v7.9.0
nvm install 7.9.0
  Downloading https://nodejs.org/dist/v7.9.0/node-v7.2.0-linux-x64.tar.xz...                        
  ######################################################################## 100.0%
  Now using node v7.9.0 (npm v3.10.9)  
  default -> 7.9.0 (-> v7.9.0) 
node -v
  v7.9.0
```
We install the latest version and then set this as default. Finally, to check everything worked we check to see ehat version is installed.

## 2 Variables and Scope

In the following examples we will be using a _node module_ to capture user input.

Load up the `todo.js` script and read through it to understand how it works. There are lots of code comments to assist you.

Before you can run the script you need to install the _module dependencies_. These are listed in the `package.json` file. This is formatted as a `json` document, you will learn more about this in a later topic. Open this up and look for the `dependences` array, it specifies that we need to install the `readline-sync` module. To install this you need to use the _terminal_ to navigate to the directory then run `npm install`. Notice that you now have a new directory called `node_modules/`.

Use the **terminal** to navigate to the `01 Introduction to ECMAScript 6` directory and run the script by entering ` node todo.js`. Once running you can use the `add` command to add new items to the list and the `list` command to print out the list items. The final command will terminate the application.

```
node todo.js
add cheese
add bread
add butter
list
exit
```

### 2.1 Variables and Constants

There are three ways to declare a variable in the latest version of JavaScript (ECMA6).

1. Standard variables are _function scoped_ which means they are available anywhere within the function in which they are declared. These are declared with the `var` keyword.
2. Immutable variables (constants) are also function scoped. These are declared using the `const` keyword.
3. Finally, any variable declared with the `let` keyword is _block scoped_. This means the variable is only visible within its block (defined by curly braces).

### 2.2 Test Your Knowledge

1. locate the `input` variable declaration (just inside the `do` loop)
  - define it as a block-scoped variable by replacing the `var` with `let`, what effect does this have?
  - modify the script so that it still works (keep the `let` variable declaration).
  - substitute a constant by substituting `const` for `let`, what effect does this have?

2. the array at the top of the script is defined using `var`. What happens if you make this immutable (use `const`)?
3. Items are added to the array using its `push()` method.
  - substute the [unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) method. How does this change the script?
4. modify the code to prevent duplicate items being added. You will need to use the [`Array.indexOf()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) method.
5. create a **remove** option so an item such as *cheese* can be removed using the syntax `remove cheese`. You may need to use the [`Array.splice()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) method.
6. The current version is case sensitive. Modify the code so that items are converted to lowercase before being added or searched for. You will need to use the [`String.toLowerCase()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) method.

## 3 Exception Handling

When JavaScript executes code errors and exceptions may occur. These may be due to incorrect user input or a broken network connection for example. JavaScript includes a rich set of tools for handling these, based on the [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object.

1. Errors are serious problems that normally mean the application will terminate
2. Exceptions on the other hand are problems that can be handled by the program logic and thus prevent the application from terminating. In this task we will be focussing on _exception handling_.

Open the `contact.js` script and study it carefully, as before, the code includes detailed comments to explain how it works.

1. All code that could throw an exception _must_ be in a `try{}` block.
2. If an exception is _thrown_ the execution moves to the `catch{}` block.
  - the error object thrown will be passed as the parameter.
  - the error object contains three properties: the name of the error, the message passed and the stack trace.
  - the _stack trace_ is a list of the method calls that the application was in the middle of when an Exception was thrown and can help identify some of the more insidious errors. You should learn to read and understand what information it contains.

### 3.1 Test Your Knowledge

Implement the `validateEmail()` function and thoroughly test it, you should avoid using regular expressions at this stage:

1. Check that the string is at least 5 character long
2. Check that there is a `@` character and that it is not at the start of the string (HINT: use the [indexOf](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) String prototype method.
3. Check that there is a period (.) character after the `@` character but before the end of the string.

# Extension Activity

By now you have learned:

1. How to retrieve the lab materials via GitHub
2. How to install NodeJS on the CodeAnywhere platform
3. How to edit and run scripts on the CodeAnywhere platform

For you extension activity you are required to set up a development environment on your laptop or desktop computer. If you are running MacOS or Linux you will be able to follow a similar set of steps to those used in CodeAnywhere. If you are running a Windows OS you have three choices:

1. Work out how to configure your windows machine.
2. Install Virtualbox and create a virtualised instance of Ubuntu 16 Desktop.
3. Dual boot with Ubuntu.

You should install and evaluate a range of editors to decide on the one you prefer. There are a wide range of choices but a starting point might be:

- Visual Studio Code
- Atom
- Brackets
- Sublime

## Installing Node

As part of your configuration you will need to install the latest version of NodeJS. On Ubuntu Desktop 16.
When you use it you will need to run it as `nodejs`.
```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 68576280
sudo apt-add-repository "deb https://deb.nodesource.com/node_6.x $(lsb_release -sc) main"
sudo apt-get update
sudo apt-get install nodejs
nodejs -v
```

If you are running MacOS or Windows you will need to download the NodeJS installer from https://nodejs.org/en/download/current/, make sure you choose the **Current** version and not the **LTS** version.

Once you have installed NodeJS you can install the Typescript Definition Language tool and use it to install the `node` and `jasmine` definitions. This will add both node and jasmine to the autocomplete data. Most modern editors include support for this.
```
npm install tsd -g
tsd query -r -o -a install node jasmine
```
