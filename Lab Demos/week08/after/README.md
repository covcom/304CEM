# API Assignment Demo

## Overview

Refactor the basic example given in the folder [before](../before) _to better enable unit tests to be done_.

## Changes

Each of the following files has been split into two: 

* `authorize.js` -- becomes `authorize.js` **and** `authorizeHandler.js`
* `booksquery.js` -- becomes `booksquery.js` **and** `booksqueryHandlers.js`
* `favourites.js` -- becomes `favourites.js` **and** `favouritesHandlers.js`
* `users.js` -- becomes `users.js` **and** `usersHandlers.js`

Route handling is now done in the `*Handlers.js` files, and route-specific functionality appears in the specialised files.

## Callback Hell

Note that callbacks are used a lot in this code, to keep the concepts simple. *However* you can see that these are beginning to make the code messy.

Promises are a much better choice as the equivalent code would be much easier to read and understand.

## Testing

Now that the files like `authorize.js`, `booksquery.js`, etc. do not contain request and response handling functionality, they can be properly unit tested using `jasmine-node` or similar!
