
# Docker

Deployed apps have dependencies
Server should have identical configuration to development machine
Differences can cause the deployed app to fail

Docker containers wrap a piece of software in a complete filesystem
Contains everything needed to run
Guarantees that the software will always run the same, regardless of its environment
Containers can interact with each other
Micro-services

Latest approach to resolving dependency issues
Makes projects easier to develop and deploy to multiple platforms
Adopted by most of the cloud providers such as Amazon and Google as well as all the major platforms (Windows, Linux, etc.)
If you plan on developing cloud-based solutions you need to be comfortable working with the Docker platform stack.

Containers

Contain the application files and dependencies.
Share the kernel with other containers.
Run in isolated processes in host OS.

Benefits of Docker

Portability
Apps built on the Docker platform can be deployed to any server running docker machine regardless of the underlying infrastructure.
Composability
Apps can be composed from multiple containers. Each containers can communicate securely with others.
Scalability
Many containers can run on the same hardware and multiple machine can be clustered into a single virtual server.

Limitations

Docker Engine only runs on Ubuntu (Linux).
For local testing need a virtual machine.
We will install VirtualBox in our demo.
Won't work with Cloud9.
Each C9 instance is already a docker container!

Toolchain works best using Ubuntu.
This is the platform for all examples.

The Docker Toolchain

Docker Engine
a lightweight runtime and robust tooling that builds and runs your Docker containers
Docker Compose
Compose is a tool for defining and running multi-container Docker applications.
Docker Machine
Provisions and manages multiple remote Docker hosts including Swarm clusters

Docker for Mac

If developing on Mac or Windows.
Need to install the Docker Suite.
Includes:
Docker Engine
Compose
Machine
Kitematic (a GUI Management Tool)

Docker Engine

A lightweight runtime and tooling.
Installed on clients.
Builds and runs Docker containers.
Runs on Linux to create the operating environment for distributed applications.
The in-host daemon communicates with the Docker client to execute commands
Build, ship and run containers.

Docker Machine

Provisioning the docker daemon on any device
Gets target ready to run docker containers
Manage multiple Docker hosts across multiple platforms
Run docker commands on targets.

Docker Swarm

Native clustering for Dockerized distributed apps.
Optimises host resource utilization and providing failover services.
Create resource pools of hosts running Docker daemons.
Schedules Docker containers to run on top.
Automatically manages workload placement
maintaining cluster state.
Policy-based scheduling.

Docker Compose

employ Docker Compose to assemble multi-container distributed apps that run on top of these clusters.
define your multi-container application with all of its dependencies in a single file, then spin your application up in a single command.

Installing Docker on Ubuntu

Needs Kernel version 3.13+
uname -r
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates
sudo apt-key adv \
               --keyserver hkp://ha.pool.sks-keyservers.net:80 \
               --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" | sudo tee \
/etc/apt/sources.list.d/docker.list
sudo apt-get update
sudo apt-get install docker-engine

Installing VirtualBox

add-apt-repository "deb http://download.virtualbox.org/virtualbox/debian vivid contrib"
wget -q http:/sudo apt-get install virtualbox-5.0/download.virtualbox.org/virtualbox/debian/oracle_vbox.asc -O- | sudo apt-key add -
sudo apt-get install virtualbox-5.0

A Local Development Environment
```
docker-machine create --driver virtualbox develop
  Creating VirtualBox VM...
  Creating SSH key...
  Starting VirtualBox VM...
  Starting VM...
  To see how to connect Docker to this machine, run: docker-machine env develop
docker-machine env develop
  export DOCKER_TLS_VERIFY="1"
  export DOCKER_HOST="tcp://192.168.99.100:2376"
  export DOCKER_CERT_PATH="/home/marktyers/.docker/machine/machines/develop"
  export DOCKER_MACHINE_NAME="develop"
  # Run this command to configure your shell:
  # eval "$(docker-machine env develop)"
eval "$(docker-machine env develop)"
```

Docker Machines

The eval command assigns the correct values to the system variables
configures the shell to talk to our new server.
Makes the server active.
It will be the target of any docker and docker-compose commands.
We can check this has worked.
docker-machine ls

Docker Machine Commands
```
docker-machine active
docker-machine ip dev
docker-machine inspect dev
docker-machine config develop
docker-machine ssh dev    (type exit to quit)
docker-machine stop dev
docker-machine ls
docker-machine start dev
```

Base Images

Every custom image needs to start from a base image.
Hundreds to choose from
https://hub.docker.com/explore/
We will be building an API using NodeJS
Makes sense to use the official NodeJS image.
The latest named version is 5.9.0 (wheezy)
https://hub.docker.com/_/node/

