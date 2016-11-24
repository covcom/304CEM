# API Assignment Demo

## Overview

**AIM:** Provide a books API demo walkthrough, that is likely to *pass* the 304CEM assignment.

**NOTES:**

- This demo does not use advanced programming techniques such as promises, functional methods, prototype modifiers, or design patterns, which are needed for higher grades.
- This demo uses the `node-persist` library to store data to the filesystem, and does some operations synchronously. For higher grades, use actual databases (MongoDB, MySQL, etc.), and ensure all of your operations are async.

**OUTSTANDING WORK:**

- No testing is added to the demo yet. This is a *requirement* from the assignment brief.
  
## Working Parts

### Provide api to query google books

- use restify to query external api
- pull out first 5 books from returned results
- pull out **title, description, authors**
- return to api user
  
#### Endpoints

* `/booksearch`
    - GET to send query and return book
        - PARAMS: q - the search string

-----

### Save notes on favourite books

- set up restify endpoints for CRUD operations on my favourites
- allow adding a **review** and **stars** rating to the favourite that is saved
- persist these to the DB
  
#### Endpoints

*All must be authorised with basic auth*

* `/favourites`
    - GET to return full list of favourites
    - POST to add a new favourite
        * body fields: id\*, title\*, authors\*, description\*, review, stars
* `/favourites/:id`
    - GET to show a particular fav by ID
    - PUT to update a fav by ID
        * body fields: id\*, title\*, authors\*, description\*, review, stars
    - DELETE to delete a fav by ID

-----

### Manage user accounts for authorisation

- register and confirm users that will pass authorization to use the favourites system
  
#### Endpoints

* `/users`
    - POST to add a new one
        * body fields: username\*, password\*
* `/users/confirm/:username`
    - POST with a confirmation code in the body to confirm an existing registration
        * body fields: confirmation\*
* `/users/:username`
    - DELETE existing user
        * MUST be authorised
        * MUST be the same user
        * also delete all of this user's favourites

-----

__NB: \* = required body field__