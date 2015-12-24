
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
nvm install 5.1.0
node -v
  v5.1.0
```
Try closing the current terminal window and opening another one. If you check the current version on Node you will see that it has reverted back to the previously installed one! This is because the old version is flagged as the _default_. To fix this we need to set our new version as default.
```
node -v
  v0.10.35
nvm alias default 4.2.1
node -v
  v4.2.1
```
To check that this has has the desired effect, close the current terminal window, open a new one and check the current node version.

Node is based on the Chrome v8 runtime and supports any features supported by that runtime. Sometimes its helpful to know which runtime version is included in the NodeJS install. Thankfully this is straightforward to find out.
```
node -p process.versions.v8
  4.5.103.35
```

## 2 A Simple Example

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
### 2.1 Cloud9 Debugger

The **Cloud9** IDE includes a powerful debugger. Lets test how this works. You should then make use of it when attempting the *Test Your Knowledge* tasks.

Stop the script using `ctrl+C` and restart it. In Cloud9 you can either use the `node index.js` command or click on the **Run** button. By stopping and restarting the script it will have lost the list items you typed in previously.

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

## 3 Modules

NodeJS already supports **CommonJS** modules which will eventually become the *defacto* module standard in ECMA6. Functionality is exported from a module by adding keys to the `exports` object which is then imported into a script using the `require` function.

Open the `modules/index.js` script and the `modules/todo.js` module. Notice:
1. most of the functionality is now in the module, there is almost no code in the main `index.js` script.
2. the module is imported using the `require()` function and stored in an object called `todo`.
3. the functions exported by the module are now accessed as properties of the `todo` object.
4. the todo module only contains a single public property storing a method, everything else is private.

Run the index.js file and try adding and listing items. The functionality should mirror the previous version.

### 3.1 Test Your Knowledge

Try to implement the three changes listed in the previous *Test Your Knowledge* section. You should be able to copy and paste most of the code with only minor changes being required.

## 4 Node Package Manager

One of the strengths of NodeJS is the large number of third-party modules available as installable packages. In this exercise you will learn how to manage and install packages as well as how to manage your app using a config file. We have already used _npm_ to install the global **nvm** tool, we will now use the same tool to install a _local_ module.

Start by opening the `weather/index.js` and `weather/package.json` files. Note:

1. the `package.json` file contains the project *metadata*. Use the [interactive tutorial](http://browsenpm.org/package.json) to understand the purpose of each of the keys.
2. the **scripts** field contains any *aliases* you want to set up. You can see that a **start** alias has been defined. Try running your app by entering `npm start`. If you try this now you get an error, can you understand why?
3. the app requires the **request** package of around version *2.65.0*.
4. to install all the pre-requisites you should enter `npm install`. Once this has run you should have a new directory called `node_modules`. This contains the code for the module packages you have installed.
5. try running the app.
6. public modules/packages can be found in the [Node Package Manager](https://www.npmjs.com). Search for the **node-persist** package. Install it by running `npm install node-persist --save`. The `--save` flag (long flags have _two_ dashes) adds the package to the dependency list in `package.json`. You should check that the package has been added to the `node_modules` directory and the `package.json` file has been updated.

### 4.1 Test Your Knowledge

1. move the application logic into its own `weather.js` module. Since the API call is *async* you will need to implement a callback.
2. extract and display the wind speed and temperature.
3. use the **node-persist** module to store the weather forecast for a given location. Each location is given a unique **id** which can be found in the JSON data. Use this as the storage key.
4. add another module function to retrieve a 7 day forecast for the specified location. You will need to read the [API documentation](http://openweathermap.org/forecast16) to discover the URL format and that data it returns.

## Presentation

https://goo.gl/PYDXAI
