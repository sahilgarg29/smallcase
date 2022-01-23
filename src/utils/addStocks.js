const fs = require("fs");
const path = require("path");
const axios = require("axios");

let data = fs.readFileSync(path.resolve(__dirname, "nifty50list.csv"));

data = data.toString().split("\r\n");

data = data.map(function (e) {
  return e.split(",");
});
