
var list = require('./modules/todo');

list.clear();
list.add('milk', 1);
list.add('butter', 2);
console.log(list.count());

var items = list.getAll();
console.log(items);

list.remove('butter');
console.log(list.count());
