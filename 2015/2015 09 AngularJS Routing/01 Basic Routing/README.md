# AngularJS Routing

Now you have mastered the concepts of binding and directives we can learn about how AngularJS can be used to develop complex [single-page applications](https://en.wikipedia.org/wiki/Single-page_application) (SPA). A single-page application behaves like a desktop app where content is dynamically loaded as needed without the entire page being downloaded and replaced. You will have already experienced SPAs through tools such as _Google Drive_ and _Outlook_.

AngularJS is designed to support the development of SPAs and in this worksheet you will get hands-on experience with the technologies that make this happen. These are **Routing** and the **Web Storage API**

You will be using the **Books App** to learn about theses important concepts. Locate the `books/index.html` file and open the app in a new Chrome browser tab. You should also open the _console window_ to allow you to view any messages.

## 1 Routing

Open the `books/index.html` file.

1. this needs both the standard `angular.js` file and the `angular-routes.js` file.
  - the second file is required to support the development of SPAs
  - both files are hosted locally.
2. the page includes links to two _routes_, **search** and **favourites**
  - the string after the hash is called a [fragment identifier](https://en.wikipedia.org/wiki/Fragment_identifier)
  - fragments link to different parts of the _same page_
  - we will use this to decide which route to load
  - the links at the top of the page attach different fragment identifiers to the url
  - these are used by the app to decide what content to load.
3. the `<div ng-view>` indicates where the dynamic content will be displayed.
2. the app controller is stored in the `js/books.js` file.
  - notice how the _routeprovider_ connects the fragment identifiers to the correct controllers.
  - also notice that there are three different controllers in the same script.
  - we are injecting the [$http service](https://docs.angularjs.org/api/ng/service/$http) into the searchController and will use this to make http requests
  - we are injecting the [$routeParams service](https://docs.angularjs.org/api/ngRoute/service/$routeParams) into the detailController which allows us to read any parameters in the url

### 1.1 Test Your Knowledge

1. create a new route called **recent**
2. create a link to display this new route

## 2 Local Storage

Local Storage is part of the HTML5 [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) specification and not a feature of AngularJS however it is particularly useful when developing single-page applications. It allows the app to persist a limited amount of data, typically 5MB. The API includes two stores, LocalStorage, used to store data indefinitely and SessionStorage which persists the data until the browser is closed. Both of these work in a similar manner however in this exercise we will be using LocalStorage.

1. Open the `js/books.js` controller file and study the code in `detailController`. Notice that there is a function stored in the `addToFavourites` property.
  - this uses the `setItem()` method of the `localStorage` object to store the book id against a key
  - the key is also the book id!
2. Examine the code in `favouritesController`.
  - Notice that there is an `init()` function defined, this declares a locally scoped `Array`.
  - the code then loops through the keys in the `localStorage` object
  - the key is used to retrieve the stored object
  - this object is pushed onto the array
  - finally the array is assigned to the `$scope` object and bound to the view.
3. Immediately after being declared, this `init()` function is run which means the code is run each time the controller is called.

### 2.1 Test Your Knowledge

At present only the _book id_ is being stored.

1. Modify `detailController` to store the book title, author(s) and thumbnail link in the `localStorage` object.
2. Modify `favouritesController` to retrieve this additional data and display it.
3. Note that there is a **remove** link in the favourites screen. At present this simply prints a message to the console. Modify the app so that the link removes the book from the list. You will need to consult the [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) to find out how this can be achieved.

## Presentation

https://goo.gl/BtIq2D

## References

http://www.webcodegeeks.com/javascript/angular-js/angular-js-routing-example/

http://viralpatel.net/blogs/angularjs-routing-and-views-tutorial-with-example/