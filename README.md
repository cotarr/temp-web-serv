# temp-web-serv

Temporary web server offering one static test page, intended for ad-hoc testing and debugging.

# Description

- Intended for temporary testing (Load it, use it, delete it)
- Zero NPM dependencies
- Application has only one JavaScript file (app.js)
- A static test webpage is available at routes "/" or "/index.html"
- Server port configurable using `SERVER_PORT=8080` environment variable
- HTTP access requests logged to terminal
- Written using Node 18 on Debian Linux, other Node versions not tested

## Motivation

While performing troubleshooting on the home network, an ad-hoc TCP server was needed
to debug network router and firewall.

## Install and start

```bash
# Clone git repository
git clone https://github.com/cotarr/temp-web-serv.git

# Start server default port 8080
node app.js

# Start on alternate port
SERVER_PORT=3000 node app.js

# Stop with ctrl-C
```

## Example Use

```
$ node app.js 
Server listening on port: 8080
2024-04-28T09:54:17.712Z ::ffff:127.0.0.1 200 GET / 117
2024-04-28T09:54:17.764Z ::ffff:127.0.0.1 404 GET /favicon.ico 10
^C
$
```

## Disclaimer

This application is not intended to be a full function web server. The intended use is limited to performance of network testing and debugging requiring a HTTP web server that can be accessed using curl or web browser.
