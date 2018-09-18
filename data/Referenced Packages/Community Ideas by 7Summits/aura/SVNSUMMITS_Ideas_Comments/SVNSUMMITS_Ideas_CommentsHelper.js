({
	loadRecordId : function(component) {
        //var relativePath = window.location.pathname;
        //var recordId = relativePath.substr(relativePath.lastIndexOf('/') + 1);

        //component.set("v.recordId", recordId);
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
    
    getZoneId : function(component) {
        var action = component.get("c.getZoneId");

        action.setParams({
            nameValue: component.get("v.zoneName")
        });

        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.zoneId", actionResult.getReturnValue());
            self.isValidIdeaId(component);

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
    
    isValidIdeaId : function(component) {
        var action = component.get("c.isValidIdeaId");
        action.setParams({
            ideaId : component.get("v.recordId"),
            zoneId : component.get("v.zoneId")
        });
        var self = this;
        action.setCallback(this, function(actionResult) {
            var isValidIdeaId = actionResult.getReturnValue();
            component.set("v.isValidIdeaId", isValidIdeaId);
            if(isValidIdeaId)
            {
                self.getTotalCommentCount(component);
                self.getIdeaComments(component);
            }
        });
        $A.enqueueAction(action);
    },
    
    getTotalCommentCount : function(component) {
        var action = component.get("c.getTotalCommentCount");
        action.setParams({
            ideaId : component.get("v.recordId"),
            zoneId : component.get("v.zoneId")
        });
        
        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.totalCommentCount", actionResult.getReturnValue());            
        });
        $A.enqueueAction(action);
    },
    
    getIdeaComments : function(component) {
        var action = component.get("c.getIdeaComments");
        action.setParams({
            ideaId : component.get("v.recordId"),
            numComments : component.get("v.numComments"),
            zoneId : component.get("v.zoneId")
        });
        
        var self = this;
        action.setCallback(this, function(actionResult) {
            
            var commentsList = actionResult.getReturnValue();
            
            for(var i=0;i<commentsList.length;i++)
            {
                commentsList[i].fromNow = moment.utc(commentsList[i].CreatedDate).fromNow();
            }
            
            
            self.getIdeaCommentVotes(component, commentsList);
        });
        $A.enqueueAction(action);
    },
    
    getIdeaCommentVotes : function(component, commentsList) {
    	var action = component.get("c.getIdeaCommentVotes");
        action.setParams({
            ideaId : component.get("v.recordId"),
            numComments : component.get("v.numComments"),
            zoneId : component.get("v.zoneId")
        });
        
        var self = this;
        action.setCallback(this, function(actionResult) {
            
            var commentVotesMap = actionResult.getReturnValue();
            
            component.set("v.commentVotesMap", commentVotesMap);
            
            for(var i=0;i<commentsList.length;i++)
            {
                if(commentVotesMap[commentsList[i].Id])
                {
                    commentsList[i].likedByUser = true;
                    commentsList[i].voteByUser = commentVotesMap[commentsList[i].Id];
                }
            }
            
            component.set("v.comments", commentsList); 
            
        });
        $A.enqueueAction(action);    
    },
    
    likeComment : function(component, ideaCommentId) {
        var action = component.get("c.likeIdeaComment");

        action.setParams({
            ideaCommentId : ideaCommentId
        });
        
        var self = this;
        action.setCallback(this, function(actionResult) {

            if(actionResult.getState() == 'SUCCESS' && actionResult.getReturnValue()) {

                // refresh comment list
                self.getIdeaComments(component);
            } else {
                var errors = actionResult.getError();
                for(var i=0; i < errors.length; i++) {
	                this.debug(component,'Error: ', errors[i].message);
                }
            }
        });

        $A.enqueueAction(action);
    },
    
    unlikeComment : function(component, ideaCommentVoteId) {
        var action = component.get("c.unlikeIdeaComment");

        action.setParams({
            ideaCommentVoteId : ideaCommentVoteId
        });
        
        var self = this;
        action.setCallback(this, function(actionResult) {

            if(actionResult.getState() == 'SUCCESS' && actionResult.getReturnValue()) {

                // refresh comment list
                self.getIdeaComments(component);
            } else {
                var errors = actionResult.getError();
                for(var i=0; i < errors.length; i++) {
	                this.debug(component,'Error: ', errors[i].message);
                }
            }
        });

        $A.enqueueAction(action);
    },
    
    addComment : function(component) {
        var action = component.get("c.addComment");
        action.setParams({
            ideaId : component.get("v.recordId"),
            commentBody : component.get("v.newComment")
        });
        
        var self = this;
        action.setCallback(this, function(actionResult) {
            if(actionResult.getState() == 'SUCCESS' && actionResult.getReturnValue()) {
                component.set("v.newComment", "");   // clear form
                
                // refresh comment list
				self.getIdeaComments(component);
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