// Read files

const fs = require("fs");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var pages = [];

for (let i = 1; i < 20; i++) {
  var page = {
    num_page: i,
    contenu: fs.readFileSync("./files/" + i + ".txt", "utf8"),
    titre: "Bel ami",
    auteur: "Guy de Maupassant"
  };
  pages.push(page);
  if (i % 5 == 0) {
    console.log("mod");
    sendDataToAllNodes(pages, "http://localhost");
    pages = [];
  }
}
function sendDataToAllNodes(pages, baseurl) {
  for (let j = 0; j < 3; j++) {
    sendData(pages, baseurl + ":500" + j);
  }
}
function sendData(pages, url) {
  var p = {
    pages: pages
  };
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url + "/transaction", false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("ok");
      //var json = JSON.parse(xhr.responseText);
      //console.log(json.email + ", " + json.password);
    }
  };
  console.log(p);
  xhr.send(JSON.stringify(p));
}
