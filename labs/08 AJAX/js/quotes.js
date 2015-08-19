console.log('LOADED');

var url = 'https://marktyers.firebaseio.com/'; // change this to match your FireBase API...
var xhr = new XMLHttpRequest;
// https://marktyers.firebaseio.com/people.json
xhr.open('GET', url+'people.json', true);


xhr.onload = function(e) {
    if (xhr.status === 200) {
        var people = JSON.parse(xhr.responseText);
        console.log(people);
        console.log(people['turing']);
        var list = document.querySelector('navigation ul');
        for(var person in people) {
            //console.log(person);
            //console.log(people[person].name);
            var li = document.createElement("li");
            var txt = document.createTextNode(people[person].name);
            var a = document.createElement('a');
            a.setAttribute('href', '#'+person);
            a.onclick = function(a) {
                console.log('onclick');
                var key = a.srcElement.hash.substring(1); // removes the # character
                console.log(url+'people/'+key+'.json');
                var xhr2 = new XMLHttpRequest;
                xhr2.open('GET', url+key+'.json', true);
                xhr2.onload = function(e) {
                    if (xhr2.readyState === 4 && xhr2.status === 200) {
                        console.log(xhr2);
                        console.log('RESPONSE: '+xhr2.responseText);
                    } else {
                        console.log('no data');
                    }
                }
                xhr2.onerror = function(e) {
                    console.log(xhr2.statusText);
                }
                xhr2.send();
            };
            a.appendChild(txt);
            li.appendChild(a);
            list.appendChild(li);
        }
    }
}

xhr.onerror = function(e) {
    console.log(xhr.statusText);
}

xhr.send();
