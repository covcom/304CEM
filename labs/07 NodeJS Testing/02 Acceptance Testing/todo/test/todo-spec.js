
var frisby = require('frisby')

/*  // globalSetup defines any settigs used for ALL requests */
frisby.globalSetup({
  request: {
    headers: {'Authorization': 'Basic dGVzdHVzZXI6cDQ1NXcwcmQ=','Content-Type': 'application/json'}
  }
})

frisby.create('get empty list')
  .get('http://localhost:8080/lists')
  .expectStatus(404)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON({status: 'error', message: 'no lists found'})
  .toss()

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

frisby.create('check number of lists')
  .get('http://localhost:8080/lists')
  .expectStatus(200)
  .afterJSON( json => {
    // retrive args using json.args.x
    expect(json.status).toMatch('success')
    expect(json.message).toContain('1')
    expect(json.data.length).toEqual(1)
    console.log(json.data[0].link)
    frisby.create('Second test, run after first is completed')
      .get(json.data[0].link)
      .expectStatus(200)
      .toss()
  })
  .toss()

  // jwvxg195ud3zjagbt3sox9ch1v5rk9o'

/*
.after(function(err, res, body) {
  console.log('AFTER')
  const json = JSON.parse(body)
  console.log(JSON.stringify(json, null, 2))
  expect(json.status).toMatch('success')
})
*/
