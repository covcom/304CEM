# Reactive Programming

Work through excellent interactive tutorial:

https://github.com/jhusain/learnrx

## 1 Observable

Open the file `button.html` and its associated JavaScript. Take a few moments to study the code then run it to and see if you can understand rthe program flow. The key to this is the **clickStream** object which is *observable*. This generates an event stream containing the button clicks. Any observable stream can be subscribed to using its *subscribe* property. In the example this is assigned an anonymous function which gets called each time the button is pressed.

The *Observable* object represents a push collection. The combination of *Observable* and *Observer* represents an example of the *Observer Design Pattern*. The *Observable* sends notifications and the *Observer* receives them.

### 1.1 Observable Sequences

Sequences can contain either a single element or a stream of multiple elements. Sequences are one of the key building blocks of reactive programming. You need to learn how to generate these.

### 1.1.1 Single Element 
```
var single = Rx.Observable.just('http://example.com');
```

### 1.1.2 From a Function

You can also create a custom stream by explicitly telling each *observer* about the different data events.
```
var customStream = Rx.Observable.create(function(observer) {
    // generates a custom stream. Ideal for use with AJAX calls
    // perhaps this should be the example?
    observer.onNext(42);
    observer.onCompleted();
});

var subscription = source.subscribe (
    function(data) {
        //onNext
        console.log(data);
    },
    function(err) {
        // onError
    },
    function() {
        // onComplete
        // console.log('completed!');
    }
);
```

### 1.1.3 From a Callback

We can convert a callback to an observable sequence.


### 1.1.3 From a Promise

You can also generate a sequence from a promise!

```
var promiseStream = Rx.Observable.fromPromise(promise);
```

https://gist.github.com/staltz/868e7e9bc2a7b8c1f754

## 2 xxx


## 3 xxx

