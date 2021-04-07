
# URL Wrapper

## Overview

A little wrapper on the URL global object, to ease the interface when only interested in url path and query params.

Given full url of:

	- https://foo.com/shapes/rectangle?width=10&height=5

Wrapper will provide:

	- url path, e.g., /shapes/rectangle
	- query params e.g., width=10&height=5
		(as string, array of pairs, or plain object / map

## Usage

```
//-----------------------
//Abbreviated (pseudo)

UrlWrapper = require('url-wrapper').UrlWrapper;
urlWrapper = new UrlWrapper(req.headers.host, req.url);
path = urlWrapper.path();
query = urlWrapper.query();
width = query.width;
height = query.height;

//-----------------------
//Detailed

const
	http = require('http'),
	httpStatusCodes = require('http-status-codes'),	
	UrlWrapper = require('url-wrapper').UrlWrapper;
	port = 3000,
	startupFct = () => console.log(`Server started on port: ${port}`),
	br = '<br>';
	
const requestHandlerFct = (req, res) => {
	res.writeHead(httpStatusCodes.OK, {'Content-Type': 'text/html'});		
	const urlWrapper = new UrlWrapper(req.headers.host, req.url);
	res.write('received request ' + req.url + br);	
	res.write('Path: ' + urlWrapper.path() + br);
	res.write('Query params: ' + urlWrapper.queryAsString() + br);	
	res.write('Query param pairs: ' + JSON.stringify(urlWrapper.query()));
	res.end();
}	

const server = http.createServer(requestHandlerFct);
server.listen(port, startupFct);

```


