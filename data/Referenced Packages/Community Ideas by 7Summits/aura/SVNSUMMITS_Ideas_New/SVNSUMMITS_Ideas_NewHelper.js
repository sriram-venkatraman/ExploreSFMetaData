({
    isAuthenticated : function(component) {
        var action = component.get("c.isAuthenticated");

        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.isAuthenticated", actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
    },

    get_SitePrefix : function(component) {
    	var action = component.get("c.getSitePrefix");
        var self = this;
        action.setCallback(this, function(actionResult) {
            var sitePath = actionResult.getReturnValue();
            self.debug(component,"sitePath",sitePath);
            component.set("v.sitePath", sitePath);
            component.set("v.sitePrefix", sitePath.replace("/s",""));
		});
        $A.enqueueAction(action);
    },

    get_SessionId : function(component) {
        var action = component.get("c.getSessionId");

        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.sessionId", actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
    },

    get_TopicNamesList : function(component) {
        var action = component.get("c.getTopicNamesList");

        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.topicNamesList", actionResult.getReturnValue());
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
            component.set("v.zoneid", actionResult.getReturnValue());

        });
        $A.enqueueAction(action);
    },
    
    getPicklistValues : function(component) {
        var action = component.get("c.getPicklistValues");

        action.setParams({
            objName: "Idea",
            fieldName: "Categories"
        });

        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.categoriesSet", actionResult.getReturnValue());

        });
        $A.enqueueAction(action);
    },
    
    initializeDropdown: function(component) {
        try {
            var catCmp = component.find("categories");
            $A.util.removeClass(catCmp,"slds-hide");
            $A.util.addClass(catCmp, "ui");
            $(catCmp.getElement())
            .dropdown({
                placeholder: "Select Categories"
            });
            
            if(component.get("v.useTopics"))
        	{
               var topicCmp = component.find("selectedTopic");
                $A.util.removeClass(topicCmp,"slds-hide");
            	$A.util.addClass(topicCmp, "ui");
            	$(topicCmp.getElement())
            	.dropdown({
                	placeholder: "Select Topics"
            	});
            }
            
        }catch(e){this.debug(component,null,e);}
    },
    
    check_DuplicateIdeas : function(component) {
        var action = component.get("c.checkDuplicateIdeas");
        var inputTitleCmp = component.find("title");
        action.setParams({
            "title": inputTitleCmp.get("v.value").trim(),
            "zoneId": component.get("v.zoneid"),
            "simIdeasLimit": component.get("v.simIdeasLimit")
        });
        action.setCallback(this, function(actionResult) {
            var ideasList = actionResult.getReturnValue();
            component.set("v.ideasList", ideasList);
            var cmpSpinner = component.find("spinner");
        	$A.util.addClass(cmpSpinner, "hide");
        });
        $A.enqueueAction(action);
    },

	submitIdea : function(component, currIdea, base64imgdata, imgName) {
        this.debug(component,"called helper method...",null);
        
        var action = component.get("c.createIdea");

        if(component.get("v.useTopics"))
        {
        	var selectedTopic = component.find("selectedTopic").get("v.value");
            if(selectedTopic)
            {
               currIdea.CCIDEASLC__Related_Topic_Name__c = selectedTopic;
            }
        }

        if(component.get("v.defaultStatus"))
        {
            currIdea.Status = component.get("v.defaultStatus");
        }
        
        action.setParams({
            "currIdeaList": new Array(currIdea)
        });
		
        var pathToDetail = component.get("v.pathToDetail");
        
        var self = this;
        
        var titlebanner = component.find("titlebanner");
        titlebanner.getElement().scrollIntoView(true);
        var spinnerSubmit = component.find("spinnerSubmit");
        $A.util.removeClass(spinnerSubmit,"hide");
        var newIdeaForm = component.find("newIdeaForm");
        $A.util.addClass(newIdeaForm, "hide");
        
        action.setCallback(this, function(actionResult) {

            var resId = actionResult.getReturnValue();
            var resultId = component.find("resultId");
            self.debug(component,"resId: ", resId);
            if(actionResult.getState() == 'SUCCESS' && resId)
            {
            	self.debug(component,"success",null);
            	
            	self.goToURL(pathToDetail + resId, false);
                
            }
            else if(actionResult.getState() == 'SUCCESS' && !resId)
            {
                
        		var spinnerSubmit = component.find("spinnerSubmit");
        		$A.util.addClass(spinnerSubmit,"hide");
        		var newIdeaForm = component.find("newIdeaForm");
        		$A.util.removeClass(newIdeaForm, "hide");
                var resultsdiv = component.find("resultsdiv");
        		resultsdiv.getElement().scrollIntoView(false);
                
            	self.debug(component,"Apex Error",null);
            	resultId.set("v.value", "Apex Error");
            }
            else if(actionResult.getState() == 'ERROR')
            {
                var spinnerSubmit = component.find("spinnerSubmit");
        		$A.util.addClass(spinnerSubmit,"hide");
        		var newIdeaForm = component.find("newIdeaForm");
        		$A.util.removeClass(newIdeaForm, "hide");
                var resultsdiv = component.find("resultsdiv");
        		resultsdiv.getElement().scrollIntoView(false);
                
                var errors = actionResult.getError();
                errorMsgs = '<ul>';
                for(var i=0; i< errors.length; i++)
                {
                    errorMsgs += '<li>' + errors[i].message + '</li>';
                }
                errorMsgs += '</ul>';

                self.debug(component,"errors: ", errorMsgs);
                resultId.set("v.value", errorMsgs);
            }


        });
        self.debug(component,"Enqueuing action...",null);
        $A.enqueueAction(action);
    },

    goToURL: function(url, isredirect) {
        var urlEvent = $A.get("e.force:navigateToURL");
	    urlEvent.setParams({
		"url": url,
        "isredirect" : isredirect
		});
		urlEvent.fire();
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