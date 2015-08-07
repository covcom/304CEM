var request = require('sync-request');
var fs = require('fs-extra');

var i;
var films = [];

function pad_old(num, size) {
    var s = "000000" + num;
    return s.substr(s.length - size);
};

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

// 1700000
// ran 0000000 to 0000000

// example: tt0048918

for (i=0; i <= 9999999; i++) {
    console.log('tt'+pad(i,7));
    var url = 'http://www.omdbapi.com/?i=tt'+pad(i,7)+'&y=&plot=short&r=json';
    //console.log(url);
    try {
        var res = request('GET', url);
        var json = JSON.parse(res.body);
        if (json.imdbID) {
            var data = json.imdbID+','+json.Year;
            /*var film = {id: json.imdbID, title: json.Title, year: json.Year};
            console.log(film);
            films.push(film);
            console.log('found '+films.length+' films.');
            if (films.length % 5 == 0) {
                console.log('saving');
                fs.writeJsonSync('./films.json', {films: films});
            }*/
        }
    } catch(err) {
        console.log(err);
    }
}
