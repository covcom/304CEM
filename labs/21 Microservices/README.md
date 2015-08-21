# Microservices

The web apps you have been developing up to this point have used a **monolithic** atchitecture, that is to say all of the resources and logic sit in one place. The only structure has been the use of modules to separate out the different functionalities.

This only works up to a certain scale. How can you adapt your app to scale for a large number of users? According to Martin Abbot and Michael Fisher in their book **The Art of Scalability** there are three ways to do this, which are described as three axis on a *Scalability Cube*.

1. **X-Axis Scaling**: which involves duplicating an application and running it behind a load-balancer. We will look at this option in the advanced lab.
2. **Y-Axis Scaling**: which involves splitting the application into multiple different services running on different machines. This is the topic for this worksheet.
3. **Z-Axis Scaling**: in which the same services run on all the servers but the work is split based on the data requested. In database terms this is known as *sharding*.

In reality a large API makes use of more than one approach and likewise you will be able to combine X and Y axis scaling approaches in your assignment.

## 1. The Ports and Adapters Design Pattern

In this design pattern we split the application into two parts:

1. **Inside**: this is where the business logic of the application sits.
2. **Outside**: anything that needs to talk to the business logic including user interface and data stores.

The application/business logic communicates with the outside world through an API, typically REST-compliant. Each external *device* whether it be a UI or a datastore has an **adapter** that converts the API into something it can understand (and vis versa).

For example the adapter for the UI might be an Angular application whilst the adapter for a document database might be an API wrapper (or simply the built-in datastore API). Each of these components is therefore a **Microservice**, hence the name of the worksheet!

![Ports and Adapters Design pattern](http://alistair.cockburn.us/get/2302)

In this worksheet you will be using **Docker** to build a series of microservices to create a solution that adheres to the *ports and adapters* design pattern described above.

## 2. architecture Design

The aim of this exercise is to develop an online chatroom. This simple app requires the following functionality:

1. **api**: this is the API that the client will interact with.
2. **logs**: this subscribes to the logs channel and logs any data it receives to a csv file.
3. **mysql**: this container runs a database to store all the chat messages.
4. **redis**: this container runs a redis database to act as a broker for PubSub messages.

Start by locating the chat directory and examining the directories and files it contains. The scripts for each of the containers are located in individual directories, each contains the **Dockerfile** needed to build it plus any scripts required. Read through each of the Dockerfiles so you are clear as to how the images will be built.
```
.
└── chat
    ├── docker-compose.yml
    ├── api
    │   ├── Dockerfile
    │   └── index.js
    ├── logs
    │   ├── Dockerfile
    │   └── index.js
    ├── mysql
    │   └── Dockerfile
    └── redis
        └── Dockerfile

```
At the top level there is a single docker-compose.yml file. This will orchestrate the building of all four images and will spin up the containers with the correct settings. You are already familiar with the concepts of **ports** and **volumes** from the previous worksheet. Notice that both the *logs* and the *mysql* containers need to persist their data and so only these have volume mappings.

If a container needs to directly communicate with another container you should create a **link** to it. This mechanism achieves two things:

1. The container name is added to the `/etc/hosts` file which allows the client to reference the container by name
2. Any environment variables are added to the linking container. These should be used to connect to the hosted services

If you open the **api/index.js** file you can see how the environment variables are used to connect to Redis (lines 4-5) and mysql (lines 12-15).

Finally it is possible to assign values to container environment variables in the docker-compose.yml file. You can see that we are setting the mysql root password as well as creating our database and creating a new database user (lines 18-21). The specifics vary from image to image and can be found by consulting the documentation on hub.docker.com.

## 3. Spinning Up the Containers

### 3.1 Creating a Docker Host

As before, lets create a new Docker Host on our local machine where we can develop and test our app. These steps were covered in detail in the previous worksheet.
```
docker-machine create --driver virtualbox chat
eval "$(docker-machine env chat)"
docker-machine ls
  NAME   ACTIVE   DRIVER       STATE     URL
  chat   *        virtualbox   Running   tcp://192.168.99.100:2376
docker-machine ip chat
  192.168.99.100
```
### 3.2 Building the Images

If we open the Terminal and navigate to the chat directory we can run **docker-compose** to build the required images and spin up the necessary containers. This will download the base images and use these to create the four custom images we need.
```
docker-compose build
docker images
  REPOSITORY          TAG     IMAGE ID      CREATED         VIRTUAL SIZE
  chat_api            latest  109f0a9f0366  42 minutes ago  657.6 MB
  chat_logs           latest  0aea91120603  2 hours ago     644.6 MB
  mysql/mysql-server  5.7     14fb27d2459c  2 days ago      277.7 MB
  chat_mysql          latest  14fb27d2459c  2 days ago      277.7 MB
  node                0.12.7  9e20baae42c8  13 days ago     641.6 MB
  redis               3.0.3   0ff407d5a7d9  4 weeks ago     109.5 MB
  chat_redis          latest  0ff407d5a7d9  4 weeks ago     109.5 MB
```
Notice that since we didn't modify two of the images their IMAGE ID values match the original downloads.

### 3.3 Spinning up the Containers

Finally we can use **docker-compose** to spin up all four containers.
```
docker-compose up -d
docker ps
CONTAINER ID  IMAGE       CREATED             STATUS         NAMES
ddb57ad8b258  chat_api    47 minutes ago      Up 47 minutes  chat_api_1
45db7b24309e  chat_mysql  2 hours ago         Up 2 hours     chat_mysql_1
6c8f35f2adf9  chat_logs   2 hours ago         Up 2 hours     chat_logs_1
76e084a8701b  chat_redis  2 hours ago         Up 2 hours     chat_redis_1
```

### 3.4 Test Your Knowledge

At the moment the data is being persisted to a MySQL database. make the following changes to your app.

1. create a container with a **couchdb** database inside it.
2. modify your **api** to store each message both in the MySQL database and in a new document using the **timestamp** as the key

## 4. Testing the App

Now we have our containers its time to test the functionality. You can do this either using **cURL** or a web-based tool such as **Chrome Postman**. Find the Docker Container IP address and use this to perform a POST operation.
```
docker-machine ip chat
  192.168.99.100
curl -X POST --data "name=JohnDoe&message=HelloWorld" 192.168.99.100
  {"name":"JohnDoe","message":"HelloWorld","timestamp":1440012492}
```

### 4.1 Checking the Logs

we have mapped the volume on the container where the text file is saved to the `/home/docker/logs` directory on the host so there are two locations we would expect to find the file. We can carry out several checks to see if the task is being carried out correctly.

1. view the console messages in the container
2. check the contents of the log file in the container
3. check the contents of the log file saved on the host (remember the volume mapping)
```
docker logs chat_logs_1
  REDIS PORT: 6379
  REDIS IP:   172.17.0.4
  subscribed to "test" channel
  MESSAGE RECEIVED
  CHANNEL: logs
  MESSAGE: {
    "name": "JohnDoe",
    "message": "HelloWorld",
    "timestamp": 1440013064
  }
  LOG DATA: 1440013064,"JohnDoe","HelloWorld"

  DATA APPENDED TO LOG

docker exec -ti chat_logs_1 ls /home/data/
  logs.csv

docker exec -ti chat_logs_1 tail /home/data/logs.csv
  1440013064,"JohnDoe","HelloWorld"

docker-machine ssh chat
ls
  logs/  mysql/
ls logs/
  logs.csv
tail logs/logs.csv
  1440013064,"JohnDoe","HelloWorld"
q
exit
```
By carrying out these tests you can ensure that the logs container is performing correctly. You should make use of these tools when debugging your own app containers.

### 4.2 Checking the Database

Each message is being inserted into a MySQL database table in the **mysql** container. We should carry out tests to ensure this is working correctly. This can be done by connecting to the database in the container and running SQL queries. You will need to install the **mysql-client** app.
```
sudo apt-get install mysql-client
mysql -h 192.168.99.100 -u chatuser -p
Enter password:
mysql> show databases;
mysql> use chat
mysql> show tables;
mysql> describe message;
mysql> select * from message;
exit
```

### 4.3 Test Your Knowledge

You can carry out further tests on the **mysql** container based on those used to test the **logs** container.

1. view the messages in the console
2. check the database files are being stored in the container
3. check that these same files are being mapped to the docker host

In the previous section you implemented a **couchdb** container. How could you test that it is functioning correctly?

## 5. Retrieving the Conversation

If you examine the api/index.js file you will see that the GET / route is incomplete. Your final challenge is to apply all that you have learned from this worksheet to implement the missing functionality. It should return an array of messages in time order, recreating the message thread. You may choose to use the data in either the **MySQL** database or the **CouchDB** database.


## 6.  Benchmarking

As you develop your apps you need to check that they perform in a satisfactory manner under load. This means measuring how well it can handle multiple concurrent requests from different users. Doing this manually would require you to get lots of users to send requests at the same time or wait until the app goes live and see how it can handle the load.

Thankfully there are a number of tools available to simulate multiple connections to the server and the most popular one is called **Apache Bench**. This is an open source tool which will need to be installed on your development machine. Once installed we can quickly run benchmarking tests. In the example we ask the tool to make 2000 requests with 500 happening concurrently (at the same time). Finally we run the same test again using a POST request but with fewer concurrent requests.
```
sudo apt-get install apache2-utils
ab -n 2000 -c 500 http://192.168.99.100/
ab -n 20 -c 2 -p post_data -m POST http://192.168.99.100/
```
### 6.1 Documentation

You will be expected not only to build online apps but also to run benchmarks with appropriate values and interpret the results. You should take the time to read the documentation. As with most open-source tools this is available at two levels.

1. you can use the **--help** flag, `ab --help` to get a quick summary of the options
2. you can access the full manual `man ab` as well. The space bar moves forward a page, the *b* key moves back and the *q* key quits.

## References

Sam Newman (2015) Building Microservices, : O'Reilly Media, Incorporated

Ports and Adapters Design Pattern

http://alistair.cockburn.us/Hexagonal+architecture
