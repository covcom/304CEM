# REST API Worksheet: Blogging API

In this worksheet you will use Restify and CouchDB to create a REST API for a blogging platform.

_Links:_

* [Restify documentation.](http://mcavage.me/node-restify/) - http://mcavage.me/node-restify/
* [Nano documentation.](https://github.com/dscape/nano) - https://github.com/dscape/nano

-----

## Design

In order to design a RESTful API, you need to analyze the types of data you will use. Then you can define the most appropriate resources / URL endpoints. In a Blogging API for example, you may need:

* Articles
* Comments
* Users

Our example will implement the `Articles` resource, and you will add `Comments` and `Users` as you go.

HTTP methods are used to perform _operations_ on the API resources:

| HTTP Method | URL | Operation |
| --- | --- | --- |
| GET | /articles | List all articles |
| POST | /articles | Add a new article |
| PUT | /articles/123 | Update article 123 |
| GET | /articles/123 | View article 123 |
| DELETE | /articles/123 | Delete article 123 |

That gives us the design for the `Articles` resource.

#### Design Task

* Design the _methods, URLs and operations_ you will use for the `Comments` and `Users` resources.

## Swagger

The Swagger API documentation system helps present your API designs:

* [http://editor.swagger.io](http://editor.swagger.io).

![Swagger Interface](/home/colin/coventry/1415/finland/swagger.png)

##### Design Task

* Load the Swagger editor and view some of the examples from the `File` menu.
* Code your API design in to Swagger (at least for the `Articles` resource)

-----

## Database

An API needs somewhere to store its data. You will be using CouchDB.

##### Database Task

* Log in to your Codio account
* Launch a CouchDB instance
* Log in to the CouchDB GUI interface at `http://subdomain.codio.io:5984/_utils`
* Create databases for each of the resources you are going to use: `articles`, `comments`, `users`
* Populate your new databases with some sample documents using Postman REST Client in the Chrome browser
	- Choose appropriate JSON data structures for each resource

![Databases in CouchDB ready to store your API data](/home/colin/coventry/1415/finland/couchdb_databases.png)

-----

## Code

Implementing a RESTful API is straightforward using NodeJS and CouchDB. You will use two NodeJS modules:

* `restify` is a simplified version of `express` and will serve your API
* `nano` is a simple interface to access your CouchDB database(s)


##### Code Tasks

1. Run the API server as follows:

* From the terminal in Codio, clone the git repository to get the example code for this lab:

	git clone https://gitlab.com/colinstephen/restify-api.git

* Open the `index.js` file and ensure you have completed the two `PREREQUISITE` lines to configure your environment.
	- `npm install restify`
	- `npm install nano`
	- your `articles` database should also be set up by now
* Read through the comments and code in `index.js` to understand what each part does
* From a terminal run the API server with `node index.js`

![Sample Restify Code (index.js)](/home/colin/coventry/1415/finland/sample_code.png)

2. Test adding a new article and reading the data back

* Next use the Postman REST Client in another browser tab, to POST some JSON data to your `/articles` API endpoint
	- ensure you POST raw JSON data, not "form-data"
	- you also will need to the _header_ for `Content-Type` is set to the value `application/json` for this to succeed

![POSTing test article data to the API](/home/colin/coventry/1415/finland/post_article.png)

* Refresh the CouchDB management GUI to double check that the data was added to your `articles` database
* Copy the `_id` value of one of the records
* Use this in Postman to GET data from the `/articles/:id` API endpoint

![GETting an article from the API](/home/colin/coventry/1415/finland/get_article.png)

3. Write your own article endpoints

* In `index.js` uncomment the three routes that are commented, between the two you just used
* Next, write function handlers for each of the routes:
	- `listArticles`
	- `updateArticle`
	- `deleteArticle`
	- Try to follow the model of the example code for `createArticle` and `viewArticle` to do this.

4. Write the API for Comments and Users

* If you have time, also implement the following:
	- endpoint URLs for the `comments` and `users` resources that you defined earlier
	- handlers for each of these

