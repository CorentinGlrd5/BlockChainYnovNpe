// Read files

const fs = require("fs");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var pages = [];
initConnexions();

for (let i = 1; i < 30; i++) {
  var page = {
    num_page: i,
    contenu: fs.readFileSync("./files/" + i + ".txt", "utf8"),
    titre: "Bel ami",
    auteur: "Guy de Maupassant"
  };
  pages.push(page);
  if (i % 5 == 0) {
    console.log("mod");
    sendData(pages);
    pages = [];
  }
}

function initConnexions() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5000/node", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("ok");
    }
  };
  xhr.send(
    JSON.stringify({
      host: "localhost",
      port: 5001
    })
  );

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5000/node", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("ok");
    }
  };
  xhr.send(
    JSON.stringify({
      host: "localhost",
      port: 5002
    })
  );

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5000/node", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("ok");
    }
  };
  xhr.send(
    JSON.stringify({
      host: "localhost",
      port: 5003
    })
  );

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5000/node", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("ok");
    }
  };
  xhr.send(
    JSON.stringify({
      host: "localhost",
      port: 5004
    })
  );
}

function sendData(pages) {
  var p = {
    pages: pages
  };
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5000/transaction", false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("ok");
    }
  };
  xhr.send(JSON.stringify(p));

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5001/transaction", false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("ok");
    }
  };
  xhr.send(JSON.stringify(p));

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5002/transaction", false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("ok");
    }
  };
  xhr.send(JSON.stringify(p));

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5003/transaction", false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("ok");
    }
  };
  xhr.send(JSON.stringify(p));

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5004/transaction", false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("ok");
    }
  };
  xhr.send(JSON.stringify(p));
}
