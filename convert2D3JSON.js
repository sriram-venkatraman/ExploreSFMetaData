//convert2D3JSON('out.json', 'Opportunity', function(data){
//    console.log(JSON.stringify(data));
//});

var methods = {
    convert2D3JSON: function (data, callback) {
        var result = [];
        var obj = JSON.parse(data);
        this.traverse(obj, process, result);
        callback(result);
    },

    convert2D3JSONSync: function (data) {
        var result = [];
        var obj = JSON.parse(data);
        this.traverse(obj, process, result);
        return (result);
    },

    convert2D3JSONf: function (inFile, parentObjName, callback) {
        var result = [];
        var fs = require('fs');
        var obj;
        fs.readFile(inFile, 'utf8', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
            var keys = Object.keys(result);
            var last = keys[keys.length - 1];
            this.traverse(obj, process, result);
            callback(result);
        });
    },

    traverse: function (o, func, r) {
        for (var i in o) {
            switch (typeof (o[i])) {
                case "object":
                    if (o[i] != null) {
                        var children = [];
                        this.traverse(o[i], func, children);
                        if (children.length > 0) {
                            var name = i;
                            if (!isNaN(name)) {
                                name = this.getName(children);
                            }
//                            r.push({ name: (name == "" ? i : name) + " (" + children.length + ")", children: children });
                            if (Object.prototype.toString.call(children) === '[object Array]') {
                                r.push({ name: (name == "" ? i : name) + " (" + children.length + ")", children: children });
                            } else {
                                r.push({ name: (name == "" ? i : name), children: children });
                            }
                        }
                    }
                    break;
                case "boolean":
                case "number":
                case "string":
                    r.push({ name: i, value: o[i] });
                    break;
                default:
            }
        }
    },

    isEmpty: function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    },

    getName: function (obj) {
        var retVal = "";

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).toLowerCase().startsWith("c:")) {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).toLowerCase() == "event") {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).match(/label/i)) {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).match(/name/i)) {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).toLowerCase().endsWith(":id")) {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).match(/field/i)) {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).match(/picklist/i)) {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).match(/relatedList/i)) {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).match(/application/i)) {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).match(/apexclass/i)) {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).match(/object/i)) {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).match(/apexpage/i)) {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).match(/layout/i)) {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).match(/recordtype/i)) {
                retVal = obj[i].value;
            }
        }

        for (i = 0; (retVal == "" || typeof (retVal) == "undefined") && i < obj.length; i++) {
            if ((obj[i].name).match(/tab/i)) {
                retVal = obj[i].value;
            }
        }

        return retVal;
    }
}

module.exports = methods;