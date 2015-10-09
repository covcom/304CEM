var myObject = ( function () {
    
    var value = 4;
    var myPrivateValue = 9999;
    
    return {
        getValue: function () {
            var x = 10
            return value + x;
        },
        increment: function () {
            value++;
        }
    }

}
)();


var output = myObject.getValue();
console.log(output);

myObject.increment();
output = myObject.getValue();
console.log(output);
