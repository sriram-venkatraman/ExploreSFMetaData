var http = require('http');
var url = require('url');
var fs = require('fs'),
  eo = require('./ExploreObject'),
  ep = require('./ExploreProfile'),
  eps = require('./ExplorePermissionSet'),
  au = require('./ExploreAura');

// https://secure-stream-97980.herokuapp.com/exploreObject/?object=Case

var server = http.createServer().listen(process.env.PORT || 3000);

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
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ name: 'Salesforce Metadata Explorer', children: [] }));
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
      case '/exploreAura':
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var out = JSON.stringify(au.exploreAura(query.aura));
        res.end(out.substring(1, out.length - 1));
        break;
      case '/explore':
        res.redirect('ExploreMetaData.html');
        break;
      default:
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.writeHead(404);
        res.write('Contents you are looking are Not Found');
        res.end();
        break;
    }
  }
});

console.log('Listening on port ' + process.env.PORT || 3000);
//