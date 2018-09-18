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
    
    isAuthenticated : function(component) {
        var action = component.get("c.isAuthenticated");
        
        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.isAuthenticated", actionResult.getReturnValue());            
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
    
    getIdea : function(component) {
        var action = component.get("c.getIdea");

        action.setParams({
            recordId: component.get("v.recordId"),
            zoneId: component.get("v.zoneId")
        });
        
        var self = this;
        action.setCallback(this, function(actionResult) {
            var idea = actionResult.getReturnValue();
            if(idea.Categories)
            {
                idea.Categories = idea.Categories.replace(/;/g, ",");
            }
            self.debug(component,null,idea);
            component.set("v.idea", idea);            
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