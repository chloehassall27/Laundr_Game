var fs = require('fs'),
    http = require('http');
const { serialize } = require('v8');
require('dotenv').config()

if (!process.env.PORT)
  process.env.PORT = 80;

console.log("Started server on port " + process.env.PORT);

http.createServer(function (req, res) {
  let url = req.url;
  if(req.url == "/"){
    url = "/index.html";
  }
  fs.readFile(__dirname + url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(process.env.PORT);