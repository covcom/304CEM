![Docker Logo](.images/docker_logo.png)

Docker is the latest approach to resolving dependency issues and making projects easier to develop and deploy to multiple platforms. The technology has been adopted by most of the cloud providers such as Amazon and Google as well as all the major platforms (Windows, Linux, etc.). If you plan on developing cloud-based solutions you need to be comfortable working with the **Docker** platform stack.

In this worksheet you will be getting familiar with the technology by installing the tools and building a single-container web app before deploying it to ** Google Cloud**. You will cover:

1. Creating and managing Docker Machines both locally and on the cloud
2. Writing a **Dockerfile** script to Download a base image from **Docker Hub** and build a custom image
3. Using the **Docker Compose** tool to deploy your container to both a local virtual machine and to a cloud host

You will need to use these skills is your assignment when you develop and deploy your API and client.

## 1. Installation

The installation instructions depend on the operating system you are running. You can find detailed information below:
Regardless of what platform you are running you will need also to install **VirtualBox**.

### Ubuntu
These instructions assume you are running the latest version of Ubuntu (16.04 at the time of writing). The first step is to check you are running a kernel version of **3.10 or higher**. Then we need to install the `linux-image-extra` package for the kernel we are running.
```
$ uname -r
  4.4.0-45-generic
$ sudo apt-get install linux-image-extra-$(uname -r) linux-image-extra-virtual
```
Next we need to make sure we are running the latest version of `ca-certificates` so that we have support for `apt` package manager over https. We can then add the new GPG key. Finally we add the repository that matches our ubuntu distro (in our case we are running 16.04 (xenial) and pull down the available packages.
```
sudo apt-get install apt-transport-https ca-certificates
sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get update
```
Now we can install the latest stable version of **Docker Engine** and start the service. Finally we run the 'hello world' image to check everything is working.
```
$ sudo apt-get install docker-engine
$ sudo service docker start
$ sudo docker run hello-world
```
#### Running Docker as Non-Root

At this stage you need to run Docker as root which is why you had to sudo the `docker-run` command. This section shows you how to configure `docker` to run using a standard user account. To do this we create a new group called `docker` and add our user to this.
```
$ sudo groupadd docker
$ sudo usermod -aG docker $USER
```
If you log out and back in again you will be able to run `docker` as a normal user.
```
$ docker run hello-world
```

### Mac OSX

http://docs.docker.com/mac/started/

### Windows

http://docs.docker.com/windows/started/

## 2. Creating Docker Hosts

Now we have installed the necessary tools we can use **docker-machine** to create *docker hosts*. We will be creating two different hosts:

1. A development host on our local machine (Virtual Box)
2. a deployment host on the cloud (Google Compute Engine)

### 2.1 Creating a Local Host

Assuming you have installed **VirtualBox**, setting up a local Docker host is very straightforward. Hosts are created using the *docker-machine* tool. This comes with a number of drivers that simplify the creation of Docker Hosts on a range of different platforms. In our case we will be using the **virtualbox** driver. We also have to give our host a name, in this case we will call it **dev** to indicate it is our development environment.
```
docker-machine create --driver virtualbox dev
  Creating VirtualBox VM...
  Creating SSH key...
  Starting VirtualBox VM...
  Starting VM...
  To see how to connect Docker to this machine, run: docker-machine env develop
```
This will take a few minutes to download a special lightweight image called *boot2docker* and use this to create a *Docker Host* ready for you to deploy your containers. If you get an error `Error creating machine: exit status 1` you need to uninstall the latest version of VirtualBox and install version 4.3.

Now we will be able to use **docker-compose** to build and deploy our containers however we need to tell this tool which host to deploy to. this is handled through the use of environment variables. These are variables that we can assign values to which are then read by *docker-compose*. To see the environment variable values for our new host we run:
```
docker-machine env dev
  export DOCKER_TLS_VERIFY="1"
  export DOCKER_HOST="tcp://192.168.99.100:2376"
  export DOCKER_CERT_PATH="/home/marktyers/.docker/machine/machines/develop"
  export DOCKER_MACHINE_NAME="develop"
  # Run this command to configure your shell:
  # eval "$(docker-machine env develop)"
eval "$(docker-machine env develop)"
```
By running this last command we assign the correct values to the variables and configure the shell to talk to our new server. This makes the server *active*. We can check this has worked.
```
docker-machine ls
NAME  ACTIVE   DRIVER       STATE     URL
dev   *        virtualbox   Running   tcp://192.168.99.100:2376
```
The asterix indicates that the **dev** host is **active** which means it will be the target of any docker or docker-compose commands. before we deploy our app lets learn some useful docker-machine commands.

### 2.2 Docker Machine Commands
Take a few moments to run the following commands and see what they do. (hint, `docker-machine --help` summarises the available commands.)
```
docker-machine active
docker-machine ip dev
docker-machine inspect dev
docker-machine config develop
docker-machine ssh dev    (hint type exit to return to your host)
docker-machine stop dev
docker-machine ls
docker-machine start dev
docker-machine ls
eval "$(docker-machine env dev)"
docker-machine ls
```
## 3. Creating a Custom Image

Now we have a host configured we need to build a custom image. This image will contain everything needed to run including binaries, modules and files.

### 3.1 Choosing a Base Image

Every custom image we create needs to start from a base image. There are hundreds to choose from. These can be found at https://hub.docker.com/explore/ and include official images from all the main vendors. Since we will be building an API using NodeJS it would make sense to use the official NodeJS image. If we locate this and examine the details we can see that the latest *named* version is **0.12.7** (https://hub.docker.com/_/node/).

Lets pull a copy of this base image into our docker host.
```
docker pull node:0.12.7
```
This will download and unpack the image. we can verify this has been completed.
```
docker images
REPOSITORY  TAG     IMAGE ID      CREATED      VIRTUAL SIZE
node        0.12.7  9e20baae42c8  11 days ago  641.6 MB
```

### 3.2 Writing a Dockerfile

Once we have this base image we will need to carry out the following steps:

1. specify the working directory (where the files will be stored)
2. install the *restify* package
3. copy the *index.js* script into the image
4. run the script using `node`.

We write these steps in a **Dockerfile** and you can see a complete one in the `20 Docker Containers/app/` directory. Take a few moments to see how the steps listed above translate into commands in the *Dockerfile*.

To build our custom image we navigate to the directory containing the Dockerfile using *Terminal* and then use the **docker** command. We should give each image a tag name that includes a version number. The final period (.) tells docker to look for a Dockerfile in the current directory.
```
docker build -t api:1.0.0 .
```
This will take the base image we have already downloaded and then run through each line in the Dockerfile. This will create a new image with the tag we supplied.
```
REPOSITORY  TAG     IMAGE ID      CREATED        VIRTUAL SIZE
api         1.0.0   6f752964c447  8 seconds ago  647.3 MB
node        0.12.7  9e20baae42c8  11 days ago    641.6 MB
```

## 4. Building Containers

The image contains the steps required to build your container. When we run this image we will create a **container** which we can interact with. There are two ways to run an image and create a container.

1. we can use the `docker run` command and pass the parameters manually
2. we can write a script describing the steps then run the script

In this worksheet we will learn the second approach which simplifies both the initial deployment of a container and automates the updating process.

### 4.1 Docker Compose

We have already learned about the **docker-machine** tools which allows us to configure our docker hosts. The next tool we will use is called **docker-compose** and this enables us to automate the container build process. The script that defines the build process is called **docker-compose.yml** and is formatted in YAML which is a human-readable version of JSON.

### 4.2 The Docker Compose File

Take a look at the file provided in the app/ directory and see if you can work out its structure and meaning.
```
api:
  build: .
  ports:
    - "80:8080"
  volumes:
    - /home/docker:/home/data
  ```
Lets take a look at the instructions. The first line names the container. The full name of the container will be app_api_1 based on the directory name and the name provided here. The *build* instruction describes where the Dockerfile is located.

We want our API to be visible on the standard http port 80 but the script `index.js` runs it on port 8080. The ports entry maps external port 80 to internal port 8080.

The final instruction is very important. Our server saves json files to a data directory under its home directory `/home/data`. Every time we rebuild the container we would lose all this data. The **volumes** section maps a directory on the host to a directory in the container. In this case the data will be saved in the host directory `/home/docker`.

### 4.3 Building the Container

Lets run the script. First lets automatically build the image.
```
docker-compose build
docker images
REPOSITORY  TAG     IMAGE ID      CREATED              VIRTUAL SIZE
app_api     latest  578e1cd3fee6  About a minute ago   647.3 MB
api         1.0.0   6f752964c447  About an hour ago    647.3 MB
node        0.12.7  9e20baae42c8  12 days ago          641.6 MB
```
Notice that docker-compose has created a new image with its name based on the directory name and the name specified in the docker-compose.yml file. Now we can power up the container as a background daemon. We can use the `docker ps` command to view all the running containers.
```
docker-compose up -d
docker ps
  CONTAINER ID  IMAGE    CREATED        STATUS        NAMES
  21e3be059266  app_api  9 seconds ago  Up 9 seconds  app_api_1
```
If everything is running correctly we should be able to make an API call and see some data returned. We will need to know the ip address of our Docker Host.
```
docker-machine ip dev
  192.168.99.100
curl -i 192.168.99.100
  HTTP/1.1 200 OK
  Content-Type: application/json
  Content-Length: 22
  Date: Tue, 18 Aug 2015 20:13:41 GMT
  Connection: keep-alive

  {"msg":"Hello World!"}
```
The nodejs script included commands that sent messages to the console but how can we view these?
```
docker logs app_api_1
  incoming request being handled
  GET request received
  data/1439932715.json
  The file was saved!
```
### 4.4 Data Persistence
Lets return to the issue of data persistence. Each time you build and spin up a container, the old container is destroyed together with any data it contained. To prevent data loss we added a **volumes** mapping in the **docker-compose.yml** file. This mapped a directory in the host to one on the container (symlink) meaning any data saved into the `/home/data` directory in the container is actually being written to the `/home/docker` directory on the host. lets see if this is true. by loggin into the dev host using `docker-machine ssh dev`
```
pwd
  /home/docker
ls
  1439932715.json  log.log
```
You can see that the current directory is `/home/docker` and that it does contain our .json document.

### 4.5 Making Changes
So far we have seen how to use the various docker commands to build an image and use this to spin up a container. Lets modify the index.js file and try rebuilding our container. Open **index.js** and change the message to read *Docker is great!*. Make sure the changes are saved. We can now build the new image and spin out a container.
```
docker-compose build && docker-compose up -d
curl -i 192.168.99.100
  HTTP/1.1 200 OK
  Content-Type: application/json
  Content-Length: 26
  Date: Tue, 18 Aug 2015 20:19:10 GMT
  Connection: keep-alive

  {"msg":"Docker is Great!"}
```
Notice how the build was much quicker this time. Since the only change was that the index.js file had been modified, docker-compose used cached versions of the build up to this point.

## 5. Deploying to the Cloud

Now we have a working app running in a local container we can use the Docker tools to quickly deploy it to the cloud. For this tutorial we will deploy our app to **Google Cloud**.

### 5.1 Creating a New Projects
Go to the Google Developer's Console https://console.developers.google.com/

Create a new project. Click on the project name to open the project dashboard. Make a note of the **project ID**.
```
Project ID: nuj-api
```
choose **APIs and Auth** then extend the *Google Cloud APIs* section to activate **Container Engine API**. Also activate **Google Compute Engine**. You will need to wait a few minutes for these settings to become active.

You need to open *port 80* for http traffic. Choose **Networking > Firewall Rules** and create a **New Firewall Rule**.

Give it a suitable name *(std http port)*, Source Filter *(Allow from any source (0.0.0.0/0))* and Allowed protocols and ports: *(tcp:80)*. Add the new rule.

### 5.2 Creating a Docker Host
You can now use the **docker-machine** tool to create the Docker Host. Remember to substutute your own project id instead of **nuj-api**.
```
docker-machine create --driver google --google-project nuj-api google-machine
```
Notice the similarity to the docker-machine command used to create the virtualbox host.

You will be taken to the oauth authentication page. Accept and copy the code you are given

Paste it into the terminal where prompted. This will then build your docker machine on the Google cloud. To configure your terminal to communicate with this machine.
```
docker-machine ip google-machine
  146.148.67.253
eval "$(docker-machine env google-machine)"
docker-machine ls
  NAME             ACTIVE   DRIVER       STATE     URL
  dev                       virtualbox   Running   tcp://192.168.99.100:2376
  google-machine   *        google       Running   tcp://146.148.67.253:2376

  docker-compose build && docker-compose up -d
  curl -i 146.148.67.253
    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Length: 26
    Date: Tue, 18 Aug 2015 20:19:10 GMT
    Connection: keep-alive

    {"msg":"Docker is Great!"}
```
As you can see, by using Docker, deployment to the cloud becomes very simple. You will need to use these techniques to deploy both your API and client as part of your module assignment.

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
    │   ├── Dockerfile
    │   └── index.js
    ├── logs
    │   ├── Dockerfile
    │   └── index.js
    ├── mysql
    │   └── Dockerfile
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

If you examine the api/index.js file you will see that the GET / route is incomplete. Apply all that you have learned from this worksheet to implement the missing functionality. It should return an array of messages in time order, recreating the message thread. You may choose to use the data in either the **MySQL** database or the **CouchDB** database.

## 6. Clustering

Up until this point you have been deploying your apps to a single server instance but how would you scale up your app? One option would be to deply each of the containers to different servers and then communicate between these servers using http. Another issue is how to handle server failure. At the moment if the server fails your website would be brought down. xxx describes this as **pet** architecture where you need to carefully support your system to prevent it from failing. A better alternative he refers to as **cattle** acrchitecture. Here, if a server fails there are plenty of others to take its place. Welcome to **Clustering**.

In clustering we group together multiple different servers which are then treated as a single *node*. if a server fails, the rest of them take up the load. Servers can be added as required to boost the provision and older ones can be removed for repairs and upgrades. Docker contains full support for clustering which it refers to as a **Docker Swarm**. You will learn how to build and support these. For the purposes of this worksheet you will be working with VirtualBox instances however later you will be encouraged to employ the same concepts to cloud instances and even Raspberry PIs!

### 6.1 Generating a Cluster ID

Each **Docker Swarm** is generated using a unique **cluster id**. This ID needs to be generated within a Docker Host and so we need to create a temporary host on VirtualBox and use this to generate the ID. You’ll need this ID when starting the Docker Swarm agent on a node.
```
docker-machine create -d virtualbox local
eval "$(docker-machine env local)"

docker run swarm create
```
Keep a copy of this **cluster id** safe, you will need it for the next steps.

### 6.2 Creating a Swarm Manager

Now we have the **cluster id** we can use this to create our **Swarm Manager**. The Swarm Manager is responsible for scheduling the system **agents**. An Agent is also referred to as a **Docker Node**. In this exercise both the Swarm Manager and the agents will appear as virtual machines in VirtualBox. We will call this **swarm-master**. Remember to use the cluster id you generated earlier.
```
docker-machine create -d virtualbox --swarm --swarm-master --swarm-discovery token://c951e431d4c302fa350c9fb4f009d07e swarm-master
docker-machine ls
  NAME             ACTIVE   DRIVER       STATE     URL                         SWARM
  local                     virtualbox   Running   tcp://192.168.99.104:2376
  swarm-master              virtualbox   Running   tcp://192.168.99.105:2376   swarm-master (master)
```
### 6.3 Creating the Agents

Now we have built the *swarm master* we can build the agents. In this example you will build two agents however in a real environment you might create 10, 100 or thousands!
```
docker-machine create -d virtualbox --swarm --swarm-discovery token://c951e431d4c302fa350c9fb4f009d07e swarm-agent-00
docker-machine create -d virtualbox --swarm --swarm-discovery token://c951e431d4c302fa350c9fb4f009d07e swarm-agent-01
```
Now we can point the Docker environment to the machine running the swarm master and then get information about your new swarm (notice the **--swarm** flag, this is important).
```
eval $(docker-machine env --swarm swarm-master)
docker info
```
### 6.4 Building and Launching Containers

Once we are pointing to our *Docker Swarm* we can deploy our app in the standard way using docker-compose. Navigate to the `Microservices/simple/` directory containing a *docker-compose.yml* file and then build and launch a container on the cluster. Locate the cluster IP address and try running a GET request using cURL or other tool.
```
docker-compose build
docker-compose up -d
docker ps -a
curl 192.168.99.106
```

## References

Sam Newman (2015) Building Microservices, : O'Reilly Media, Incorporated

Ports and Adapters Design Pattern

http://alistair.cockburn.us/Hexagonal+architecture
