'use strict'

/* the readline-sync module allows NodeJS to read input from the terminal. */
const readline = require('readline-sync')

/* Here we declare an empty array which will be used to store the todo list items. */
var items = []

/* the do-while loop has its exit condition at the end which means it always executes at least once. */
do {
  /* We capture the text input by the user. This is then converted into a String and finally any _whitespace_ (newline characters, spaces, etc) are removed. */
	var input = String(readline.question('enter command: ')).trim() // try switching for a let... or a const...
  /* The indexOf() function looks for the first ocurrance of the supplied string parameter or -1 if it is not found. Notice the use of === to compare the two values, this is a 'strict' comparison and should always be used instead of ==. It checks for equal values and equal type. */
	if (input.indexOf('add ') === 0) {
    /* This time the indexOf() function is used to locate the first space character. */
		let space = input.indexOf(' ')
    /* the substring() function returns the string after the specified position. This will include the space character and so the result is trimmed of any whitespace. */
		let item = input.substring(space).trim()
    /* console.log() prints to the terminal. */
		console.log('adding "'+item+'"')
    /* All arrays have a built-in push() function which appends an item to their end. */
		items.push(item)
	}
	if (input.indexOf('list') === 0) {
    /* Here we use a for...next loop to interate through all the array indexes. The let keyword defines a variable with _block_ scope (more on this later). */
		for (let i=0; i< items.length; i++) {
      /* Here we reference the array index. */
			console.log(i+'. '+items[i])
		}
	}
  /* the code will loop unless the input was _exit_. Notice the use of !== in the comparison instead of the more typical !=. This is a strict negating comparison. This means 'not equal and not equal type' */
} while (input !== 'exit')
