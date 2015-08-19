//var accounts = ['user1@gmail.com', 'user2@gmail.com', 'user3@gmail.com'];

var button = document.querySelector('input[type="submit"]');

// clickStream contains the button event data
var clickStream = Rx.Observable.fromEvent(button, 'click');
var email = Rx.Observable.fromEvent(document.querySelector('input[name="email"]'), 'keyup');

email.subscribe( function(event) {
    if (event.srcElement.value.length > 3) {  // waits until at least 4 characters.
        console.log(event.srcElement.value); // returns content of input field.
        event.srcElement.style.border='1px solid red';
        event.srcElement.style.backgroundColor = '#ffe0e0'
        console.log(event);
    }
});

clickStream.subscribe( function(event) {
    console.log('CLICK!');
    console.log('Event Type: '+event.type);
    console.log('X:'+event.screenX+'  Y:'+event.screenY);
},
function() {
    // completed
},
function(err) {
    // an error occurred...
});