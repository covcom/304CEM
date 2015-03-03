/*
 * Simple example
 * we create an observable object to handle keypresses.
 * Operators http://reactivex.io/documentation/operators.html
 * .skip	suppress the first n items emitted by an Observable
 * .take	emit only the first n items emitted by an Observable
 * .map		apply a function to each element.
 */

/*
function CreateObservable(element, eventType) {
	return Rx.Observable.create(function(observer) {
		function eventHandler (eventObj) {
			observer.onNext(eventObj);
		}
		element.addEventListener(eventType, eventHandler);
		return function() {
			element.removeEventListener(eventType, eventHandler);
		};
	});
}
*/

var btn = document.getElementById('button');

var observable = Rx.Observable.fromEvent(btn, 'click')
	.skip(2)
	.take(2)
	.map(function(evt) {
		return 'button was clicked';
	});

//var observable = CreateObservable(btn, 'click')
//	.skip(2)
//	.take(2)
//	.map(function(evt){
//		return "button was clicked";
//	});

var observer = Rx.Observer.create(
	function(evt) {
		console.log(evt);
	},
	function(err) {
		console.log('error');
	},
	function() {
		console.log('done');
	}
);

observable.subscribe(observer);
