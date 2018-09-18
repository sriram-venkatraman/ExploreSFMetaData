({

    /*
     *  Map the Schema.FieldSetMember to the desired component config, including specific attribute values
     *  Source: https://www.salesforce.com/us/developer/docs/apexcode/index_Left.htm#CSHID=apex_class_Schema_FieldSetMember.htm|StartTopic=Content%2Fapex_class_Schema_FieldSetMember.htm|SkinName=webhelp
     *
     *  Change the componentDef and attributes as needed for other components
     */
    configMap: {
        "anytype": { componentDef: "markup://ui:inputText" },
        "base64": { componentDef: "markup://ui:inputText" },
        "boolean": {componentDef: "markup://ui:inputCheckbox" },
        "combobox": { componentDef: "markup://ui:inputText" },
        "currency": { componentDef: "markup://ui:inputText" },
        "datacategorygroupreference": { componentDef: "markup://ui:inputText" },
        "date": { componentDef: "markup://ui:inputDate" },
        "datetime": { componentDef: "markup://ui:inputDateTime" },
        "double": { componentDef: "markup://ui:inputNumber", attributes: { values: { format: "0.00"} } },
        "email": { componentDef: "markup://ui:inputEmail" },
        "encryptedstring": { componentDef: "markup://ui:inputText" },
        "id": { componentDef: "markup://ui:inputText" },
        "integer": { componentDef: "markup://ui:inputNumber", attributes: { values: { format: "0"} } },
        "multipicklist": { componentDef: "markup://ui:inputText" },
        "percent": { componentDef: "markup://ui:inputNumber", attributes: { values: { format: "0"} } },
        "picklist": { componentDef: "markup://ui:inputText" },
        "reference": { componentDef: "markup://ui:inputText" },
        "string": { componentDef: "markup://ui:inputText" },
        "textarea": { componentDef: "markup://ui:inputText" },
        "time": { componentDef: "markup://ui:inputDateTime", attributes: { values: { format: "h:mm a"} } },
        "url": { componentDef: "markup://ui:inputText" }
    },

    // Adds the component via newComponentAsync and sets the value handler
    addComponent: function(component, facet, config, fieldPath) {
        $A.createComponent(this, {}, function(cmp) {
            cmp.addValueHandler({
                value: "v.value",
                event: "change",
                globalId: component.getGlobalId(),
                method: function(event) {
                    var values = component.get("v.values");
                    for (var i = 0; i < values.length; i++) {
                        if (values[i].name === fieldPath) {
                            values[i].value = event.getParams().value;
                        }
                    }
                    component.set("v.values", values);
                }
            });

            facet.push(cmp);
        }, config);
    },

    // Create a form given the set of fields
    createForm: function(component, fields) {
        var field = null;
        var cmp = null;
        var def = null;
        var config = null;
        var self = this;

        // Clear any existing components in the form facet
        component.set("v.form", []);

        var facet = component.getValue("v.form");
        var values = [];
        for (var i = 0; i < fields.length; i++) {
            field = fields[i];
            // Copy the config, note that this type of copy may not work on all browsers!
            config = JSON.parse(JSON.stringify(this.configMap[field.type.toLowerCase()]));
            // Add attributes if needed
            config.attributes = config.attributes || {};
            // Add attributes.values if needed
            config.attributes.values = config.attributes.values || {};

            // Set the required and label attributes
            config.attributes.values.required = field.required;
            config.attributes.values.label = field.label;

            // Add the value for each field as a name/value            
            values.push({name: field.fieldPath, value: undefined});

            // Add the component to the facet and configure it
            self.addComponent(component, facet, config, field.fieldPath);
        }
        component.set("v.values", values);
    },

    getTypeNames: function(component, event) {
        var action = component.get("c.getTypeNames");
        action.setParams({})
        action.setCallback(this, function(a) {
            var types = a.getReturnValue();
            component.set("v.types", types);
        });
        $A.enqueueAction(action);        
    },

    selectType: function(component, type) {
        component.set("v.type", type);
        this.getFieldSetNames(component, type);
    },

    getFieldSetNames: function(component, typeName) {
        var action = component.get("c.getFieldSetNames");
        action.setParams({typeName: typeName});
        action.setCallback(this, function(a) {
            var fsNames = a.getReturnValue();
            component.set("v.fsNames", fsNames);
        });
        $A.enqueueAction(action);        
    },

    selectFieldSet: function(component, fsName) {
        component.set("v.fsName", fsName);
        this.getFields(component);
    },

    getFields: function(component) {
        var action = component.get("c.getFields");
        var self = this;
        var typeName = component.get("v.type");
        var fsName = component.get("v.fsName");
        action.setParams({typeName: typeName, fsName: fsName});
        action.setCallback(this, function(a) {
            var fields = a.getReturnValue();
            component.set("v.fields", fields);
            self.createForm(component, fields);
        });
        $A.enqueueAction(action);        
    },

    submitForm: function(component, event) {
        var values = component.get("v.values");
        var s = JSON.stringify(values, undefined, 2);
        alert(s);
    }
})