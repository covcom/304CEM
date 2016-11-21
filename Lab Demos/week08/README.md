# API Assignment Demo

## Plan (todos)

* provide api to query google books
  - use restify to query external api
  - pull out first 5 books from returned results
  - pull out **title, description, authors**
  - return to api user
  
#### Endpoints

`/booksearch` - GET to send query and return book
* PARAMS: q - the search string
  
* manage user accounts for authorisation
  - add list of valid users to system (manually at first, then using registration)
  - ensure users are authorised before updating data in the DB
* save notes on favourite books
  - set up restify endpoints for CRUD operations on my favourites
  - persist these to the DB
* allow updates and deletes of the favourites
  - as above
  
## Working

