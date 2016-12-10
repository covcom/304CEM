'use strict'

exports.async = function example_of_something_async(param, callback) {
  let err
  let data
  if (param === 1) {
    err = 'param was 1'
  } else {
    data = 'the result'
  }
  return setTimeout(() => callback(err, data), 2000)
}

