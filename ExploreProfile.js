/* npm install xml2json */
var fs = require('fs'),
    path = require('path'),
    parser = require('xml2json'),
    c2D3js = require('./convert2D3JSON');
var outJson = [];

var methods = {
    exploreProfile: function (profile) {
        var data = fs.readFileSync('/Users/sriram.venkatraman/Documents/workspace/TestCo/src/profiles/' + profile + '.profile');
        var json = parser.toJson(data);
        // console.log(json);
        var d3j = c2D3js.convert2D3JSONSync(json);
        d3j[0].name = profile;
        outJson = d3j;
        return (outJson);
        // var d3js = JSON.stringify(d3j);
        // console.log(d3js.substring(1, d3js.length - 1));
    }
}

module.exports = methods;
