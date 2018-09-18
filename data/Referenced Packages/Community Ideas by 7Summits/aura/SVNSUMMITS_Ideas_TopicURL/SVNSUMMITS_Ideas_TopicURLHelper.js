({
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