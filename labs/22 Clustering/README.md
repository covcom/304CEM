# Clustering

container stats
Docker API to monitor stats
google container Advisor (*container stats* section of **Docker Up and Running** book)

## References

Google Container Advisor

https://hub.docker.com/r/google/cadvisor/

## Commands

https://docs.docker.com/swarm/install-w-machine/

docker-machine create -d virtualbox local

eval "$(docker-machine env local)"

Generate a discovery token using the Docker Swarm image.

The command below runs the swarm create command in a container. If you haven’t got the swarm:latest image on your local machine, Docker pulls it for you.

docker run swarm create

this returns a token which you need to keep in a safe place.

c951e431d4c302fa350c9fb4f009d07e

Now we will create a swarm manager and two nodes.

Create a swarm manager
```
docker-machine create -d virtualbox --swarm --swarm-master --swarm-discovery token://c951e431d4c302fa350c9fb4f009d07e swarm-master

docker-machine ls
NAME           ACTIVE   DRIVER       STATE     URL                         SWARM
local          *        virtualbox   Running   tcp://192.168.99.101:2376
swarm-master            virtualbox   Running   tcp://192.168.99.102:2376   swarm-master (master)

docker-machine create -d virtualbox --swarm --swarm-discovery token://c951e431d4c302fa350c9fb4f009d07e swarm-agent-00
docker-machine create -d virtualbox --swarm --swarm-discovery token://c951e431d4c302fa350c9fb4f009d07e swarm-agent-01
docker-machine ls
NAME             ACTIVE   DRIVER       STATE     URL                         SWARM
local            *        virtualbox   Running   tcp://192.168.99.101:2376
swarm-agent-00            virtualbox   Running   tcp://192.168.99.103:2376   swarm-master
swarm-agent-01            virtualbox   Running   tcp://192.168.99.104:2376   swarm-master
swarm-master              virtualbox   Running   tcp://192.168.99.102:2376   swarm-master (master)

eval "$(docker-machine env --swarm swarm-master)"

docker info
Containers: 4
Images: 3
Role: primary
Strategy: spread
Filters: affinity, health, constraint, port, dependency
Nodes: 3
 swarm-agent-00: 192.168.99.103:2376
  └ Containers: 1
  └ Reserved CPUs: 0 / 1
  └ Reserved Memory: 0 B / 1.022 GiB
  └ Labels: executiondriver=native-0.2, master : 7f12e95 - provider=virtualbox, storagedriver=aufs
 swarm-agent-01: 192.168.99.104:2376
  └ Containers: 1
  └ Reserved CPUs: 0 / 1
  └ Reserved Memory: 0 B / 1.022 GiB
  └ Labels: executiondriver=native-0.2, master : 7f12e95 - provider=virtualbox, storagedriver=aufs
 swarm-master: 192.168.99.102:2376
  └ Containers: 2
  └ Reserved CPUs: 0 / 1
  └ Reserved Memory: 0 B / 1.022 GiB
  └ Labels: executiondriver=native-0.2, master : 7f12e95 - provider=virtualbox, storagedriver=aufs
CPUs: 3
Total Memory: 3.065 GiB
Name: d29f9532c0db
```
Now we can deploy our app to the Docker Swarm cluster. navigate to the directory with the docker-compose.yml file.
```
eval "$(docker-machine env --swarm swarm-master)"
docker-compose build
docker compose up -d
```
## Exposing Ports

Basically, you have three options:

    Neither specify EXPOSE nor -p.
    Only specify EXPOSE.
    Specify EXPOSE and -p.

If you do not specify any of those, the service in the container will not be accessible from anywhere except from inside the container itself.

If you EXPOSE a port, the service in the container is not accessible from outside Docker, but from inside other Docker containers. So this is good for inter-container communication.

If you EXPOSE and -p a port, the service in the container is accessible from anywhere, even outside Docker.
```
# private and public mapping
EXPOSE 80:8080

# private only
EXPOSE 80
```
## Successful Steps.
```
docker-machine create -d virtualbox local
eval "$(docker-machine env local)"

The create command returns a unique cluster ID. You’ll need this ID when starting the Docker Swarm agent on a node.
```
docker run swarm create
```
A single system in your network is known as your Docker Swarm manager. The swarm manager orchestrates and schedules containers on the entire cluster. The swarm manager rules a set of agents (also called nodes or Docker nodes). Swarm agents are responsible for hosting containers. Once created, this will appear as a VM in VirtualBox.
```
docker-machine create -d virtualbox --swarm --swarm-master --swarm-discovery token://c951e431d4c302fa350c9fb4f009d07e swarm-master
docker-machine ls
```
Now we will create two agents.
```
docker-machine create -d virtualbox --swarm --swarm-discovery token://c951e431d4c302fa350c9fb4f009d07e swarm-agent-00
docker-machine create -d virtualbox --swarm --swarm-discovery token://c951e431d4c302fa350c9fb4f009d07e swarm-agent-01
```
Point your Docker environment to the machine running the swarm master and then get information about your new awarm.
```
eval $(docker-machine env --swarm swarm-master)
docker info
```
Navigate to the directory containing your docker-compose.yml file and then build and launch the containers on the cluster.
```
docker-compose build
docker-compose up -d
docker ps -a
curl 192.168.99.106
```
