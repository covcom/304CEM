
Throwing errors
emit errors in callbacks

Two types of errors:

Operational Errors: run-time problems experienced by correctly written programs caused by other sources, such as
server connection
invalid user input
out of memory

Programmer Errors: bugs in the program, avoided by changing the code and can never be handled properly, such as:
reading undefined
passing a string where an object was expected

can be caused by an operational error that should have been handled.

should be handled through automated tests.

Handling Operational Errors

deal with the failure directly: eg. if log file not found create a new log file.
propagate the failure to the client: eg. if the input needs to be json, tell the client.
retry: eg if remote server does not respond, try again.
blow up: halt program execution and report the error: eg. out of memory.
log the error only: log it and carry on if its not serious.

Three ways to handle errors:

throw the error and make it an exception
pass the error to a callback, a function to handle errors and results of the async operation
emit an error event on an EventEmitter

Difference between an error and an exception

an error is any instance of the Error class, these can be constructed and passed to another function or thrown.

when an error is thrown it becomes an exception.

throw new Error('bang!')

callback(new Error('bang!')) // is more common because most errors are async.

only time to use try/catch is for input validation such as JSON.parse()

https://www.joyent.com/developers/node/design/errors

http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling
