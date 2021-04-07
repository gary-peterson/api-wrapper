//rec-form-server

const
	http = require('http'),
	httpStatusCodes = require('http-status-codes'),	
	UrlWrapper = require('./index').UrlWrapper;
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

