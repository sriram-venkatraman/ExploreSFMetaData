var http = require('http');
var url = require('url');
var eo = require('./ExploreObject'),
  ep = require('./ExploreProfile'),
  eps = require('./ExplorePermissionSet');

// http://localhost:8080/exploreObject/?object=Case

var server = http.createServer().listen(8080);

server.on('request', function (req, res) {
  if (req.method == 'GET') {
    var url_parts = url.parse(req.url, true);
    //    console.log('url_parts: ' + JSON.stringify(url_parts));
    var query = url_parts.query;
    //    console.log('pathname: ' + query.pathname);
    //    console.log('query: ' + JSON.stringify(query));
    //    console.log('object: ' + query.object);
    console.log('You entered: ' + url_parts.pathname);
    switch (url_parts.pathname) {
      case '/':
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('Salesforce Metadata Explorer');
        break;
      case '/exploreObject':
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var out = JSON.stringify(eo.exploreObject(query.object));
        res.end(out.substring(1, out.length - 1));
        break;
      case '/exploreProfile':
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var out = JSON.stringify(ep.exploreProfile(query.profile));
        res.end(out.substring(1, out.length - 1));
        break;
      case '/explorePermissionset':
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var out = JSON.stringify(eps.explorePermissionset(query.permissionset));
        res.end(out.substring(1, out.length - 1));
        break;
    }
  }
  /*
    req.on('data', function (data) {
      body += data;
    });
  
    req.on('end', function () {
      var post = querystring.parse(body);
      console.log(post);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World\n');
    });
  */
});

console.log('Listening on port 8080');