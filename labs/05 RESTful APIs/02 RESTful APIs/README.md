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

## 2 Application of Promises

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

## 3 Uploading Files

It is often a requirement to upload files to an API. In the **gallery** example you will see how this can be achieved. Open the `gallery/` directory and read through the `index.js` _route_ file.

### 3.1 Startup Flags

Try running the app (index.js). Notice we get an error:
```
const [name, ext] = photo.name.split('.')
	      ^
```
It looks like Node doesn't like the use of the **destructuring assignment**. This is an ECMA6 construct to simplify splitting arrays. Many of these new features are optionally supported through the use of _startup flags_. To see a list of all the _ECMA6 (Harmony)_ flags you need to list all the flags then apply a filter to these using _grep_:
```
node --v8-options | grep harmony
```
In our app we would like to make use of the _destructuring assignment_, lets search for the appropriate flag.
```
node --v8-options | grep destructuring
  --harmony_destructuring (enable "harmony destructuring" (in progress))
```
So now we know which flag to use we can add this when we run our script.
```
node --harmony_destructuring index.js
```
And now the app runs without errors. Since you may need multiple flags the start command can become quite long and it is easy to forget a flag and cause the app to throw errors. To avoid this you should always add a _start_ key to the _scripts_ object in your `package.json` and run your app using `npm start`. Locate this command in the file.

### 3.2 Uploading 

In the previous exercises we have sent _json formatted_ data in our request body. To upload files we need to switch to _enctype=multipart/form-data_. In **Postman** make sure you have chosen POST then:

1. switch the body type from _raw_ to _form-data_ by selecting the first radio button.
2. Set the first row's _Key_ to `photo` and choose **File** from the dropdown list. Browse to a suitable image.
3. Set the second row's _Key_ to caption and enter a suitable caption for your photo.
4. Send the request.
  - notice that the response includes both information about the image/caption and a link to the image
	- what route allows us to view static content?
5. Try sending the request without either the file or caption.
  - what response do you get?
  - where is this triggered from?
6. Read the `gallery.js` script.
  - try and identify where the console output comes from
	- open the `photos/` and `persist/` directories, how is this data generated?
7. upload two images with the same name, what happens?

### 3.2.1 Test Your Knowledge

1. Use the `csprng` module to generate unique names for each uploaded file
  - how can you control the length of the filename?
	- what would you consider a suitable length?
2. Modify the app to reject files if they are larger than 3MB
3. Modify the app to reject any files that are not valid images

## Presentation

https://goo.gl/2mgcLc
