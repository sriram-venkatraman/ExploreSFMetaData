({
	get_SitePrefix : function(component) {
    	var action = component.get("c.getSitePrefix");
        var self = this;
        action.setCallback(this, function(actionResult) {
            var sitePath = actionResult.getReturnValue();
            component.set("v.sitePath", sitePath);
            component.set("v.sitePrefix", sitePath.replace("/s",""));
		});
        $A.enqueueAction(action);    
    },
    
    getZoneId : function(component) {
        var action = component.get("c.getZoneId");

        action.setParams({
            nameValue: component.get("v.zoneName")
        });

        var self = this;
        action.setCallback(this, function(actionResult) {
            var zoneId = actionResult.getReturnValue();
            component.set("v.zoneId", zoneId);
            
            if(zoneId != "")
            {
                self.getIdea(component);
            }

        });
        $A.enqueueAction(action);
    },
    
    isAuthenticated : function(component) {
        var action = component.get("c.isAuthenticated");
        
        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.isAuthenticated", actionResult.getReturnValue());            
        });
        $A.enqueueAction(action);
    },
    
    isNicknameDisplayEnabled : function(component) {
        var action = component.get("c.isNicknameDisplayEnabled");
        
        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.isNicknameDisplayEnabled", actionResult.getReturnValue());            
        });
        $A.enqueueAction(action);
    },
    
    getIdea : function(component) {
        var action = component.get("c.getIdea");

        action.setParams({
            recordId: component.get("v.recordId"),
            zoneId: component.get("v.zoneId")
        });
        
        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.idea", actionResult.getReturnValue());            
        });
        $A.enqueueAction(action);
    },
    
    debug: function(component, msg, variable) {
        
        var debugMode = component.get("v.debugMode");
        
        if(debugMode)
        {
            if(msg)
            {
            	console.log(msg);
            }
            
            if(variable)
            {
            	console.log(variable);
            }
        }
        
    }
})