console.log('LOADED');

/**
 * adding a new author:
 * - reject if the author already exists (GET)
 * - add a new author (POST)
 */

/**
 * Checks to see if the author name has already been added
 * returns a promise which is resolved if the name does not exist
 */
function checkExists(name) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = 'https://marktyers.firebaseio.com/people.json';
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('READY');
                // FireBase contains a collection of objects, not an array!
                // needs to be converted into an array for searching
                var authors = [];
                for (var key in xhr.response) {
                    if (xhr.response.hasOwnProperty(key)) {
                        authors.push(key);
                    }
                }
                // if the index is -1 the value does *not* exist
                if (authors.indexOf(name.toLowerCase) === -1) {
                    resolve(name);
                }
                reject('author already exists');
            }
        }
        xhr.send();
    });
}

/**
 * Capitalises the first letter of each word
 */
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function addName(name) {
    return new Promise(function(resolve, reject) {
        name = toTitleCase(name);
        console.log(name);
    }); 
}

/* We are using the Promise which is either resolved or rejected */
checkExists('jobs')
    .then(function(name) {
        // this is called if the Promise resolves
        console.log('RESOLVED: '+name);
    })
    .catch(function(err) {
        // this is called if the promise is rejected
        console.log('ERROR: '+err);
    });

addName('morton-tyers');
