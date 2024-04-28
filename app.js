'use-strict';
const http = require('http');
//
// To start with alternate port from CLI:
//
//    SERVER_PORT=4000 node app.js
//
const port = parseInt(process.env.SERVER_PORT || '8080');

//
// Page HTML for routes:  '/' and '/index.html'
//
const pageHtml =
`<html>
<head>
<title>Test Page</title>
<body>
<h1>Test Page</h1>
<div>This is a test web page.</div>
</body>
</html>
`;

//
// HTTP access log
//
const logger = (req, statusCode, contentLength) => {
  const now = new Date();
  const logEntry =
    now.toISOString() + ' ' +
    req.socket.remoteAddress + ' ' +
    statusCode.toString() + ' ' +
    req.method + ' ' +
    req.url + ' ' +
    contentLength.toString();
  console.log(logEntry);
};

//
// HTTP server
//
const server = http.createServer((req, res) => {
  try {
    //
    // HTTP request handler
    //
    if ((req.method === 'GET') &&
      ((req.url === '/') || (req.url === '/index.html'))) {
      //
      // Main page at '/' or '/index.html'
      //
      const content = pageHtml;
      const statusCode = 200;
      res.writeHead(statusCode,
        { 
          'Content-Length': content.length.toString(),
          'Content-Type': 'text/html'
        }
      )
      res.write(content)
      logger(req, statusCode, content.length);
      res.end();
    } else {
      //
      // Error page for 404 Not Found
      //
      const statusCode = 404;
      const content = http.STATUS_CODES[statusCode] + '\n';
      res.writeHead(statusCode,
        { 
          'Content-Length': content.length.toString(),
          'Content-Type': 'text/plain'
        }
      )
      res.write(content)
      logger(req, statusCode, content.length);
      res.end();
    }
  } catch (error) {
    //
    // Catch JavaScript errors, console.log stack, return stack
    //
    const statusCode = 500;
    const content = http.STATUS_CODES[statusCode] + '\n' +
      error.toString() + '\n' + error.stack;
    res.writeHead(statusCode,
      { 
        'Content-Length': content.length.toString(),
        'Content-Type': 'text/plain'
      }
    )
    res.write(content)
    logger(req, statusCode, content.length);
    console.log(content);
    res.end();  
  }
});

// Timeout to receive entire client request
server.requestTimeout = 5000;

// Socket idle timeout
server.timeout = 5000;

//
// Start server
//
server.listen(port);

server.on('listening', () => {
  const address = server.address();
  console.log('Server listening on port: ' + address.port);
});

server.on('error', function (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  if (error.code === 'EACCES') {
    console.log('Port requires elevated privileges');
    process.exit(1);
  }
  if (error.code === 'EADDRINUSE') {
    console.log('Address or port in use');
    process.exit(1);
  }
  throw error;
});
