![Docker Logo](https://upload.wikimedia.org/wikipedia/commons/7/79/Docker_%28container_engine%29_logo.png)

Docker is the latest approach to resolving dependency issues and making projects easier to develop and deploy to multiple platforms. The technology has been adopted by most of the cloud providers such as Amazon and Google as well as all the major platforms (Windows, Linux, etc.). If you plan on developing cloud-based solutions you need to be comfortable working with the **Docker** platform stack.

In this worksheet you will be getting familiar with the technology by installing the tools and building a single-container web app before deploying it to ** Google Cloud**. You will cover:

1. Creating and managing Docker Machines both locally and on the cloud
2. Writing a **Dockerfile** script to Download a base image from **Docker Hub** and build a custom image
3. Using the **Docker Compose** tool to deploy your container to both a local virtual machine and to a cloud host

You will need to use these skills is your assignment when you develop and deploy your API and client.

## 1. Installation

The installation instructions depend on the operating system you are running. You can find detailed information below:
Regardless of what platform you are running you will need also to install **VirtualBox**.

Ubuntu
```
wget -qO- https://get.docker.com/ | sh
curl -L https://github.com/docker/compose/releases/download/1.4.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
curl -L https://github.com/docker/machine/releases/download/v0.4.0/docker-machine_linux-amd64 > /usr/local/bin/docker-machine
chmod +x /usr/local/bin/docker-machine

add-apt-repository "deb http://download.virtualbox.org/virtualbox/debian vivid contrib"
wget -q http:/sudo apt-get install virtualbox-5.0/download.virtualbox.org/virtualbox/debian/oracle_vbox.asc -O- | sudo apt-key add -
sudo apt-get install virtualbox-5.0
.
```

Mac OSX

http://docs.docker.com/mac/started/

Windows

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
