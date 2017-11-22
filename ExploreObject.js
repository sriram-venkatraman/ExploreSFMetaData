/* npm install xml2json */
var fs = require('fs'),
    path = require('path'),
    parser = require('xml2json'),
    c2D3js = require('./convert2D3JSON'),
    outJson = [];

var methods = {
    exploreObject: function (objName) {
        var data = fs.readFileSync('/Users/sriram.venkatraman/Documents/workspace/TestCo/src/objects/' + objName + '.object');
        var json = parser.toJson(data);
        var d3j = c2D3js.convert2D3JSONSync(json);
        d3j[0].name = objName;
        outJson = d3j;
        this.addWorkflows(objName);
        this.addLayouts(objName);
        this.addTriggers(objName);
        this.addQuickAction(objName);
        return (outJson);
    },

    addWorkflows: function (objName) {
        var data = fs.readFileSync('/Users/sriram.venkatraman/Documents/workspace/TestCo/src/workflows/' + objName + '.workflow');
        var json = parser.toJson(data);
        var d3j = c2D3js.convert2D3JSONSync(json);
        var d3js = JSON.stringify(d3j);
        outJson[0].children.push(JSON.parse(d3js.substring(1, d3js.length - 1)));
    },

    addLayouts: function (objName) {
        var inPath = '/Users/sriram.venkatraman/Documents/workspace/TestCo/src/layouts';
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

        //        d3js = JSON.stringify(outJson);
        //        console.log(d3js.substring(1, d3js.length - 1));
    },

    addTriggers: function (objName) {
        var inPath = '/Users/sriram.venkatraman/Documents/workspace/TestCo/src/triggers';
        var outTriggerJson = [];
        var files = fs.readdirSync(inPath);
        var data, json, d3j, d3js, src, whatTrigger;
        for (var i in files) {
            var fullPath = path.join(inPath, files[i]);
            var stat = fs.statSync(fullPath);
            //console.log(stat);
            if (stat.isFile() && files[i].endsWith('.trigger')) {
                src = fs.readFileSync(fullPath) + '';
                var re = /trigger ([\s\S]*[\s\S]) on ([\s\S]*[\s\S]) \(/i;
                whatTrigger = re.exec(src);
                if (whatTrigger != null && whatTrigger.length > 0 && whatTrigger[2].split(' ')[0] == objName) {
                    var fullMetaXMLPath = path.join(inPath, files[i] + '-meta.xml');
                    data = fs.readFileSync(fullMetaXMLPath);
                    json = parser.toJson(data);
                    d3j = c2D3js.convert2D3JSONSync(json);
                    d3j[0].name = whatTrigger[1];
                    d3js = JSON.stringify(d3j);
                    outTriggerJson.push(JSON.parse(d3js.substring(1, d3js.length - 1)));
                }
            }
        }

        if (outTriggerJson.length > 0) {
            outJson[0].children.push({ name: "Triggers (" + outTriggerJson.length + ")", children: outTriggerJson });
        }
    },

    addQuickAction: function (objName) {
        var inPath = '/Users/sriram.venkatraman/Documents/workspace/TestCo/src/quickActions';
        var outQuickActionJson = [];
        var files = fs.readdirSync(inPath);
        var data, json, d3j, d3js, src;
        for (var i in files) {
            var fullPath = path.join(inPath, files[i]);
            var stat = fs.statSync(fullPath);
            //console.log(stat);
            if (stat.isFile() && files[i].endsWith('.quickAction')) {
                data = fs.readFileSync(fullPath);
                json = parser.toJson(data);
                var obj = JSON.parse(json);
                if (obj.QuickAction.targetObject == objName) {
                    d3j = c2D3js.convert2D3JSONSync(json);
                    d3j[0].name = files[i].substring(0,files[i].indexOf(".quickAction"));
                    d3js = JSON.stringify(d3j);
                    outQuickActionJson.push(JSON.parse(d3js.substring(1, d3js.length - 1)));
                }
            }
        }

        if (outQuickActionJson.length > 0) {
            outJson[0].children.push({ name: "QuickActions (" + outQuickActionJson.length + ")", children: outQuickActionJson });
        }
    }
}

module.exports = methods;

//var d3js = JSON.stringify(methods.exploreObject('Case'));
//console.log(d3js.substring(1, d3js.length - 1));
