<img align="right" src="01 Introduction to ECMAScript 6/.images/uni_logo.png">
.

.
#304CEM

Welcome to **Web API Development**. You are probably viewing this via **GitHub** so one of the first tasks we will be carrying out is showing you how to *clone* your own copy of the code and maintain it on *your own Git repository*.

Before we get started it is worth reiterating that the module covers some advanced programming concepts which you will be required to demonstrate in your assignment which is entirely assessed through a practical coursework assignment. The module comprises twelve topics, each containing three worksheets. You will spend all semester *writing complex JavaScript applications*.

You will be shown how to use an online IDE called **Codeanywhere**, however you are encouraged to make use of any other platforms and tools.

# 1 Getting Started

## 1.1 Creating a Codeanywhere Project

Start by creating yourself an account on **Codeanywhere** (https://codeanywhere.com) and logging in. Create a new **project** and give it the name `304CEM`. When you first open it you will be asked to create a new connection. Give it the name **Labs** and choose the **Blank Development Stack** running **Ubuntu**.

When the project opens you will be given a series of important URLS, make sure you make a note of these:

1. SSH Access URL (e.g. host15.codeanyhost.com:54364)
2. Container URL (e.g. http://Labs-marktyers842735.codeanyapp.com)
3. HTTPS URL (e.g. https://Labs-marktyers842735.codeanyapp.com)

## 1.2 Cloning the Lab Materials

All the lab worksheets and sample code is located on Github. Before we start the labs this will need to be cloned into your _Codeanywhere_ project.

Start by opening the **Terminal**. This can be accessed through the connection open menu. Right-click on the connection in the file explorer and choose **SSH Terminal** as shown. Once this is open we can clone the lab materials using the command below **(make sure you don't forget to include the final period (full stop)**.
```
git clone https://github.com/covcom/304CEM.git .
```

This will clone the remote repository containing the lab materials into the workspace directory, you should be able to see this in the workspace filetree.
```
git status
```
This command prints a status message from the Git repository.

## 1.3 Creating a New Repository

At the moment we are working on a copy of the repository hosted on GitHub. As we complete the lab activities it is important to keep a backup copy of our files. This can't be backed up on the GitHub repository since it is read-only. The solution is to create our own remote repository (on GitLab) and push the changes to this.

Create an account and log into **GitLab** (https://gitlab.com). Create yourself a new empty repository by clicking on the green **New project** button in the top-right corner of the page. In the *project path* you should enter **304CEM** and in the *Description* field enter *Developing the Modern Web 2*. Set the *visibility level* to **Private** and click on **Create Project*. You will be taken to the project home screen.

Next you need to copy the repository URL to your clipboard. It should be similar to:

`git@gitlab.com:username/304CEM.git`

Now return to the codeanywhere Workspace. We need to update the remote repository URL so it points to our new repository. First lets check the current remote settings.
```
git remote -v
origin  https://github.com/covcom/304CEM.git (fetch)
origin  https://github.com/covcom/304CEM.git (push)
```
As you can see your workspace points to the readonly version on GitHub. Lets change this to point to our read-write repository on GitLab. Make sure you substitute your own URL.
```
git remote set-url origin git@gitlab.com:username/304CEM.git
git remote -v
origin  git@gitlab.com:username/304CEM.git (fetch)
origin  git@gitlab.com:username/304CEM.git (push)
```
You will notice that your remote called *origin* now points to your new GitLab repository.

Finally we need to configure Git on codeanywhere with our name and email address. Make sure this matches the name and email you used when setting up your GitLab account.
```
git config --global user.name 'Your Name'
git config --global user.email 'your@email.com'
```

## 1.4 Configuring SSH Keys

We need to store our Codeanywhere public key on the GitLab server before we can securely push our changes.

The public key is located in a hidden directory `~/.ssh/id_rsa.pub` so we can display it in the terminal using the `head` command, `head ~/.ssh/id_rsa.pub`. It should look something like this:
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDSCy6EwmkKN2eouhNlC7+4DvC12akRIQAOOdkeiXbQXSdgeYZFXLu108eeADc1gZuVbuUOzwP
U17RIJJEINFNsJNC3p+odMHiPdm01FYgPyzxfZhtTCUB1JDVfgKHLd9YG+10kg4Zo+GzWVZFOzur/otL9Vmtibv7yuOAQOMTzyvQaanAFbvMVDp
tuGRLop+4Hvnft+d8YPERgk4TE+cXdytDKVL3j2I6+qTPXkScJOdivOuEd+XbuD+tk7XX8qeTZvjiYsO9Irog27XAi0P1qwjZKmu6KZMmwgZZNr
tWp0rXyaNYTnVkY1fkYhPPG3TeKTndSesN2xJ7GeKD codeanywhere-ssh-key
```

Now open your GitLab home screen and click on the **Profile Settings* button (the gear in the top-right corner of the page). Click on the **SSH Keys** tab located down the left-edge of the screen and click on the green **Add SSH Key** button. Paste the key into the large field and give it the title **codeanywhere**. Finally click on the **Add Key** button.

## 1.5 Pushing to the New Remote

The final step is to push the local copy of your repository to the new *origin* remote. This will upload all the files and change history to your own remote on GitLab.
```
git push origin master
```
If you now open the *GitLab* repository you will see a **files** link down the left-hand side of the screen. If you click on this you will see all the project files on your GitLab repository.

## 1.6 Pulling Changes

Over the course of the module there will be changes made to the original read-only repository on GitHub. To allow access to these changes you will need to add a second remote to your local codeanywhere repository (we will label this as the *upstream* repository).
```
git remote -v
git remote add upstream https://github.com/covcom/304CEM.git
git remote -v
```
Before you start each worksheet take a few moments to sync your fork which will keep it up to date with the original.
```
git pull upstream master
```
This will pull down any new files or changes from the GitHub repository and merge them into your local copy. In this way you will always have the latest versions of the teaching materials.

## 1.7 Commiting Working Code

At the end of each exercise you should get into the habit of committing your working code.
```
git status
git add .
git commit -m 'finished exercise xxxx'
```

## 1.8 Pushing to Your Remote

At the end of your programming session you should push all these new commits back to your GitLab repository.
```
git log origin/master..HEAD
git push origin --all
git log origin/master..HEAD
```

## 1.9 Next Steps

Now you are ready to start learning. Open the directory containing the first topic and follow the instructions given.
