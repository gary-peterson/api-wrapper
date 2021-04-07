
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
urlw = UrlWrapper.fromRequest(req),
path = urlw.path();
query = urlw.query();
width = query.width;
height = query['height'];

//-----------------------
//Detailed

//rec-form-server

const
	http = require('http'),
	httpStatusCodes = require('http-status-codes'),	
	UrlWrapper = require('url-wrapper').UrlWrapper,
	port = 3000,
	startupFct = () => console.log(`Server started on port: ${port}`),
	br = '<br>';
	
const requestHandlerFct = (req, res) => {
	res.writeHead(httpStatusCodes.OK, {'Content-Type': 'text/html'});		
	const 
		urlw = UrlWrapper.fromRequest(req),
		path = urlw.path(),
		query = urlw.query();
	res.write('received request ' + req.url + br);	
	res.write('URL Path: ' + path + br);
	res.write('URL Query Param Pairs: ' + JSON.stringify(query) + br);
	res.write('Width: ' + query.width + br);
	res.write('Height: ' + query['height'] + br);
	res.end();
}	

const server = http.createServer(requestHandlerFct);
server.listen(port, startupFct);	

```


