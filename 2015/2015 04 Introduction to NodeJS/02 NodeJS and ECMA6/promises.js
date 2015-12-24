
/* Exploring ECMA6 promise chains and arrow functions */
"use strict"

const stdin = process.openStdin()

/* in this function the anonymous function inside the promise has been declared using the 'traditional' syntax. */
function reverse(string) {
    return new Promise(function(resolve, reject) {
        /* notice the use of the 'const' keyword instead of the usual 'var'. This indicates a constant or 'immutable variable'. */
        const reversed = string.split('').reverse().join('')
        //reject('could not reverse the string')
        resolve(reversed)
    })
}

/* In this function the anonymous function is declared using the new ECMA6 'arrow' syntax. */
function capitalise(string) {
    return new Promise((resolve, reject) => {
        /* the 'let' keyword means the scope of the following variable is limited to the current code block rather than being scoped by the function. Use of this required strict mode to be implemented. */
        let cap = string.charAt(0).toUpperCase() + string.slice(1)
        //reject('could not capitalise the string')
        resolve(cap)
    })
}

/* this promise chain uses the 'traditional' syntax to declare anonymous functions. Notice that the is quite verbose. */
function promise1(data) {
  reverse(data).then(function(data) {
    /* capitalise() returns a new promise. */
    return capitalise(data)
  }).then(function(data) {
    console.log(data)
  }).catch(function(err) {
    console.log('an error occurred: '+err)
  })
}

/* In this promise chain the anonymous functions have been defined using the new 'arrow' syntax. Notice that the syntax is far cleaner and more concise. */
function promise2(data) {
  reverse(data).then(data => {
    return capitalise(data)
  }).then(data => {
    console.log(data)
  }).catch((err) => {
    console.log('an error occurred: '+err)
  })
}

/* In this third version we take advantage of the fact that when resolving a promise the return value is implicit so we don't need to include it. */
function promise3(data) {
  reverse(data)
    .then( data => capitalise(data)  )
    .then( data => console.log(data) )
    .catch( (e) => console.log('an error occurred: '+e) )
}

/* In this fourth version we eliminate the parameter to the second function. This only works if the second function takes a single parameter and its value is the returned object from the previous function. */
function promise4(data) {
  reverse(data)
    .then(capitalise)
    .then( data => console.log(data) )
    .catch(  (e) => console.log('an error occurred: '+e) )
}

stdin.on('data', function(chunk) {
  const text = chunk.toString().trim()
  /* here we call all three functions to run the same promise chain  */
  promise1(text)
  promise2(text)
  promise3(text)
  promise4(text)
})
