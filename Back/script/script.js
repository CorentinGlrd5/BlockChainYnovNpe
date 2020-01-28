// Read files

const fs = require("fs");
const readline = require("readline");

function allPages() {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
  }
}

fs.readFile("./files/page1.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
  var body = [
    {
      pages: []
    }
  ];
  for (let i = 0; i < 5; i++) {
    allBody = data + i;
  }
  console.log(data);
  console.log(allBody);
});
