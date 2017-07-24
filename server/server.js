import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';

/**
 * Function to be used as a callback to the http server
 * it handles the incoming request and sends appropriate response
 */

function requestHandler(request, response) {
  // resolves the path to the requested resource and assigns it to a variable
  let requestedResource = path.join(__dirname, // current directory where server.js is present
      '../public', // take one step out of the current directory and go to public folder
      url.parse(request.url).pathname); // find the path to the requested resource

  // use the exists method of the fs functionality of find existance of the resource

  fs.exists(requestedResource, function(exists) {
    // if file does not exist return 404 error code(file not found)
    if (!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 File not found.\n");
      response.end();
      return;
    }

    // check if the requested resource is a directory.
    // in that case set it to index.html

    if (fs.statSync(requestedResource).isDirectory()) {
      requestedResource += '/index.html';
    }

    // Finally, we read the requested file (asynchoronously) and send it's Content
    // to the client.

    fs.readFile(requestedResource, "binary", function(err, file) {
      // incase of error send the appropriate error message to the client.
      if (err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end()
        return;
      }

      // helper function to map requested content type to response
      const contentTypesByExtention = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript'
      };

      // helper object to hold our headers
      const headers = {};

      // get the contetn type using the extentions
      const contentType = contentTypesByExtention[path.extname(requestedResource)];

      // if the requested resource map to any of our extention type,
      // then set the Content-Type field for our response header.
      if (contentType) {
        headers["Content-Type"] = contentType;
      }
      response.writeHead(200, headers); // write response header (if any)
      response.write(file, "binary");
      response.end();
    });
  });
}

// create an instance of http server and passing it our request handler.

const server = http.createServer(requestHandler);
// declare our port number
const portNumber = 3000;
// setup server to start listening at the port number for request.

server.listen(portNumber, function(){
  console.log(`server is listening at Port ${portNumber}`);
})
