/* npm install xml2json */
var fs = require('fs'),
    path = require('path'),
    parser = require('xml2json'),
    c2D3js = require('./convert2D3JSON'),
    outJson = [];

var methods = {
    exploreAura: function (auraName) {
        var data = fs.readFileSync('/Users/sriram.venkatraman/Documents/workspace/SfServices Bedrock/src/aura/RubricEvaluation/' + auraName + '.cmp');
        var json = parser.toJson(data);
        var d3j = c2D3js.convert2D3JSONSync(json);
        d3j[0].name = auraName;
        outJson = d3j;
        return (outJson);
    }
}

module.exports = methods;

//var d3js = JSON.stringify(methods.exploreAura('RubricEvaluation'));
//console.log(d3js.substring(1, d3js.length - 1));
