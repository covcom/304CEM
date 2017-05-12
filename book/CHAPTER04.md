
# Understanding APIs


# Building APIs

Why talk to a server?

- Share common business logic
- Centralised sign-in
- Allows interaction between users
- Easy to develop multiple clients

But how do we manage these interactions?

Welcome to the machine-readable web...

## Architectural Paradigms

### Resource-Oriented Architecture

A way of turning a problem into a RESTful web service

An arrangement of URIs, HTTP and JSON

An answer to the following questions:

- addressability (why should the server send that particular piece of data). This is held in the URI
- uniform interface (why should the server send the data / delete the data) This is in the HTTP method

ROA is RESTful

But REST is a set of design criteria (not an architecture)

There is no such thing as a definitive REST architecture.

### Service-Oriented Architecture

Separate pieces of software

Provide application functionality

Self-contained logical representation of a repeatable function or activity.

## Representation State Transfer (REST)

Think about how we interact with stuff

To describe it we need to specify

- A Noun (what we are interacting with)
- A Verb (What we want to do with it)

We think in polymorphic terms
Each noun interprets the verb in an appropriate way

Lets look at an example:

PICTURE

Does this make sense.

How does this apply to programs?

Unfortunately the way we apply these concepts differs

- Nouns are objects and variables
- Verbs are represented by functions and methods

Compatibility issues.

Each programming language has its own approach

These are not compatible

Wouldn't it be great if every system understood the same concepts...


Important Idea 1

Important idea alert...

A web URL uniquely identifies a web page anywhere in the world

So we can use the same idea to uniquely identify the thing we want to interact with using the same principle

We are not dealing with resources so we can call it a URI rather than a URL


Concept of a URL

We already understand that a URL locates a unique resource on the Internet:
```
http://www.example.com/mypage.html
```

We can apply the same principle to create a URI to uniquely locate anything on the Internet:
```
http://www.example.com/bookshop/book/42
```
This uniquely locates record 42 in the books table in a bookshop database.

Important Idea 2

Another important idea alert...

We need a standard way to describe the verbs (actions) we want to carry out

The HTTP protocol already defines different methods (verbs) so let's use these

HTTP Methods Explained

When we retrieve a web page, the browser sends some information to the server

This is called the page request

Here is an example:

Pretty cool huh!

LIST OF COMMON METHODS.

'Safe' methods.

GET cannot change a resource

This makes it SAFE

DELETE, PUT, POST can change a resource

These are UNSAFE

ID Idempotent methods

An idempotent method means that the result of a successful performed request is independent of the number of times it is executed

Gregor Roth

- GET
- DELETE
- PUT

Idempotent methods can be retried on failure safely

### Important Idea 3

Yet another important idea alert...

If something goes wrong we need to get an error code from the server so we understand the problem

The HTTP protocol already defines a large number of HTTP status codes...

LIST OF COMMON STATUS CODES

### Data Format

We have already defined the structure of our request

This takes the form of a URI

The data we get back also needs to be in a standard format

This will allow it to be understood by the client computer

There are two possible formats:

XML or JSON

Most web services use the JSON format

JavaScript Object Notation
```json
{
  "records": 2,
  "books": [
    {
      "isbn": "9780340881538",
      "title": "The Recruit",
      "author": "Robert Muchamore"
    },
    {
      "isbn": "9780340881545",
      "title": "Cherub",
      "author": "Robert Muchamore"
    }
  ]
}
```

So why is this important?

By being able to define any online resource uniquely we can access it from anywhere

By agreeing a set of methods we can perform actions on these resources

By using the HTTP protocol, any computer can access any resource using any language

By using a standardised data format it can be understood by any client computer

The end result

We can create a useful program on a server

And access it from any device.

Roy Fielding

An American Computer Scientist

Helped author the HTTP Specification

Co-founded the Apache project

Famous for his PhD Thesis

"Representational State Transfer"

Good explanation: http://goo.gl/72tiK

### Addressibility

Can an entity be targeted and found?

URIs allow addressability

Each entity has a unique URI
```
/books						collection: GET POST
/books.json?q=javascript
/books/012345678			resource: GET PUT DELETE

/orders						GET POST 201
/orders/ae3eda			GET PUT DELETE
```

Statelessness

Does the web service remember the preceding events

A stateless server knows nothing about the user

Each request must contain all the information needed to process the request

Allows service to be infinitely scalable

Two types of state:

Application state

Does the web service store information about the activities carried out

Resource state

Does the web service track changes to the resources accessed

## Representations

We have already split our application into resources

Resources are your idea of how to divide up the data and present it

The resource is the useful information being presented

The same resource may have several representations

For example a book resource:

- A representation containing metadata
- A representation containing the book contents

Works in both directions...

Deciding between representations

Two ways to define this:

Unique URI for each representation

Content negotiation

Information sent in the request header

## Connectedness

Sometimes the data may contain links to more data

Google search results

Bookshop list of books may contain title and author plus a link to the details of each book

The Uniform Interface

There are only a few things we can do to a resource

- Retrieve its representation
- Create a new resource with new URI
- Create a new resource with an existing URI
- Modify an existing resource at a URI
- Delete a URI

## Web Services

A piece of software that makes itself available over the internet

Uses open standards to communicate

### Scenario

Imagine we have create an Android app for a bookshop

Our Database is on a web server somewhere

The app needs to be able to talk to the server:

- GET lists of books and book details
- POST orders
- DELETE items from a shopping cart
- PUT new items in a shopping cart, etc.

### Endpoints

A web service endpoint is how the client interacts with the service

A web service exposes its functionality as endpoints

Each endpoint comprises:

- a URI format to use
- any parameters required (in the URI or in the message body)
- the HTTP method to be used.

### Distributed Application

An application in which different components can be located on different computers connected over a network, behaving as a single large system.

3-Tier Architecture

A Web Service is an example of 3-tier architecture:

- Presentation
  - The web service client (desktop browser, smartphone, etc.)
- Business logic
  - The web service server (runs on the web server, talks to DB)
- Persistence
  - The backend database that holds all the data used by the WS

  ### Development Stages

- Plan your API public interface (write stub routes)
- Write acceptance tests (these will fail)
- Write a module to extract the data you need from API (TDD)
- Write the module to persist your data (TDD)
- For a higher grade write a module to handle user auth (TDD)
- Implement each route (functionality in the model) (TDD)
- Use integration tests for your model
- Make sure your acceptance tests pass

