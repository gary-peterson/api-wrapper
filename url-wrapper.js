//url-wrapper.js

/*
	We wrap Node's URL type for the purpose of providing
	a simple interface for core usage:
		
		https://nodejs.org/api/url.html
	
	Example usage of UrlWrapper (after starting server below):
	
		http://localhost:3000/shapes/rectangle?width=10&height=5	
		
		http://localhost:3000/names/create?fullName=Derartu%20Tulu&born=1972
		
		http://localhost:3000/shapes			
		http://localhost:3000/shapes/					
		
		http://localhost:3000	
		http://localhost:3000/
		
	Software Pattern Reference:
	
		https://en.wikipedia.org/wiki/Wrapper_library
		
		We are providing a simple interface to node's URL class.		
	
*/

//==================================================================

class UrlWrapper {
	
	//host -- like "abc.com"
	//urlPathAndQuery -- like "/shapes/rectangle?width=10&height=5
	//UrlWrapper = require('./tools/my-url').UrlWrapper;	
	//urlWrapper = new UrlWrapper(req.headers.host, req.url);
		
	constructor(arg1, arg2) {
		//args may be (host, path) or (request)
		const args = arguments.length; 
		if (args < 1 || args > 2)
			throw `1-2 args expected, received ${args}`;
		if (args === 1)
			this.initFromRequest(arg1);
		else if (args === 2)
			this.initFromHostPath(arg1, arg2);
	}
	
	static fromRequest(req) {
		return new this(req);
	}
		
	initFromRequest(req) {
		this.initFromHostPath(req.headers.host, req.url);
	}
	
	initFromHostPath(aHost, aUrlPathQuery) {
		this.host = aHost;
		this.urlPathAndQuery = aUrlPathQuery;
	}	
	
	//-----------------------------------------	
	
	path() {
		return this.whatwgUrl().pathname;
		//return this.urlPathAndQuery.split('?')[0];
	}
	
	//-----------------------------------------		
	
	queryAsString() {
		//e.g., "?width=10&height=5"
		//The raw string from the actual url string
		return this.whatwgUrl().search;
	}
	
	queryAsArray() {
		//Return pairs (key-values)
		return Array.from(this.whatwgUrl().searchParams);
	}		
	
	queryAsPlainObject() {
		//Return query as user friendly plain object
		//query is collection of query pairs
		//e.g. [{'width', 10}, {'height', 2}]
		//access via object.width or object['width']
		const object = {};
		for (let pair of this.queryAsArray())
			object[pair[0]] = pair[1];	
		return object;
	}	
	
	query() {
		//alias
		return this.queryAsPlainObject();
	}		
	
	//-----------------------------------------	
	//private helpers
	
	whatwgUrl() {
		//return a Node whatwgUrl object
		const base = 'http://' + this.host + '/';
		return new URL(this.urlPathAndQuery, base);
	}

	//-----------------------------------------	
	//static (class) public convenience methods

	static pathFor(req) {
		return (new this(req)).path();
	}
	
	static queryObjectFor(req) {
		return (new this(req)).queryAsPlainObject();
	}	
		
}

//=============================================

exports.UrlWrapper = UrlWrapper;