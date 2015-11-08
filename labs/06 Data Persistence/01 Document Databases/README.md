# Document Databases

In this worksheet you will install the MongoDB database and learn how to query it, initially using the **mongo shell** and then using the native _NodeJS_ drivers.

## 1 Installation

The first step is to configure the **Cloud 9** server and install the latest version of _MongoDB_.

Use the terminal to install the latest version of the _Kerberos_ dev tools.
```
sudo apt-get update
sudo apt-get install -y libkrb5-dev
```
Next navigate to the root of your project and create a data directory.
```
cd ~
mkdir data
```
Finally you need to create a _MongoDB launch script_, give yourself execute permissions and use it to start the database server.
```
echo 'mongod --bind_ip=$IP --dbpath=data --smallfiles --nojournal journal = false --rest "$@"' > mongod
chmod a+x mongod
mongod --smallfiles
```
## 2 Mongo Shell

Next we will launch the **Mongo Shell** which is a command-line tool for intracting with the running database.

Open a new terminal window and launch the shell.
```
mongo
```
You will enter commands at the mongo prompt `>`, type in `help` to see the options.

switch to the **api** database with `use api`. This will create the database if it does not exist already.

insert document into a collection. Our collection will be called lists. Note you can split the json document into several lines by pressing the enter key.
```
> db.lists.insert( { name: "shopping", items: [ "bread", "butter", "cheese" ] } )
  WriteResult({ "nInserted" : 1 })
> db.lists.insert( { name: "fruit", items: [ "apples", "oranges", "grapes" ] } )
  WriteResult({ "nInserted" : 1 })
> db.lists.insert( { name: "dwarves", items: [ "doc", "dopey", "bashful" ] } )
  WriteResult({ "nInserted" : 1 })
```
searching for documents. Retrieve all:
```
db.lists.find()
  { "_id" : ObjectId("5638d8b8cabb5db66a09d33a"), "name" : "shopping", "items" : [ "bread", "butter", "cheese" ] }
  { "_id" : ObjectId("5638d98bcabb5db66a09d33b"), "name" : "fruit", "items" : [ "apples", "oranges", "grapes" ] }
  { "_id" : ObjectId("5638d9cbcabb5db66a09d33c"), "name" : "dwarves", "items" : [ "doc", "dopey", "bashful" ] }
```

search criteria:
```
> db.lists.find({name: 'shopping'})
  { "_id" : ObjectId("5638d8b8cabb5db66a09d33a"), "name" : "shopping", "items" : [ "bread", "butter", "cheese" ] }
> db.lists.find({items: 'oranges'})
  { "_id" : ObjectId("5638d98bcabb5db66a09d33b"), "name" : "fruit", "items" : [ "apples", "oranges", "grapes" ] }
```

updating a document. We can replace a field with the $set operator or append additional items onto an array using the $push operator. You can remove array elements using the $pull operator.
```
> db.lists.update({name: 'shopping'}, { $set: {name: 'sandwiches'} })
  WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.lists.update({name: 'dwarves'}, { $push: {items: 'grumpy'} })
  WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.lists.update({}, { $pull: { items: "doc" } }, {multi: true})
  WriteResult({ "nMatched" : 2, "nUpserted" : 0, "nModified" : 1 })
```

deleting documents.
```
> db.lists.remove({name: 'fruit'})
  WriteResult({ "nRemoved" : 1 })
```

dropping the collection.
```
db.lists.drop()
```

### 2.1 Test Your Knowledge

1. create an `address` collection to store names and addresses
2. add 5 documents to this new collection
3. try running a database search
4. update one of the addresses

## 3 Connecting to NodeJS

There are a number of different packages to allow NodeJS to communicate with a MongoDB database. The most popular are:
- [mongodb](https://www.npmjs.com/package/mongodb)
- [mongoskin](https://www.npmjs.com/package/mongoskin)
- [mongoose](https://www.npmjs.com/package/mongoose)

The **Mongoose** package is by far the most popular and so we will cover this.

1. Open the `lists/` directory and install the required packages.
2. Make sure mongo is still running in one of the terminals
3. Run the `index.js` script:
  - enter `list` to see the documents currently in the collection.
  - enter `get xxx` where xxx is one of the long id strings returned in the previous task
  - enter `add databases:mysql,mongodb,neo4j`
  - use `list` again to see the updated document collection
  - use `clear` to remove all the lists and check they are gone
4. open the `mongo.js` file and read through the code and comments to ensure you understand how it works.
  - notice the schema it defines
  - see how the `List` object is used to add and remove items

### 3.1 Test Your Knowledge

1. modify the schema to include a description field
2. modify the app to send this data through to the database
3. implement a way to retrieve a list by its name

### 3.2 Advanced Challenge

Can you work out a way to _update_ either the name of a list or append new items to it? You will need a good grasp of the _mongo shell_ update syntax as well as finding out how to implement it using Mongoose. Good luck!