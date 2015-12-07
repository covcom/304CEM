"use strict"

const readline = require('readline-sync')

var items = []

do {
	var input = String(readline.question('enter command: ')).trim() // try switching for a let...
	if (input.indexOf('add ') === 0) {
    let space = input.indexOf(' ')
    let item = input.substring(space).trim()
    console.log('adding "'+item+'"')
    items.push(item)
  }
  if (input.indexOf('list') === 0) {
    items.forEach(function(item, index) {
      console.log(index+'. '+item)
    })
  }
} while (input !== 'exit')
