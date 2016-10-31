
# Data Persistence

In this worksheet you will learn how to connect your code to a variety of different persistence frameworks. We will cover:

1. Relational databases (MySQL)
2. Document databases (MongoDB)
3. Graph databases (Neo4J)

In each of these cases you will be shown how to use NodeJS to carry out the basic **CRUD** operations, it is assumed that you already understand how to work with the databases.

## 1 MySQL

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


## 2 MongoDB

This is the most popular _document_ database. It's cross-platform and open source.

Rather than install MongoDB on your machine we will be hosting it on the [mlab](https://mlab.com) servers. You first step is to sign up for a free account. As part of this process you will be sent a confirmation email.

## 3 Neo4J

This is the most popular _graph_ database. It's cross-platform and open source.

Rather than install Neo4J on your machine we will be hosting it on the [GrapheneDB](http://www.graphenedb.com) servers. You first step is to sign up for a free account.
