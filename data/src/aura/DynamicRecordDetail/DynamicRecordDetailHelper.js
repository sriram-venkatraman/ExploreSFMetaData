({
	getFields : function(cmp) {
		var fldsString = cmp.get("v.fieldList");
        var flds = fldsString.split(",")
		
        var newComponents = new Array();
        for (var i = 0; i < flds.length; i += 2)  {
            // div slds-grid
			newComponents.push(["aura:HTML", {
                    "tag": "div",
                    "HTMLAttributes": {
                        "class": "slds-grid"
                    }
                }]);
            
            // div slds col1
            newComponents.push(["aura:HTML", {
                    "tag": "div",
                    "HTMLAttributes": {
                        "class": "slds-col slds-size_1-of-2 slds-p-right_medium"
                    }
                }]);
            
            // outputfield 1
            newComponents.push(["lightning:outputField", {
                    "fieldName": flds[i]
                }]);
            
            // div slds col2
            newComponents.push(["aura:HTML", {
                    "tag": "div",
                    "HTMLAttributes": {
                        "class": "slds-col slds-size_1-of-2 slds-p-right_large"
                    }
                }]);
            
            // outputfield 2
            newComponents.push(["lightning:outputField", {
                    "fieldName": flds[i+1]
                }]);
        }
        
        // Create the components
        $A.createComponents(newComponents, function(components, status, errorMessage) {
            //Add the new button to the body array
            if (status === "SUCCESS") {
                var body = cmp.get("v.body");

                for (var i=0; i < components.length; i+=5) {
                    var grid = components[i];
                    var gridcol1 = components[i+1];
                    var col1 = components[i+2];
                    var gridcol2 = components[i+3];
                    var col2 = components[i+4];

                    // Add the <col1> to <div slds col1> 
                    var gridcol1Body = gridcol1.get('v.body');
                    gridcol1Body.push(col1);
                    gridcol1.set('v.body', gridcol1Body);

                    // Add the <col2> to <div slds col2> 
                    var gridcol2Body = gridcol2.get('v.body');
                    gridcol2Body.push(col2);
                    gridcol2.set('v.body', gridcol2Body);

                    // Add the <div slds col1> to <div slds grid>
                    var gridBody = grid.get('v.body');
                    gridBody.push(gridcol1);
                    gridBody.push(gridcol2);
                    grid.set('v.body', gridBody);

	                body.push(grid);
                }
                
                cmp.set("v.body", body);
            }
            else if (status === "INCOMPLETE") {
                console.log("No response from server or client is offline.")
                // Show offline error
            }
            else if (status === "ERROR") {
                console.log("Error: " + errorMessage);
                // Show error message
            }
        });                                
    }
})