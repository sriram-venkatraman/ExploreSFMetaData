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
            
            if(zoneId != '')
            {
                self.getIdea(component);
                self.getVote(component);
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
    
    getVote : function(component) {
        var action = component.get("c.getVote");
        action.setParams({
            recordId: component.get("v.recordId")
        });
        
        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.currentVote", actionResult.getReturnValue());            
        });
        $A.enqueueAction(action);
        
    },
    
    vote : function(component, isUp) {
        var action = component.get("c.vote");
        var recordId = component.get("v.recordId");
        
        action.setParams({
            "recordId": recordId,
            isUp: isUp
        });
        
        var self = this;
        action.setCallback(this, function(actionResult) {
            if(actionResult.getState() == 'SUCCESS' && actionResult.getReturnValue()) {
            	component.set("v.currentVote", actionResult.getReturnValue());  
                self.getIdea(component);
            } else {
                var errors = actionResult.getError();
                for(var i=0; i < errors.length; i++) {
	                this.debug(component,'Error: ', errors[i].message);
                }
            }          
            
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