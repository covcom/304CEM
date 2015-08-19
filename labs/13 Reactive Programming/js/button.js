var button = document.querySelector('#button');

// clickStream contains the button event data
var clickStream = Rx.Observable.fromEvent(button, 'click');

clickStream.subscribe( function(event) {
    console.log('CLICK!');
    console.log('Event Type: '+event.type);
    console.log('X:'+event.screenX+'  Y:'+event.screenY);
});