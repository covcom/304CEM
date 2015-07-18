var request = require('sync-request');
var fs = require('fs-extra');

var i;
var films = [];

function pad(num, size) {
    var s = "000000" + num;
    return s.substr(s.length - size);
};
// 1700000

for (i=2634; i <= 9999999; i++) {
    console.log(pad(i));
    var url = 'http://www.omdbapi.com/?i=tt'+pad(i)+'&y=&plot=short&r=json';
    //console.log(url);
    try {
        var res = request('GET', url);
        var json = JSON.parse(res.body);
        if (json.imdbID) {
            var film = {id: json.imdbID, title: json.Title, year: json.Year};
            console.log(film);
            films.push(film);
            console.log('found '+films.length+' films.');
            if (films.length % 5 == 0) {
                console.log('saving');
                fs.writeJsonSync('./films.json', {films: films});
            }
        }
    } catch(err) {
        console.log(err);
    }
}
