({

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

    getUserId : function(component) {
        var action = component.get("c.getUserId");
        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.userId", actionResult.getReturnValue());
		});
        $A.enqueueAction(action);
    },

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
            component.set("v.zoneid", zoneId);
            
            if(zoneId != "")
            {
                self.getIdeasList(component);
            }
	
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

            var catSetValue = component.get("v.categoriesSet");
        	var catSet = new Set(catSetValue);

        	var topicValue = component.get("v.topicValue");
        	self.debug(component,"catSetValue ", catSetValue);
        	if(catSet.has(topicValue) && component.get("v.filterOn") == 'Topic')
        	{
            	self.debug(component,"found topic ", topicValue);
				component.set("v.categories",topicValue);
                this.getIdeasList(component);
        	}
        	else
        	{
				self.debug(component,"did not find topic ", topicValue);
        	}

        });
        $A.enqueueAction(action);
    },

    getIdeasList: function(component) {
        var self = this;
        var action = component.get("c.getIdeas");
        this.debug(component,"listSize: ",component.get("v.listSize"));

        action.setParams({
            listSize: component.get("v.listSize"),
            categories: component.get("v.categories"),
            zoneId : component.get("v.zoneid"),
            sortBy : component.get("v.sortBy"),
            limitVoteToEmailDomain  : component.get("v.limitVoteToEmailDomain"),
            filterByTopic : component.get("v.filterOn") == 'Topic' ? true : false,
            topicName : component.get("v.topicValue"),
            filterBySearchTerm : component.get("v.filterOn") == 'Search Term' ? true : false,
            searchTerm : component.get("v.searchTermValue"),
            filterOnUserOwned : component.get("v.filterOn") == 'My Ideas' ? true : false,
            filterOnUserVoted : component.get("v.filterOn") == 'My Voted On Ideas' ? true : false
        });


        action.setCallback(this, function(actionResult) {
            var ideaListWrapper = actionResult.getReturnValue();
            self.debug(component,"ideaListWrapper", ideaListWrapper);
			var sortBy = component.get("v.sortBy");
            for(var i=0;i<ideaListWrapper.ideaList.length;i++)
                {
                    if(ideaListWrapper.ideaList[i].Categories)
                    {
                        ideaListWrapper.ideaList[i].Categories = ideaListWrapper.ideaList[i].Categories.split(";");
                    }
                    self.debug(component,"Status",ideaListWrapper.ideaList[i].Status);
                    self.debug(component,"attachmentName",ideaListWrapper.ideaList[i].attachmentName);
                    
                    ideaListWrapper.ideaList[i].fromNow = moment.utc(ideaListWrapper.ideaList[i].CreatedDate).fromNow();
                    
                    if(sortBy == "Recent Comments")
                    {
                        ideaListWrapper.ideaList[i].LastComment.fromNow = moment.utc(ideaListWrapper.ideaList[i].LastComment.CreatedDate).fromNow();
                    }
                    
                }
            self.debug(component,"ideaListWrapper",ideaListWrapper);
            self.debug(component,"topicNameToIdJSON",ideaListWrapper.topicNameToIdJSON);
            component.set("v.ideaListWrapper", ideaListWrapper);
			var cmpSpinner = component.find("spinner");
        	$A.util.addClass(cmpSpinner, "hide");
        });
        $A.enqueueAction(action);
    },

    getNextPage: function(component, event) {
        this.debug(component,"nextPage called",null);
        var self = this;
        var action = component.get("c.nextPage");
        this.debug(component,"ideaListWrapper",component.get("v.ideaListWrapper"));
        action.setParams({
            listSize: component.get("v.ideaListWrapper").listSizeValue,
            zoneId : component.get("v.zoneid"),
            pageNumber : component.get("v.ideaListWrapper").pageNumber,
            categories: component.get("v.categories"),
            sortBy : component.get("v.sortBy"),
            limitVoteToEmailDomain  : component.get("v.limitVoteToEmailDomain"),
            filterByTopic : component.get("v.filterOn") == 'Topic' ? true : false,
            topicName : component.get("v.topicValue"),
            filterBySearchTerm : component.get("v.filterOn") == 'Search Term' ? true : false,
            searchTerm : component.get("v.searchTermValue"),
            filterOnUserOwned : component.get("v.filterOn") == 'My Ideas' ? true : false,
            filterOnUserVoted : component.get("v.filterOn") == 'My Voted On Ideas' ? true : false
        });

        action.setCallback(this, function(actionResult) {
            var ideaListWrapper = actionResult.getReturnValue();
			var sortBy = component.get("v.sortBy");
            for(var i=0;i<ideaListWrapper.ideaList.length;i++)
            {
            	if(ideaListWrapper.ideaList[i].Categories)
                {
                	ideaListWrapper.ideaList[i].Categories = ideaListWrapper.ideaList[i].Categories.split(";");
                }
                self.debug(component,"Categories",ideaListWrapper.ideaList[i].Categories);
                
                ideaListWrapper.ideaList[i].fromNow = moment.utc(ideaListWrapper.ideaList[i].CreatedDate).fromNow();
                    
                if(sortBy == "Recent Comments")
                {
                	ideaListWrapper.ideaList[i].LastComment.fromNow = moment.utc(ideaListWrapper.ideaList[i].LastComment.CreatedDate).fromNow();
                }
            }
            var cmpSpinner = component.find("spinner");
        	$A.util.addClass(cmpSpinner, "hide");
			self.debug(component,"ideaListWrapper",ideaListWrapper);
            component.set("v.ideaListWrapper", ideaListWrapper);
            self.debug(component,"pageNumber: ", ideaListWrapper.pageNumber)
            var pageNumberComp = this.component.find("pageNumber");
            pageNumberComp.set("v.value",ideaListWrapper.pageNumber);

        });

        $A.enqueueAction(action);
    },

    getPreviousPage: function(component, event) {
        this.debug(component,"previousPage called",null);
        var self = this;
        var action = component.get("c.previousPage");
        this.debug(component,"ideaListWrapper",component.get("v.ideaListWrapper"));
        action.setParams({
            listSize: component.get("v.ideaListWrapper").listSizeValue,
            zoneId : component.get("v.zoneid"),
            pageNumber : component.get("v.ideaListWrapper").pageNumber,
            categories: component.get("v.categories"),
            sortBy : component.get("v.sortBy"),
            limitVoteToEmailDomain  : component.get("v.limitVoteToEmailDomain"),
            filterByTopic : component.get("v.filterOn") == 'Topic' ? true : false,
            topicName : component.get("v.topicValue"),
            filterBySearchTerm : component.get("v.filterOn") == 'Search Term' ? true : false,
            searchTerm : component.get("v.searchTermValue"),
            filterOnUserOwned : component.get("v.filterOn") == 'My Ideas' ? true : false,
            filterOnUserVoted : component.get("v.filterOn") == 'My Voted On Ideas' ? true : false
        });

        action.setCallback(this, function(actionResult) {
            var ideaListWrapper = actionResult.getReturnValue();
			var sortBy = component.get("v.sortBy");
            for(var i=0;i<ideaListWrapper.ideaList.length;i++)
            {
            	if(ideaListWrapper.ideaList[i].Categories)
                {
                	ideaListWrapper.ideaList[i].Categories = ideaListWrapper.ideaList[i].Categories.split(";");
                }
                self.debug(component,"Categories",ideaListWrapper.ideaList[i].Categories);
                
                ideaListWrapper.ideaList[i].fromNow = moment.utc(ideaListWrapper.ideaList[i].CreatedDate).fromNow();
                    
               if(sortBy == "Recent Comments")
               {
                   ideaListWrapper.ideaList[i].LastComment.fromNow = moment.utc(ideaListWrapper.ideaList[i].LastComment.CreatedDate).fromNow();
               }
            }

            var cmpSpinner = component.find("spinner");
        	$A.util.addClass(cmpSpinner, "hide");
			self.debug(component,"ideaListWrapper",ideaListWrapper);
            component.set("v.ideaListWrapper", ideaListWrapper);
            self.debug(component,"pageNumber: ", ideaListWrapper.pageNumber);
            var pageNumberComp = this.component.find("pageNumber");
            pageNumberComp.set("v.value",ideaListWrapper.pageNumber);

        });

        $A.enqueueAction(action);
    },

    submitVote: function(component, event, ideaId, voteType) {
        this.debug(component,"submitVote called",null);
        var action = component.get("c.submitVote");
        this.debug(component,"ideaListWrapper",component.get("v.ideaListWrapper"));
        action.setParams({
            ideaId: ideaId,
            voteType: voteType
        });

        action.setCallback(this, function(actionResult) {
            var currIdea = actionResult.getReturnValue();

            if(currIdea)
            {

                if(currIdea.Categories)
                {
                	currIdea.Categories = currIdea.Categories.split(";");
                }

        		var ideaListWrapper = component.get("v.ideaListWrapper");

                for(var i=0;i<ideaListWrapper.ideaList.length;i++)
        		{
					if(ideaListWrapper.ideaList[i].Id == ideaId)
            		{
                		ideaListWrapper.ideaList[i] = currIdea;
                        break;
            		}
       			 }
        		component.set("v.ideaListWrapper",ideaListWrapper);
            }

        });

        $A.enqueueAction(action);
    },

    initializeDropdown: function(component) {
        try{
        var catCmp = component.find("categoriesFilter");
            $A.util.removeClass(catCmp,"slds-hide");
            $A.util.addClass(catCmp, "ui");
            $(catCmp.getElement())
            .dropdown({
                placeholder: "All Categories"
            });
        }catch(e){this.debug(component,null,e);}
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