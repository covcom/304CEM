console.log('page loaded');

Rx.Observable.GetJSON = function(url, data) {
	var subject = new Rx.AsyncSubject();
	var success = function(data, textStatus, request) {
		subject.OnNext({request: request,
			textStatus: textStatus,
			data: data 
		});
		subject.OnCompleted();
	};
	var error = function(request, textStatus, errorThrown) {
		subject.OnError({request: request,
			textStatus: textStatus,
			errorThrown: errorThrown
		});
	};
	$.ajax({url: url,
		dataType: 'json',
		data: data,
		success: success,
		error : error
	});
	return subject.AsObservable();
};

$(document).ready(function() {
	var url = "http://search.twitter.com/search.json";
	var term = "#RxJS";
	Rx.Observable.GetJSON(url, { rpp : 100, q : term })
		.SelectMany(function(d) { return Rx.Observable.FromArray(d.data.results); })
		.Subscribe(function(results) {
			$("#twitterList").append("<li>" + results.from_user + " : " + results.text + "</li>");
		});
});

/*
var input = document.querySelector('input');

var keyups = Rx.Observable.fromEvent(input, 'keyup')
	.map(function(e) {
		return e.target.value;
	})
	.filter(function(text) {
		return text.length > 2;
	})
	.forEach(function(e) {
		console.log(e);
	});

function search(term) {
	return term;
}
*/
/*
Rx.DOM.Request.ajax('https://maps.googleapis.com/maps/api/geocode/json?address=grasmere+avenue')
  .subscribe(
    function (xhr) {

      var products = JSON.parse(xhr.responseText);

      products.forEach(function (product) {
        console.log(product);
      });
    },
    function (error) {
      // Log the error
    }
);
*/