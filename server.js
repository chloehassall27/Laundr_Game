var fs = require('fs'),
    http = require('http');
const { serialize } = require('v8');
require('dotenv').config()

let port = process.env.PORT;
if (port == null || port == "")
port = 80;

console.log("Started server on port " + port);

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
}).listen(port);