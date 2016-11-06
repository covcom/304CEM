
# Data Persistence

In this worksheet you will learn how to connect your code to a variety of different persistence frameworks. We will cover:

1. Saving to the filesystem using `node-persist`
2. Relational databases (MySQL)
3. Document databases (MongoDB)

In each of these cases you will be shown how to use NodeJS to carry out the basic **CRUD** operations, it is assumed that you already understand how to work with the databases.

## 1 The Filesystem

In the first example we will persist JavaScript objects by converting them to json strings and saving the string to a text file in a directory on the server. Node comes with a built-in module called `fs` which allows you to work directly with files however in this example we will be using a module called `node-persist` which abstracts this into a module.

Open the file `filesystem/storage.js` which contains an exported function to retrieve book details, extract some simple information and persist this to a file. At the top of the script we import `node-persist` and initialise it in _synchronous mode_ (it can also be use asynchronously via callbacks).

- The function takes two parameters:
  - a string containing the ISBN of the book to find.
  - a callback function.
- The first step is for a call to be made to the Google Books API.
  - If the returned array is empty we use the callback to pass an error.
  - If book data is returned, the title, subtitle, author and description are use to create a JavaScript object called `data`.
  - Finally the data is persisted using the `save()` method and returned in the callback.

Run the `index.js` script then look at the project files. Notice that there is a new (hidden) directory called `.node-persist/`. Inside this you will find a directory called `storage/` which contains a text file with our book data.
```
tree -a -L 3 -I node_modules
  .
  ├── .node-persist
  │   └── storage
  │       └── 7e9cf1f449d27f19b8a1869b0210dbe2     <- here is our data!
  ├── index.js
  ├── package.json
  └── storage.js
```
### 1.1 Test Your Knowledge

The sample code works but there are a number of missing features:

1. Extract and store the following additional data:
  1. The publisher
  2. The page count
2. Implement a function to remove a book with the specified ISBN number.
3. The data persistence is currently performed synchronously, modify the script to perform this asynchronously via a callback.

## 2 MySQL

This is the most popular _relational_ database. It's cross-platform and open source.

Rather than install MySQL on your machine we will be hosting it on the [freeMySQLHosting](https://www.freemysqlhosting.net) servers. You first step is to sign up for a free account. As part of this process you will be sent a confirmation email. This can take a while to arrive.

Once you have received the confirmation link you will be able to create a new database, the details will be emailed to you. Once you have these details you can use the `mysql` command to try connecting to the server.
```
mysql -u sql8142511 -h sql8.freemysqlhosting.net -p sql8142511
```

Create a table called `books` with 4 columns.
```
Name        Type     Length   Index
-------------------------------------
id          INT      11       PRIMARY
title       VARCHAR  30
authors     VARCHAR  64
description TEXT
``` 
This can be created using the following SQL:
```
CREATE TABLE IF NOT EXISTS books ( 
  id INT(11) AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(30), 
  authors VARCHAR(64), 
  description TEXT 
);
  Query OK, 0 rows affected (0.06 sec)
describe books;
  +-------------+-------------+------+-----+---------+----------------+
  | Field       | Type        | Null | Key | Default | Extra          |
  +-------------+-------------+------+-----+---------+----------------+
  | id          | int(11)     | NO   | PRI | NULL    | auto_increment |
  | title       | varchar(30) | YES  |     | NULL    |                |
  | authors     | varchar(64) | YES  |     | NULL    |                |
  | description | text        | YES  |     | NULL    |                |
  +-------------+-------------+------+-----+---------+----------------+
SELECT * FROM books;
  Empty set (0.04 sec)
```

open the `relational/` directory and study the `mysql.js` script.

Notice that it uses the [mysql](https://www.npmjs.com/package/mysql) module to connect to your hosted database but you will need to add your connection details at the top. These were emailed to you. Once you have added your details you should be able to run the `index.js` script which imports the module and tries to insert a valid then an invalid book based on the ISBN.

Now use the `mysql` command to connect to the database and retrieve all the data from the database, you should see your book in the table.


## 3 MongoDB

This is the most popular _document_ database. It's cross-platform and open source.

Rather than install MongoDB on your machine we will be hosting it on the [mlab](https://mlab.com) servers. You first step is to sign up for a free account. As part of this process you will be sent a confirmation email.

Open the `document/bookSchema.js` file.

- Notice that we load the `mongoose` package, this is the most popular way to connect NodeJS to MongoDB however there are other packages you might want to look at.
- The values in the connection string will need to be replaced with the ones from your database on the mlab server.
- A new Schema object is created called `bookSchema` which is passed to the `mongoose.model()` method to create a Book model.
- this is exported.

Open the `document/mongodb.js` file, this is where we will write the logic to work with Book Mongoose objects.

- We import our mongoose model.
- There is a single exported function which takes an **isbn** number and a callback function.
- There is a call to the Google Books API which returns details on the specified book.
- The data is extracted and stored in a JavaScript object.
- A new `Book` object ia created.
- The save method is called to persist the data.

