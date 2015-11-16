# RESTful APIs

Before you start this or any other worksheet you should make sure you have the latest commits from the upstream repository on **GitHub**.
```
git pull upstream master
```
You should also make sure you are running the latest version of NodeJS. Instructions on how to check this and upgrade the installation are in topic 4.

## 1 Promises Revisited

You have already learned about **promises** in topic 3 and they will be invaluable when you start building non-trivial APIs. They allow you to avoid deep nested callbacks (callback hell) and simplify error handling. For this reason we will revisit them and introduce a new _arrow_ function syntax which cleans up your anonymous function definitions.

If any promise in the chain gets rejected the entire chain fails and control is passed to the `catch()` method. This simplifies the error handling.

Open the `promises/index.js` file and study the code carefully.

1. compare the two functions at the top of the script. They share a very similar structure, returning a **Promise** object containing an anonymous function. The function takes two function parameters and calls the `resolve()` function.
2. notice that the syntax is different, one uses the standard anonymous function declaration that you are familair with. The second uses the new ECMA6 _arrow_ function syntax. Understand the differences.
3. there are also four functions, each implementing the same promise chain but using different syntax. Compare these to make sure you understand how they were constructed.
4. run the script and enter a string, press enter when done. Make sure you understand the program flow.
5. uncomment the reject function call in the first function and run the script again, what happens?
6. uncomment the reject function call in the second, how does this affect the execution?
7. what happens if the first promise resolves and the second rejects?

### 1.1 Test Your Knowledge

1. rewrite the first function using the _arrow function_ syntax. Make sure it still works.
2. write another function that capitalises the last letter in the string using the _arrow function_ syntax.
3. finally add this third function to each of the four promise chains.
4. how could you achieve the same result without needing a third function (hint: you can add the same promise multiple times).

## Application of Promises

In this activity you will learn more about how NodeJS can be used to develop more sophisticated APIs. One of the key techniques is the use of _promises_ which you covered in **topic 2**. You will start by creating user accounts by adding a new resource to the _accounts_ collection.

The sample code makes clever use of promises.

Navigate to the `bookshop/` directory and install all the required modules. Next open `bookshop/index/js` and run the script using the **Run** button. Copy the URL you are given into an instance of **Postman**. If you make the API call you will get a response:
```
{
    "code": "ResourceNotFound",
    "message": "/ does not exist"
}
```
Open the script files and study them carefully to understand the program flow as you complete the tasks below.

1. make a `POST /accounts` request and note the response code. Where is this error being generated? How does it get returned to the client?
2. add the correct username and password to the request and try again. You will receive a different error message. 
3. you should now get an error indicating that the image is missing. Click on the **Form Data** button and switch the first field from _text_ to _file_. You can now select a **png** image to upload.
4. next you will need to supply more data.

promises

upload images

user registration

coupling and cohesion.

serving static files

## To Be Added

cURL with jq for pretty printing via pipe and current directory.

curl 192.168.99.100/phones/123 | jq .

conditional get: server.use(restify.conditionalRequest());

Last-Modified / If-Modified-Since

ETag / If-None-Match

specifying format (headers/extension) - show extension using regex...

## Not Covered

handling errors

status codes

versioning

pagination and partial response, specifying fields

responses without resources

search

oauth

CORS

## Presentation

https://goo.gl/2mgcLc
