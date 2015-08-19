console.log('LOADED');

var file = 'data/quotes.json';

var xhr = new XMLHttpRequest;
xhr.open('GET', file, true);
xhr.onload = function(e) {
    if (xhr.status === 200) {
        //console.log(xhr.responseText);
        var poem = JSON.parse(xhr.responseText);
            console.log(poem);
        }
    }
}
xhr.onerror = function(e) {
    console.log(xhr.statusText);
}
xhr.send();

/*
function reqListener () {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "yourFile.txt", true);
oReq.send();
*/