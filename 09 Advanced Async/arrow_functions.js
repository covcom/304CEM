
'use strict'

function add(...num) {
    let total = 0
    for (let i=0; i< num.length; i++) {
        total += num[i]
    }
    return total
}

const add2 = function(...num) {
    return num.reduce( (acc, val) => acc + val)
}

const add3 = (...num) => {
    return num.reduce( (acc, val) => acc + val)
}

const add4 = (...num) => num.reduce( (acc, val) => acc + val)

console.log(add(1, 2, 3))

console.log(add2(1, 2, 3))

console.log(add3(1, 2, 3))

console.log(add4(1, 2, 3))