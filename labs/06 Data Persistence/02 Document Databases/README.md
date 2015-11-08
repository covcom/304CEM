# Document Databases

In this worksheet you will install the MongoDB database and learn how to query it, initially using the **mongo shell** and then using the native _NodeJS_ drivers.

## 1 Installation

install mongodb

Use the terminal to navigate to the root of your project and create a data directory.

```
cd ~
mkdir data
echo 'mongod --bind_ip=$IP --dbpath=data --smallfiles --nojournal journal = false --rest "$@"' > mongod
mongod --smallfiles
```
## 2 Mongo Shell

Launch Mongo Shell

new terminal window, enter commands at the mongo prompt `>`.
```
mongo
```
type in `help` to see the options.

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
## 3 Connecting to NodeJS

There are a number of different packages to allow NodeJS to communicate with a MongoDB database. The most popular are:
- [mongodb](https://www.npmjs.com/package/mongodb)
- [mongoskin](https://www.npmjs.com/package/mongoskin)
- [mongoose](https://www.npmjs.com/package/mongoose)

In this exercise we will use the mongoskin driver as it works in a similar manner to running the commands in mongo shell.

Open the
