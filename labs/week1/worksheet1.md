# 305CDE Worksheet 1

## About

This week is mainly about getting started with JavaScript development. It will also cover some of the absolute basics of the language.

## Task List

Aim for around 5 minutes per task.

1. Register for a user account on [GitLab][]
2. Use Atlassian SourceTree to clone the 305CDE repository to your local machine / network drive
3. Create a new repository for your solution to the first weekly challenge
4. Test it works: modify, add, commit, push
5. Get the first JS example running in your browser and try to understand the code
6. Use the Chrome browser developer tools to fix bugs introduced in the second JS example
7. Use the Brackets JSLint feedback to improve the code in the third JS example 

## Steps Required

### Register for a user account on Gitlab

You will be using git version control for all of your code on this module. Register for a free account at [GitLab][]. This is an open source alternative to the more popular [GitHub][] which allows unlimited private repositories. Both of these are web front-ends for git repository management systems.

![GitLab's dashboard for new users](static/welcome-to-gitlab.png)

If you have never used git version control before, then read the quickstart [simple guide to git][]. You can then [become a git guru][] in your own time between labs.

### Use SourceTree to clone the 305CDE repository

Once you confirm your GitLab registration, you will be able to clone the 305CDE repository containing the materials for this module.

There are many git clients to choose from, and we will be using the Atlassian [SourceTree][] application in labs (Windows or OSX). If you are using Linux on your own computer, there are several ways to install a [command line client][git for linux] or a [gui client][git with gui].

![SourceTree client running on Windows](static/sourcetree.png)

#### Cloning the repository

If/when you are asked for a username/password, use your GitLab credentials.

- In SourceTree click on 'Clone/New'.
- In the URL field enter `https://gitlab.com/c0lin/305cde.git`.
- Change the destination path to a folder you will have access to later (such as a network drive).
	* The folder must be empty.
- Leave the bookmark box ticked.
- Click 'Clone'.

You now have local copies of all the materials for 305CDE labs available so far, including this worksheet. You will be able to pull any additions or changes made in future to update the files you just created.

### Create a new repository for *Challenge 1*

There are two ways to start new repositories, depending on whether you already have local files to commit or not. If you are starting from scratch, then you can just create a new project in GitLab and clone it to a local folder, as in the last task. If you already have files to commit you can initialise your repository locally and push it to an empty remote project.

Either way, you need to create a new project on GitLab.

- On the GitLab dashboard screen, click "New project" or "Add project"
- Give your project a reasonable name such as "305CDE Challenge 1"
- Once created you will be presented with the project dashboard containing the repository URL

![New GitLab repository URL](static/new-git-repo.png)

Next you will need to clone the repo locally, if you are starting the project from scratch, or initialise a repo locally and push it to the one on GitLab you just created. We will step through the latter scenario, since it is more common to have some files you want to commit already.

- Create a new folder `challenge1` somewhere and add a test `test.md` file to it with some text
- In SourceTree click on 'Clone/New'
- Change to the 'Create new repository' tab
- Browse to the `challenge1` folder (the new root of your repository/project)
- Click 'Create' to set up the repo locally

Next you wish to push the local files up to your remote (empty) project on GitLab, but SourceTree does not know about this remote project yet. Add the remote repo to the local one you just set up:

- In SourceTree click on 'Settings' at the top right
- In the 'Remotes' tab click 'Add'
- Tick the 'Default remote' box
- Paste the URL to your empty GitLab repository (don't forget the `.git` at the end)
- Click 'OK' to add the new origin to your list of remotes 

![Origin added to list of remotes](static/remote-origin.png)

- Click on 'Add/Remove' to stage all of the files in your local repo
- Add a commit message at the bottom of the screen and click 'Commit'
	* If you get an error you may need to specify an email address, since commits require valid emails to be associated with users
	* Go to 'Settings > Advanced', untick 'Use global user settings' and add your name and an email address
	* Committing should now work
- Next click 'Push' to send the commit to your GitLab project
- You want to push to repository 'origin' at the URL of your project
- Tick the 'master' branch tickbox then click 'OK'

Your local repository should now be pushed up to the web. Refresh the GitLab project page to check that it worked.

### Test versioning for *Challenge 1*

Play around with changing the content of your test file, adding new files and folders to the root of your repository, staging, committing, and pushing the changes.

In particular ensure you become happy with the following principles of version control for future weeks, in rough order of importance:

1. Add, Remove, and Add/Remove
2. Commit
3. Push
4. Checkout
5. Pull
6. Stash
7. Discard

It is hard to completely mess up and lose work in a git repository as it remembers everything you ever commit including deleted files. This works in your favour if you follow the mantra "commit early, and commit often".



[GitLab]: https://gitlab.com
[GitHub]: https://github.com
[Simple guide to git]: http://rogerdudler.github.io/git-guide/
[Become a git guru]: https://www.atlassian.com/git/tutorials/
[SourceTree]: http://www.sourcetreeapp.com/
[Git for Linux]: http://git-scm.com/download/linux
[Git with GUI]: http://git-scm.com/downloads/guis