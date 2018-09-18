/* npm install xml2json */
var fs = require('fs'),
    path = require('path'),
    parser = require('xml2json'),
    c2D3js = require('./convert2D3JSON'),
    outJson = [];

var limitElements = ["aura:application",
    "aura:component",
    "controller",
    "implements",
    "access",
    "ltng:require",
    "aura:handler",
    "force:recordData",
    "lightning:button"
];

var methods = {
    exploreAura: function (auraName) {
        var data = fs.readFileSync('./data/src/aura/RubricEvaluation/' + auraName + '.cmp');
        var json = parser.toJson(data);

        var jsonP = JSON.parse(json);
        var customComponents = [];
        this.getCustomComponents(jsonP, customComponents);
        this.trimElements(jsonP);
        if (customComponents.length > 0) {
            var done = false;
            for (var i in jsonP) {
                if (!done) {
                    jsonP[i].customComponents = customComponents;
                    done = true;
                }
            }
        }

        var d3j = c2D3js.convert2D3JSONSync(JSON.stringify(jsonP));
        d3j[0].name = auraName;
        outJson = d3j;
        return (outJson);
    },

    getCustomComponents: function (o, r) {
        for (var i in o) {
            switch (typeof (o[i])) {
                case "object":
                    if (o[i] != null) {
                        if (i.startsWith("c:")) {
                            o[i]["c:name"] = i;
                            r.push(o[i]);
                        }
                        this.getCustomComponents(o[i], r);
                    }
                    break;
                default:
            }
        }
        return;
    },

    trimElements: function (o) {
        for (var i in o) {
            switch (typeof (o[i])) {
                case "object":
                    if (o[i] != null) {
                        if (!limitElements.includes(i)) {
                            delete o[i];
                        }
                        if (Object.prototype.toString.call(o[i]) != '[object Array]') {
                            this.trimElements(o[i]);
                        }
                    }
                    break;
                default:
            }
        }
        return;
    }
}

module.exports = methods;

//var d3js = JSON.stringify(methods.exploreAura('RubricEvaluation'));
//console.log(d3js.substring(1, d3js.length - 1));
