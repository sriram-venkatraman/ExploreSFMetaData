/* npm install xml2json */
var methods = {
    exploreObject: function (objName) {
        var fs = require('fs'),
            path = require('path'),
            parser = require('xml2json'),
            c2D3js = require('./convert2D3JSON');


        var outJson = [];

        fs.readFile('./data/src/objects/' + objName + '.object', function (err, data) {
            var json = parser.toJson(data);
            // console.log(json);
            var d3json = c2D3js.convert2D3JSON(json, function (d3j) {
                d3j[0].name = 'Account';
                outJson = d3j;
                addWorkflows();
                //        var d3js = JSON.stringify(d3j);
                //        console.log(d3js.substring(1, d3js.length-1));
            });
        });
    },

    addWorkflows: function (objName) {
        fs.readFile('./data/src/workflows/' + objName + '.workflow', function (err, data) {
            var json = parser.toJson(data);
            var d3json = c2D3js.convert2D3JSON(json, function (d3j) {
                // console.log(JSON.stringify(d3j));
                var d3js = JSON.stringify(d3j);
                outJson[0].children.push(JSON.parse(d3js.substring(1, d3js.length - 1)));
                //            d3js = JSON.stringify(outJson);
                //            console.log(d3js.substring(1, d3js.length - 1));
                addLayouts('Account');
            });
        });
    },

    addLayouts: function (objName) {
        var inPath = './data/src/layouts';
        var outLayoutJson = [];
        var files = fs.readdirSync(inPath);
        var data, json, d3j, d3js;
        for (var i in files) {
            var fullPath = path.join(inPath, files[i]);
            var stat = fs.statSync(fullPath);
            //console.log(stat);
            if (stat.isFile() && files[i].startsWith(objName + '-')) {
                data = fs.readFileSync(fullPath);
                json = parser.toJson(data);
                d3j = c2D3js.convert2D3JSONSync(json);
                d3j[0].name = files[i].substring(files[i].indexOf("-") + 1, files[i].length);
                d3js = JSON.stringify(d3j);
                outLayoutJson.push(JSON.parse(d3js.substring(1, d3js.length - 1)));
            }
        }
    
        if (outLayoutJson.length > 0) {
            outJson[0].children.push({ name: "Layouts (" + outLayoutJson.length + ")", children: outLayoutJson });
        }
    
        d3js = JSON.stringify(outJson);
        console.log(d3js.substring(1, d3js.length - 1));
    }
}



