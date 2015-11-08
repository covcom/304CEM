<img align="right" src="labs/01 JavaScript Language/01 Tools/images/uni_logo.png">
.

.
#305CDE

Welcome to **full-stack Javascript development**. You are probably viewing this via **GitHub** so one of the first tasks we will be carrying out is showing you how to *clone* your own copy of the code and maintain it on *your own Git repository*.

Before we get started it is worth reiterating that the module covers some advanced programming concepts which you will be required to demonstrate in your assignment which is entirely assessed through a practical coursework assignment. The module comprises twelve topics, each containing three worksheets. You will spend all semester *writing complex JavaScript applications*.

You will be shown how to use an online IDE called **Cloud 9**, however you are encouraged to make use of any other platforms and tools.

# 1 Getting Started

## 1.1 Creating a Cloud9 Workspace

Start by creating yourself an account on **Cloud 9** (https://c9.io) and logging in. Create a new workspace by clicking on the *create a new workspace* button. Give it the name **COVUNI** and the  description *Developing the Modern Web 2*. Choose the **private** option and the default **custom** template.

The most important step is to enter the 305CDE Git Repository URL in the box *Clone from Git or Mercurial URL*. You should enter:

`https://github.com/covcom/305CDE.git`

Now click on the **Create Workspace** button. This will create a new project and clone the contents of the 305CDE GitHub repository.

## 1.2 Creating a New Repository

Now create an account and log into **GitLab** (https://gitlab.com). Create yourself a new empty repository by clicking on the green **New project** button in the top-right corner of the page. In the *project path* you should enter **305CDE** and in the *Description* field enter *Developing the Modern Web 2*. Set the *visibility level* to **Private** and click on **Create Project*. You will be taken to the project home screen.

Next you need to copy the repository URL to your clipboard. It should be similar to:

`git@gitlab.com:username/305CDE.git`

Now return to the Cloud 9 Workspace. We need to update the remote repository URL so it points to our new repository. First lets check the current remote settings.
```
git remote -v
origin  https://github.com/covcom/305CDE.git (fetch)
origin  https://github.com/covcom/305CDE.git (push)
```
As you can see your workspace points to the readonly version on GitHub. Lets change this to point to our read-write repository on GitLab. Make sure you substitute your own URL.
```
git remote set-url origin git@gitlab.com:username/305CDE.git
git remote -v
origin  git@gitlab.com:username/305CDE.git (fetch)
origin  git@gitlab.com:username/305CDE.git (push)
```
You will notice that your remote called *origin* now points to your new GitLab repository.

Finally we need to configure Git on Cloud 9 with our name and email address. Make sure this matches the name and email you used when setting up your GitLab account.
```
git config --global user.name 'Your Name'
git config --global user.email 'your@email.com'
```

## 1.2 Configuring SSH Keys

We need to store our Cloud 9 public key on the GitLab server before we can securely push our changes. Locate the browser tab displaying your Cloud 9 home screen and click on the **settings** button (the small gear in the top-right of the screen). Click on the **SSH Keys** tab located down the left-side of the screen to display your public key. Select the entire key by double/triple clicking it and copy to the clipboard.

Now open your GitLab home screen and click on the **Profile Settings* button (the gear in the top-right corner of the page). Click on the **SSH Keys** tab located down the left-edge of the screen and click on the green **Add SSH Key** button. Paste the key into the large field and give it the title **Cloud 9**. Finally click on the **Add Key** button.

## 1.3 Pushing to the New Remote

The final step is to push the local copy of your repository to the new *origin* remote. This will upload all the files and change history to your own remote on GitLab.
```
git push origin master
```
If you now open the *GitLab* repository you will see a **files** link down the left-hand side of the screen. If you click on this you will see all the project files on your GitLab repository.

## 1.4 Pulling Changes

Over the course of the module there will be changes made to the original read-only repository on GitHub. To allow access to these changes you will need to add a second remote to your local Cloud 9 repository (we will label this as the *upstream* repository).
```
git remote -v
git remote add upstream https://github.com/covcom/305CDE.git
git remote -v
```
Before you start each worksheet take a few moments to sync your fork which will keep it up to date with the original.
```
git pull upstream master
```
This will pull down any new files or changes from the GitHub repository and merge them into your local copy. In this way you will always have the latest versions of the teaching materials.

## 1.5 Commiting Working Code

At the end of each exercise you should get into the habit of committing your working code.
```
git status
git add .
git commit -m 'finished exercise xxxx'
```

## 1.6 Pushing to Your Remote

At the end of your programming session you should push all these new commits back to your GitLab repository.
```
git log origin/master..HEAD
git push origin --all
git log origin/master..HEAD
```

## 1.7 Updating the Cloud Server

Finally, before starting the labs you should ensure that the required packages are installed on your cloud server. This is running **Ubuntu** and so we can use the built-in _package manager_ (apt) for this. Cloud 9 comes with several languages pre-installed (PHP, Python and Java). Lets search for any packages linked to these three languages.
```
dpkg --get-selections | grep php
dpkg --get-selections | grep python
pkg --get-selections | grep jre
```
We should now remove the software we don't need. This will both increase the space available on the disk and also increase the server performance. _Autoremove_ removes any packages no longer required and cleans up the server.
```
sudo apt-get remove php5 python3 openjdk-7-jre
sudo apt-get autoremove
```
Next we need to install the _Kerberos_ dev libraries. These will be needed for our server-side scripts to communicate with various databases.
```
sudo apt-get update
sudo apt-get install -y libkrb5-dev
```

## 1.7 Next Steps

Now you are ready to start learning. Open the **labs** directory and follow the instructions given.
