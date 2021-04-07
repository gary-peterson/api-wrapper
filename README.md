
# URL Wrapper

## Overview

Wraps the somewhat complex node URL global object.

Wrapper is constructed with request object.

Given full url of:

	- https://foo.com/shapes/rectangle?width=10&height=5

Wrapper will provide:

	- url path, e.g., /shapes/rectangle
	- query params e.g., width=10&height=5
		(as string, array of pairs, or plain object / map

## Usage

```
require 'url-wrapper'

//given a request object (var 'req')
const urlWrapper = UrlWrapper.fromRequest(req);

const path = urlWrapper.path();

const query = urlWrapper.query();
//use query params
const
	w = query.width,
	h = query.height;
	
//or use query['width'], ...

//or array of pairs
const queryParams = urlWrapper.queryAsArray();

```


