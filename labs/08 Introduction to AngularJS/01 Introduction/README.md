# Introduction to AngularJS

Welcome to the third section of the module. By now you should be comfortable writing JavaScript applications and have experience developing an API using NodeJS to run server-side JavaScript.

This worksheet will introduce you to a powerful framework which will allow you to create interactive JavaScript apps that run in the web browser. You will be using these skills to create an interactive client that makes use of your API.

AngularJS is a modern opinionated client-side JavaScript framework developer by Google. It supports a number of powerful features:

- two-way data-binding
- model-view-controller pattern
- deep linking
- form validation
- simple API handling
- directives: allow you to define new html syntax and create re-usable components

## 1 Data Binding

We will start our exploration with a very simple _AngularJS_ application. Open the `data_binding.html` in a new browser tab. Enter some values in the fields and click the button. The app combines the username and password fields and generates a Base64 hash, useful for basic http authentication headers. Notice:

1. As you enter a value in the username field it automatically gets added to the page heading.
  - this is called data binding
2. After entering a username and password clicking on the button generates and displays the encoded data.
  - this triggers a function that calculates the base64 string
  - the string is passed back to the page for display.
3. The function updates the `encoded` property which automatically updates the view.

Open the script and read through it to fully understand the structure of an _AngularJS_ app.

1. Notice the `{{user}}` field in the `<h1>` tag, this is bound to the **user** property.
2. Notice the `ng-model` attributes in the `input` tags. These are bound to the named properties.
  - because two fields the `<h1>` and `<input>` are bound to the same property they are _bound_ to each other.
  - this is why the heading updates automatically!
3. There is a function stored in the encode property, this is referenced in the `ng-click` attribute gets called when the button is pressed.

### 1.1 Test Your Knowledge

1. Add another button labelled **Decode**.
2. When clicked it decodes the Base64-encoded string and displays the result in a new paragraph (use the `atob()` function.

## 2 Model-View-Controller

In the first example all the code was in the same html page. This is useful to understand how _AngularJS_ works but should be avoided for more complex apps.

### 2.1 View

1. Open the `basic_math/` directory and open `index.html` in a new tab in your browser.
2. Try modifying the values in the form, what happens?
  - you are seeing the two-way data binding feature of AngularJS
3. Open the code in the `index.html` file and examine the `<body>` tag.
  - the `ng-app` attribute defines the boundaries of the _AngularJS application_, in this case it is enclosed in the _body_ section of the page.
  - the `ng-controller` defines the html block to be controlled by the specified controller
4. Examine the `<input>` tags.
  - the `ng-model` binds the the text input to the specified property on the controller scope.
  - the `ng-change` attribute specifies the property of the controller scope to be called when the contents of the textbox change.
  
One of the powerful features of AngularJS is it support for the **MVC** (Model-View-Controller) pattern. This separates the app into three key parts:
- the **model** stores data which is accessed by the _controller_.
- the **view** generates output to the user and provides means for interaction.
- the **controller** listens for messages from the view, interacts with the model and sends data back to the view.

### 2.2 Controller

In our application the view is represented by the `index.html` document which displays the form to the user and allows them to interact with it. The controller is the `js/shopping.js` file. Open this to understand how it works.

Open `js/shopping.js` and read through the code to understand how it works.

1. Notice the two-step creation process
2. Notice how we can access the form data
3. Can you see how AngularJS updates the view?

### 2.3 Unit Tests

By implementing the _MVC_ pattern we make it easy to write unit tests. We should write tests to check the functionality of the _controller_. Start by opening the `spec/index.html` in a new web browser tab. This runs the test suite.

1. Notice that there are four specs and all of these pass.
2. Notice that one of these is 'pending' (the last one shown in orange).
3. The four specs are inside a _test suite_ 'placing an order'
4. This is nested inside another _test suite_.

Open the `spec/index.html` file and read through it to understand how it works.

### 2.4 Test Your Knowledge

1. The discount should double if the quantity is over 100, remove the pending status from the last spec and run the test suite, the last spec will fail.
2. Modify the **model** to correctly apply this discount (all the tests will pass).
3. Add a shipping field to the form and wire it up to the controller
4. Write another test spec to check the shipping costs are being applied
5. Wire up the controller and modify the calculation to return the correct total.



## 4 Challenge

If you think you have understood these basic _AngularJS_ concepts why not attempt this challenge.

- Implement a user registration system, using AngularJS and HTML.
- The system allows inputs of new user data e.g. name/age etc.
- The system contains a list of currently registered users.
- The system contains a search box to search the name field. It should updates its search results instantly based on search inputs.
- Only AngularJS allowed, no pure JavaScript or jQuery etc.
- AngularJS filters are not allowed.
