// import * as http from 'http'
// import { promises as fs } from 'fs';

// let indexFile;

// const requestListener = function (req, res) {
//     if(req.url == '/'){
//         res.setHeader("Content-Type", "text/html");
//         res.writeHead(200);
//         res.end(indexFile);
//     }
//     else if(req.url.indexOf('.png') > 0){
//         res.setHeader("Content-Type", "image/png");
//         console.log("." + req.url)
//         fs.readFile("." + req.url, "utf8")
//             .then(contents => {
//                 res.writeHead(200);
//                 res.end(contents);
//             })
//             .catch(err => {
//                 console.log("error")
//                 res.writeHead(404);
//                 res.end();
//             });
//     }
//     else{
//         res.setHeader("Content-Type", "text/javascript");
//         console.log("." + req.url)
//         fs.readFile("." + req.url, "utf8")
//             .then(contents => {
//                 res.writeHead(200);
//                 res.end(contents);
//             })
//             .catch(err => {
//                 res.writeHead(404);
//                 res.end();
//             });
//     }
// };

// const server = http.createServer(requestListener);

// fs.readFile("./index.html", "utf8")
//     .then(contents => {
//         indexFile = contents;
//     })
//     .catch(err => {
//         console.error(`Could not read index.html file: ${err}`);
//         process.exit(1);
//     });

// server.listen(80);

import * as http from 'http'
import * as express from 'express'
import * as nStatic from 'node-static'

var app = express.express();
var fileServer = new nStatic.Server('./');

app.use(express.static(''));

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + '/images'));
app.use('/sprites', express.static(__dirname + '/sprites'));
app.use('/', express.static(__dirname + '/'));

http.createServer(function (req, res) {
    
    fileServer.serve(req, res);

}).listen(5000);

var server = app.listen(5000);