# API Assignment Demo

## Overview

I built a books API.
  
## Working

* provide api to query google books
  - use restify to query external api
  - pull out first 5 books from returned results
  - pull out **title, description, authors**
  - return to api user
  
#### Endpoints

`/booksearch` - GET to send query and return book
* PARAMS: q - the search string


* save notes on favourite books
  - set up restify endpoints for CRUD operations on my favourites
  - persist these to the DB
  
#### Endpoints

(All must be authorised with basic auth)

`/favourites`

- GET to return full list of favourites
- POST to add a new favourite

`/favourites/:id`

- GET to show a particular fav by ID
- PUT to update a fav by ID
- DEL to delete a fav by ID

* manage user accounts for authorisation
  - add list of valid users to system (manually at first, then using registration)
  - ensure users are authorised before updating data in the DB
  
#### Endpoints

`/users`

- POST to add a new one

`/users/:username`

- POST with a confirmation code in the body to confirm an existing registration
- DEL with username to remove existing user (MUST be authorised & TODO:: MUST be the same user)