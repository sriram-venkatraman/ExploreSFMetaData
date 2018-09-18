({
    doInit: function(component, event, helper) {
        helper.getFields(component, event);
    },

    doGetTypeNames: function(component, event, helper) {
        helper.getTypeNames(component, event);
    },

    doSelectType: function(component, event, helper) {
        var type = event.target.getAttribute("name");
        helper.selectType(component, type);
    },

    doSelectFieldSet: function(component, event, helper) {
        var fsName = event.target.getAttribute("name");
        helper.selectFieldSet(component, fsName);
    },

    doSubmit: function(component, event, helper) {
        helper.submitForm(component, event);
    }
})