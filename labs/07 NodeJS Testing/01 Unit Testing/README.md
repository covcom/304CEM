
# Unit Testing

In this worksheet you will learn about how to automate the testing for your _NodeJS modules_. By designing a set of comprehensive tests we can be assured that the modules work correctly. By running them automatically we can quickly test our code which encourages us to test frequently.

## 1 Testing Synchronous Code

Open the `shopping/` directory and examine the files and directory structure.
```
.
├── index.js
├── modules
│   └── shopping.js
├── package.json
└── spec
    └── shopping-spec.js
```
Notice that there is a `modules/` directory that contains the _NodeJS module_ we want to test. There is also a `spec` directory that contains the _unit tests_ we want to run. All test files must be in the format `xxx-spec.js` to be recognised by the _test runner_.

Finally there is the _package_ file and a simple script, `index.js` for you to use to get comfortable with the module.

## Presentation

https://goo.gl/H744dE
