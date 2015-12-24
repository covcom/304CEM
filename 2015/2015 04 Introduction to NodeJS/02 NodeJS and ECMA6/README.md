# NodeJS ECMA6 Support

Before you start this or any other worksheet you should make sure you have the latest commits from the upstream repository on **GitHub**.
```
git pull upstream master
```
You should also make sure you are running the latest version of NodeJS. Instructions on how to check this and upgrade the installation are in topic 4.

NodeJS is based on the latest Chrome V8 runtime and, as such, already supports many important ECMA6 features. In this worksheet you will be exploring several of these and seeing how they will help you write clearer, more robust code. If you get errors running these examples you should use _NVM_ to upgrade NodeJS, instructions can be found in the first worksheet in **topic 5**.

## 1 Promises Revisited

You have already learned about **promises** in topic 3 and they will be invaluable when you start building non-trivial APIs. They allow you to avoid deep nested callbacks (callback hell) and simplify error handling. For this reason we will revisit them and introduce a new _arrow_ function syntax which cleans up your anonymous function definitions.

If any promise in the chain gets rejected the entire chain fails and control is passed to the `catch()` method. This simplifies the error handling.

Open the `promises.js` file and study the code carefully.

1. compare the two functions at the top of the script. They share a very similar structure, returning a **Promise** object containing an anonymous function. The function takes two function parameters and calls the `resolve()` function.
2. notice that the syntax is different, one uses the standard anonymous function declaration that you are familair with. The second uses the new ECMA6 _arrow_ function syntax. Understand the differences.
3. also notice that the result of the calculations are stored in a **constant** rather than a variable. ECMA6 defines a [const](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/const) keyword which means that the variable _identifier_ can't be re-assigned a different value later in the script. This helps prevent some bugs being introduced into the code. You should always use _const_ it the value should not change.
4. the second function implements a variable with _block_ scope rather then _function_ scope. This uses the [let](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let) keyword instead if _var_.
5. there are four functions, each implementing the same promise chain but using different syntax. Compare these to make sure you understand how they were constructed.
6. run the script and enter a string, press enter when done. Make sure you understand the program flow.
7. uncomment the reject function call in the first function and run the script again, what happens?
8. uncomment the reject function call in the second, how does this affect the execution?
9. what happens if the first promise resolves and the second rejects?

### 1.1 Test Your Knowledge

1. rewrite the first function using the _arrow function_ syntax. Make sure it still works.
2. write another function that capitalises the last letter in the string using the _arrow function_ syntax.
3. finally add this third function to each of the four promise chains.
4. how could you achieve the same result without needing a third function (hint: you can add the same promise multiple times).

## 2 Handling Errors

You have already used a number of built-in functions that can return an error. All these functions use a common approach and in this exercise you will learn how to write your own functions that handle error conditions in the same manner. By correctly handling errors and ensuring your own code uses them correctly your apps will be more robust and crash less frequently.

You will be working with a simple app that can search an existing API for books and add book id values to a list. Start by running the `books/index.js` script then try out the following commands:
```
search javascript
search ???????
add JV6rpwAACAAJ
add xxxxx
add JV6rpwAACAAJ
```
Make a note of the app's behaviour.

### 2.1 Synchronous Errors

When calling a synchronous function (one with a return value) you should always throw a JavaScript **exception** if the operation is not successful rather then returning an arbitrary valu to indicate failure. This exception can then be handled by the calling code.

Open the `books/books.js` file and locate the `exports.add` function.

1. There are two possible problems identified, the id might ne the wrong length or it might already have been added to the array.
2. If either of these two situations arise an exception is _thrown_.
  - this stops execution of the function immediately
	- the exception is passed back to the caller `index.js` which should handle it
	- if it is not handled the program will crash.
3. Open the `books/index.js` file and locate where the function is called.
  - Notice that the call to `books.search` is contained within a `try {} catch {}` block.
	- if an exception is thrown, control passes immediately to the `catch {}` block
	- the error information is stored in the `err` parameter and can be accessed.
	- the code in the `finally {}` block is always executed whether an exception has been thrown or not.
	- the `finally {}` block is optional.

#### 2.1.1 Test Your Knowledge

1. Create a new function that deletes the specified book, it should return the id of the book deleted or throw an error if the book can't be found.
2. Modify the `index.js` file so you can test its functionality

### 2.2 Asynchronous Errors

JavaScript handles long-running processes in their own threads to prevent blocking the main thread. This is handled using _callbacks_. You have already used many built-in functions that take a callback parameter, these use a consistent format.
- The first parameter is the error `err` which is set to `null` if there is no error.
- The second parameter is the data we were expecting.

1. Open `books/index.js` and locate the call to the function in the `books.search` property.
  - notice the we check to see if the `err` parameter is not `null`. If this is the case we have an error and need to handle it. In this situation the second `data` parameter is null.
	- if the first parameter is `null`, the second `data` parameter contains the data we were expecting.
2. Open `books/books.js` and study the function stored in the `search` property.
  - notice that if a problem is detected we run the callback and pass it a single `Error` object.
	- notice that if there is _no problem_ we set the first parameter to `null` and pass the data to the second parameter
	- both these actions are consistent with the correct JavaScript approach.

#### 2.2.1 Test Your Knowledge

1. Create a new function in `books/books.js` to take a book id and return information about it.
  - https://www.googleapis.com/books/v1/volumes?q=tBbsAgAAQBAJ
2. Make sure you handle any possible errors such as an invalid id.
3. Modify the `books/index.js` file so you can test it by using the _describe_ command.

### 2.3 Advanced Challenge

1. There is no check to see if a book exists before being added to the list. Create a new function and store it in the `validateBookId` property. This should check whether the book id being added is valid.
2. Use this new functionality to only add valid books to the list.

## Presentation

https://goo.gl/pvGpT4
