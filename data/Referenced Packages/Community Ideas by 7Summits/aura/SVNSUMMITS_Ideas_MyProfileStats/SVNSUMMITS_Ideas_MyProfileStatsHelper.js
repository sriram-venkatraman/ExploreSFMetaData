({
	getZoneId : function(component) {
        var action = component.get("c.getZoneId");

        action.setParams({
            nameValue: component.get("v.zoneName")
        });

        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.zoneid", actionResult.getReturnValue());

        });
        $A.enqueueAction(action);
    },
    
    get_UserId : function(component) {
        var action = component.get("c.getUserId");
        
        var self = this;
        action.setCallback(this, function(actionResult) {
            var userId = actionResult.getReturnValue();
            userId = userId.substring(0,15);            
			component.set("v.userId", userId);
            
        });
        $A.enqueueAction(action);
    }
})