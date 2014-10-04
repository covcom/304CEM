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

function getSync(url) {
  var startTime = Date.now();
  var waitTime = 3000 * Math.random() * fakeSlowNetwork;

  var req = new XMLHttpRequest();
  req.open('get', url, false);
  req.send();

  while (waitTime > Date.now() - startTime);

  if (req.status == 200) {
    return req.response;
  }
  else {
    throw Error(req.statusText || "Request failed");
  }
}

function getJsonSync(url) {
  return JSON.parse(getSync(url));
}

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