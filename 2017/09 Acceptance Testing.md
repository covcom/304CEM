
# Acceptance Testing

In addition to carrying out _unit tests_ you can run tests on the API _interface_. This allows you to write tests that define how your API should handle various calls and test it using both good and bad data. Typically you should write these tests when you define your API _interface_ and before you carry out any coding.

## 1 Frisby Framework

Acceptance testing will be carried out using the [frisby](https://www.npmjs.com/package/frisby) package which is built on the [jasmine-node](https://www.npmjs.com/package/jasmine-node) framework you have already used.

2. open the `shopping/test/todo-spec.js` script and read it, paying particular attention to the detailed comments.
3. start the API and check it is visible using Postman.
4. change the base urls to match your cloud9 API.
5. run the acceptance tests by entering `./node_modules/.bin/jasmine-node test/ --verbose`, this will output the test results to the terminal. Take a few moments to understand this output.
6. run the acceptance tests again. Why do they fail this time, use the error trace to find out what failed and why.

### 1.1 Test Your Knowledge

1. create a new test `DELETE /lists` and add it at the start of the test. Eventually this should clear all the lists in the API and return success, lists deleted.
2. run your tests, they should fail (we have not written the new API feature!
3. add the  `--autotest --watch .` flags when you run the test script (see the previous worksheet), this will automatically run your acceptance tests every time you save a file.
3. implement `DELETE /lists`. The tests will pass to indicate success.

## 2 Behaviour-Driven Development

Domain-Specific Language

User Stories -> feature files

add scenarios

step definitions

Gherkin (feature files), Cucumber, 

# from 302CEM


# Acceptance Testing

Each week you will be expected to complete a series of lab activities. You will be required to reflect on these in your assignment so make sure you keep records of what you have done. The supporting presentation can be found at https://goo.gl/Tx8nWx

## Acruing Knowledge

As you begin each sprint you should aim to apply more of the knowledge and skills covered in the lectures. For this sprint you will need to include:

1. The sprint planning and review meetings
2. The daily standups
3. Pair programming
4. Version control including a good branching strategy

You will also be implementing acceptance testing at one of three levels:

1. You should work with a DSL to define your tests
2. You should use an appropriate framework to define these as automated tests
3. Finally, you should attempt to write step-definitions to automatically convert the tests written in a DSL to automated tests.

## Business Domain Modelling

Start by modelling the problem domain. This can be done either on paper or using a whiteboard. Make sure you include:

1. The **Entities**
2. The **Relationships**
3. The **Responsibilities**

Now take each of your completed user stories and map them against this problem domain.

## Behaviour-Driven Development

Before starting your next sprint, revisit each of the completed _user stories_ and define each of them using a _business-readable DSL_ such as Gherkin.

1. Create a `features/` directory.
2. Create a file with a `.feature` extension for each user story.
3. At the top of each of the files create a **feature** and add the user story.
4. Now define a number of **scenarios** to clearly and unambiguously define all the tests you need to carry out.
5. Under each scenario, list the steps required.
6. Install and run a tool such as `gherkindoc` to generate your **documentation site** so it can be viewed through github.coventry.ac.uk

## Sprint Review

By this stage you have completed  first sprint and so you will need to hold a sprint review meeting. _Make sure you have invited your client_.

1. The team:
  1. displays the **documentation site** generated from the `.feature` files and recap the tasks that were agreed on during the previous meeting.
  2. demonstrate the product, showing that the agreed user story(s) have been completed and that the product is useful to the client.
2. The client gives feedback and may be in a position to sign off the work carried out so far.
3. The client and developers use the Kanban board to identify any issues in the sprint backlog that were not completed:
  1. Issues are added to the issue tracker in GitHub.
  2. These issues are added to the sprint backlog column on the Kanban board.
4. The client and developers update the _User Story Map_:
  1. Change the story priority based on the client's current requirements.
  2. Decide what will be included in the next sprint.
5. A new `.feature` file is created for each user story in the new sprint and the team work with the customer to write the scenarios and steps.
6. The Kanban board is updated with the user stories from the new sprint.

## The Sprint

During this sprint, try to implement each of the _scenarios_ as an automated acceptance test. By the end of the sprint you should have one test per scenario and all the tests should have passed.

### Step Definitions

As a bare minimum you will need to write the tests but you should have a go at writing a step-definition file which will read the `.feature` files and automatically generate and run the acceptance tests.

## Supporting Materials

There are a number of supporting labs that will help you implement your acceptance tests.

1. If you are creating a **website**, use the materials in the **casperjs** directory.
2. If you are creating an **API**, use the materials in the **frisbyjs** directory.