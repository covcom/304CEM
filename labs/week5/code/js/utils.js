var fakeSlowNetwork;

// you can ignore this immediately-executing function
// it is used to simulate a slow network to show you how AJAX and Promises work
(function() {
  var lsKey = 'fake-slow-network';
  var networkFakeDiv = document.querySelector('.network-fake');
  var checkbox = networkFakeDiv.querySelector('input');

  fakeSlowNetwork = Number(localStorage.getItem(lsKey)) || 0;

  networkFakeDiv.style.display = 'block';
  checkbox.checked = !!fakeSlowNetwork;

  checkbox.addEventListener('change', function() {
    localStorage.setItem(lsKey, Number(checkbox.checked));
    location.reload();
  });
}());

// Use a promise that resolves after a given waiting time
// again, used to help simulate a slow network.
function wait(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

function get(url) {
  // Return a new promise.
  // We do all the work within the constructor callback.
  var fakeNetworkWait = wait(3000 * Math.random() * fakeSlowNetwork);

  // HERE IS THE MAIN CODE...
  var requestPromise = new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    // See Week 4 material
    var req = new XMLHttpRequest();
    req.open('get', url);

    req.onload = function() {
      // 'load' triggers for 404s etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });

  // the all() method just requires every promise to complete
  // before it will resolve
  return Promise.all([fakeNetworkWait, requestPromise]).then(function(results) {
    return results[1];
  });
}

// the then() method gives a slick way to transform data
function getJson(url) {
  return get(url).then(JSON.parse);
}

// ********
// DOM code here
// ********
var storyDiv = document.querySelector('.story');

function addHtmlToPage(content) {
  var div = document.createElement('div');
  div.innerHTML = content;
  storyDiv.appendChild(div);
}

function addTextToPage(content) {
  var p = document.createElement('p');
  p.textContent = content;
  storyDiv.appendChild(p);
}