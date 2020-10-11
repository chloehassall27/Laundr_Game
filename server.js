import * as http from 'http'
import { promises as fs } from 'fs';

let indexFile;

const requestListener = function (req, res) {
    if(req.url == '/'){
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(indexFile);
    }
    else if(req.url.indexOf('.png') > 0){
        res.setHeader("Content-Type", "image/png");
        console.log("." + req.url)
        fs.readFile("." + req.url, "utf8")
            .then(contents => {
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                console.log("error")
                res.writeHead(404);
                res.end();
            });
    }
    else{
        res.setHeader("Content-Type", "text/javascript");
        console.log("." + req.url)
        fs.readFile("." + req.url, "utf8")
            .then(contents => {
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(404);
                res.end();
            });
    }
};

const server = http.createServer(requestListener);

fs.readFile("./index.html", "utf8")
    .then(contents => {
        indexFile = contents;
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });

server.listen(80);