({
    doInit : function(component, event, helper) {       
        //helper.loadRecordId(component);
        helper.isAuthenticated(component);
        helper.isNicknameDisplayEnabled(component);
        helper.getZoneId(component);
        helper.get_SitePrefix(component);
        
    },
    
    // don't ask me why, but addComment is a reserved word and won't work. I tried...for a long time
    addComment2 : function(component, event, helper) {
        
        var inputnewCommentCmp = component.find("newComment");
        
        if(!inputnewCommentCmp.get("v.value") || inputnewCommentCmp.get("v.value").trim() == "")
        {
            inputnewCommentCmp.set("v.errors", [{message:"Please fill out the Comment field."}]);
        }
        else
        {
            helper.addComment(component);
        }
    },
    
    likeComment : function(component, event, helper) {
        var linkCmp = event.currentTarget;
        var ideaCommentId = linkCmp.dataset.recordid;
        helper.likeComment(component, ideaCommentId);
    },
    
    unlikeComment : function(component, event, helper) {
        var linkCmp = event.currentTarget;
        var ideaCommentVoteId = linkCmp.dataset.recordid;
        helper.unlikeComment(component, ideaCommentVoteId);
    }
    
})