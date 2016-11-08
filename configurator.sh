#!/usr/bin/env bash

# replace the string below with your GitLab repository
ORIGIN="git@gitlab.com:marktyers/xxx.git"
NODE="7.0.0"

# Script to install and configure a CodeAnywhere container

sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install tree nano git expect -y

spawn ssh-keygen
expect "Enter file*" { send "\r" }
expect "Overwrite*" { send "\r" }
interact

git clone https://github.com/covcom/304CEM.git .
git remote rename origin upstream
git remote add origin $ORIGIN
git remote -v
#spawn git push origin master
#expect "continue connecting*" { send "yes\r" }
#interact

echo "################PUBLIC KEY################"
cat ~/.ssh/id_rsa.pub
echo "################PUBLIC KEY################"

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
echo "source ~/.nvm/nvm.sh" >> ~/.bashrc
source ~/.nvm/nvm.sh
nvm install $NODE
nvm alias default $NODE
source ~/.nvm/nvm.sh
node -v
