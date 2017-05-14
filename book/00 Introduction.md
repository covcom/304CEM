
# Introduction

This book covers advanced programming concepts using multiple paradigms. It is assumed that you are already comfortable writing and testing large amounts of code.

It is based on a long-running module at Coventry University called Web API Development.

By the end of this book you will:

- Have learned cutting-edge JavaScript skills
- Be capable of developing powerful, complex APIs using NodeJS, a version of JavaScript that runs on the server
- Be able to employ industry-standard skills
- Be able to write complex automated testing suites
- Have mastered the key aspects of version control

So why learn about developing web APIs?

- Businesses rely on Web APIs.
- All modern websites and smartphone apps rely on APIs to communicate.
- JavaScript is the most popular language in the world.
- NodeJS is the most important language for server-side programming.

## Book Structure

The book is divided into three parts. In part (chapters 1-3) one we cover the principles behind the latest JavaScript (ECMA) language. In part two (chapters 4-6) we cover how to design RESTful APIs and how to build these. In the final part we cover a range of advanced topics to help you when you start writing more complex API.

## How to Use This Book

Each chapter is divided into two sections. Part 1 covers the core features which you will absolutely need to know whilst Part 2 covers the more advanced features that you will find useful.

The learning revolves around reading and understanding code then testing your knowledge. Rather than printing out these scripts in their entirety, the book will highlight key concepts and give you a reference to the full code which is available on GitHub.

If you are an experienced programmer feel free to skim over the part 1 content and focus on the advanced stuff in part 2.

If you do not have lots of experience stick with the part 1 content then come back later, when you have more experience and tackle the content in part 2.

### Cloning the Sample Code

Whilst you could simply download the sample code from GitHub it is recommended that you clone this. The benefits are that as bugs are found and the exercise files improved, you can pull these changes into your local copy of the code.

Assuming you are running a *NIX system you can clone the materials. This command will create a `nodejs/` directory in your `Documents/` directory containing all the sample code.
```
git clone https://github.com/covcom/304CEM.git ~/Documents/nodejs
```

## Your System

All the examples and exercises in this book are based on an Ubuntu-based system however if you are not using this platform you have several choices:

1. You can take the plunge and install Ubuntu (either on its own or dual-book). There are plenty of online tutorials that cover this.
2. You can run Ubuntu as a virtual machine. One option is to use [VirtualBox](https://www.virtualbox.org) which is a free download and available for all major platforms.
3. Use a different flavour of Linux or Unix such as Fedora or MacOS (most of the commands will work just fine).
4. Stick with Windows and work around the issues.

## Installing NodeJS

Let's get started by installing the latest version of NodeJS. Whilst you would need to download and install a separate install for each version from the [NodeJS downloads page](https://nodejs.org/en/download/current/), because we are running a Linux distribution (you did read the previous section didn't you?) we can install the [Node Version Manager](https://github.com/creationix/nvm) and use this to install whatever version of Node we want. Lets fire up the Terminal. We need to use the cURL command to download the installation shell script and pipe it to the `bash` command to run it.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```
The installation script has added a new path to your shell configuration and this needs to be loaded again. You have two choices, either log out then log in again or reload the shell using `source ~/.bashrc`.

Now we can use this tool to check for the versions of NodeJS available. The latest version (7.10.0 at the time of writing) will be at the end of the list.
```
nvm list-remote
         ...
         v7.0.0
         v7.1.0
         v7.2.0
         ...
         v7.10.0
```
Finally we can install the current (latest) version (v7.10.0) at the time of writing.
```
nvm install 7.10.0
  Downloading https://nodejs.org/dist/v7.10.0/node-v7.2.0-linux-x64.tar.xz...                        
  ######################################################################## 100.0%
  Now using node v7.10.0 (npm v3.10.9)  
  default -> 7.10.0 (-> v7.10.0) 
```
Finally we can check which version is installed.
```
node -v
  v7.10.0
```

## Installing a Code Editor

There are plenty of choices when it comes to editors. The examples in this book will use the [Visual Studio Code](https://code.visualstudio.com) editor which is available for all major platforms. If you are looking at other editors then choose one that supports JavaScript and plugins.

Note that you may need to update the configuration database before Visual Studio Code will install.
```
sudo apt-get update && sudo apt-get install libgconf2-4
```