
# Code Editors

The lab activities are based on the use of the **codeanywhere** IDE however ther are other options. This document introduces some alternatives together with hint and tips for their use.

## Operating Systems

It goes without saying that your preferred OS should be UNIX-based which generally means a choice between OSX and Linux (Ubuntu is the preferred choice).

### OSX

If you are using OSX you will need to install and configure a number of tools:

1. You should install the XCode IDE from the _App Store_. Not only is this a great IDE but it will also install and configure the Git command-line tools. Make sure you run XCode at least once to configure your system.
2. You can install **NodeJS** using the binary installer on the [NodeJS Website](http://nodejs.org/). This will of course need updating by following the instructions in the topic 1 worksheet.
3. Later you will need to install **MongoDB**. This is best [installed](https://docs.mongodb.org/v3.0/tutorial/install-mongodb-on-os-x/) using the [HomeBrew Package Manager](http://brew.sh). Once this has been installed you can update HomeBrew with `brew update` then install MongoDB with `brew install mongodb`.
4. You may also need to install **Neo4J**. The installer for the _Community Edition_ can be found on their [download page](http://neo4j.com/download/). Once downloaded you can open the `.dmg` file and drag the app into your _Applications_ directory where it can be run.

## Editors

There are a number of editors you could use to write your JavaScript apps. Currently the most promising ones are:

1. [Visual Studio Code](https://code.visualstudio.com)
2. [Atom](https://atom.io)
3. [Brackets](http://brackets.io) (download the version _without_ extract)

### Visual Studio Code

To add editor support for ECMA6 you need to create a file called `jsconfig.json` in the root of your project (the `305CDE/` directory) which should contain:

```
{
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs"
    }
}
```
The editor supports **TypeScript Definition Files** which allow you to add _intellisense_ support for additional languages and frameworks.

1. Make sure you have updated **NodeJS** to the latest version before you start
2. Globally install the [TSD](http://definitelytyped.org/tsd/) package using `npm install tsd -g`.
3. install support for NodeJS using `tsd query node --action install`.
4. install support for the Jasmine testing framework using `tsd query jasmine --action install`

Visual Studio Code also includes a powerful debugger available through the Debug tab.
