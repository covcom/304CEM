
var frisby = require('frisby')

/*  // globalSetup defines any settigs used for ALL requests */
frisby.globalSetup({
  request: {
    headers: {'Authorization': 'Basic dGVzdHVzZXI6cDQ1NXcwcmQ=','Content-Type': 'application/json'}
  }
})

/* here is a simple automated API call making a GET request. We check the response code, one of the response headers and the content of the response body. After completing the test we call 'toss()' which moves the script to the next test. */
frisby.create('get empty list')
  .get('http://localhost:8080/lists')
  .expectStatus(404)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON({status: 'error', message: 'no lists found'})
  .toss()

/* in this second POST example we don't know precisely what values will be returned but we can check for the correct data types. Notice that the request body is passed as the second parameter and we need to pass a third parameter to indicate we are passing the data in json format. */
frisby.create('add a new list')
  .post('http://localhost:8080/lists', {"name": "shopping", "list": ["Cheese", "Bread", "Butter"]}, {json: true})
  .expectStatus(201)
  .expectJSONTypes({
    "status": String,
    "message": String,
    "data": {
      "id": String,
      "name": String,
      "list": Array
    }
  }).toss()

/* Since Frisby is built on the Jasmine library we can use any of the standard matchers by enclosing them in an anonymous function passed to the 'afterJSON()' method. */
frisby.create('check number of lists')
  .get('http://localhost:8080/lists')
  .expectStatus(200)
  .afterJSON( json => {
    // you can retrieve args using json.args.x
    /* these are standard Jasmine matchers as covered in the first worksheet. */
    expect(json.status).toMatch('success')
    expect(json.message).toContain('1')
    expect(json.data.length).toEqual(1)
    /* We can even use the data returned to make additional API calls. Remember the JS scoping rules? */
    frisby.create('Second test, run after first is completed')
      .get(json.data[0].link)
      .expectStatus(200)
      .toss()
  })
  .toss()
