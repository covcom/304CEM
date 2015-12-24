
# Jenkins CI Server

In this worksheet you will learn how to build an configure a Jenkins CI server. This open source platform is the most popular option and is used by many organisations such as Microsoft. To make this project easy to manage you will build the CI server on a Raspberry Pi.

Start by downloading the [Minibian Operating System](https://minibianpi.wordpress.com) and installing it on your SD card.

## Installing the Base Image

The first step is to install the base image on the SD card. There are [detailed instructions](https://www.raspberrypi.org/documentation/installation/installing-images/mac.md) available on the Raspberry Pi website.

## GitLab CI

An alternative to _Jenkins_ is to use **GitLab CI** as a CI server.

### Installing on RPi

```
wget https://s3-eu-west-1.amazonaws.com/downloads-packages/raspberry-pi/gitlab_7.9.0-omnibus.pi-1_armhf.deb
sudo dpkg -i gitlab_7.9.0-omnibus.pi-1_armhf.deb
```
You need to add at least 1GB of swap (lets add 2GB to be sure)

edit the  `/etc/dphys-swapfile` file and set the swap to `CONF_SWAPSIZE=2000` then restart the swapfile.
```
/etc/init.d/dphys-swapfile stop
/etc/init.d/dphys-swapfile start
```

## References

http://antonylees.blogspot.co.uk/2012/08/running-jenkins-ci-on-raspberry-pi.html

https://strongloop.com/strongblog/roll-your-own-node-js-ci-server-with-jenkins-part-1/
