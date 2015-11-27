# AngularJS Routing

Now you have mastered the concepts of binding and directives we can learn about how AngularJS can be used to develop complex [single-page applications](https://en.wikipedia.org/wiki/Single-page_application) (SPA). A single-page application behaves like a desktop app where content is dynamically loaded as needed without the entire page being downloaded and replaced. You will have already experienced SPAs through tools such as _Google Drive_ and _Outlook_.

AngularJS is designed to support the development of SPAs and in this worksheet you will get hands-on experience with the technologies that make this happen. These are:
1. Routing
2. Deep Linking
3. Local Storage (this is a native HTML5 technology)

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

## Presentation

https://goo.gl/BtIq2D

## References

http://www.webcodegeeks.com/javascript/angular-js/angular-js-routing-example/

http://viralpatel.net/blogs/angularjs-routing-and-views-tutorial-with-example/