// insert after `getJson('data/story.json')`
.then(function(story) {
  var myPromise = new Promise(function(resolve, reject) {
    var breakPromise = confirm("Do you want to break a promise?");
    if (breakPromise) {
      reject({message: "User broke the promise"});
    } else {
      resolve(story);
    }
  });
  return myPromise;
})