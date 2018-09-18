({
    doInit : function(component, event, helper) {
        var url = encodeURIComponent(window.location.href);
        component.set("v.currentURL",url);
        helper.isAuthenticated(component);
        helper.get_SitePrefix(component);
        helper.getZoneId(component);
        helper.getPicklistValues(component);
        
        if(component.get("v.useTopics"))
        {
            helper.get_TopicNamesList(component);
        }
        var cmpSpinner = component.find("spinner");
        $A.util.addClass(cmpSpinner, "hide");
        var cmpSpinnerSubmit = component.find("spinnerSubmit");
        $A.util.addClass(cmpSpinnerSubmit, "hide");
        
    },
    
    check_DuplicateIdeas : function(component, event, helper) {
        helper.debug(component,"checking duplicate ideas",null);
        var inputTitleCmp = component.find("title");
        if(inputTitleCmp.get("v.value") && inputTitleCmp.get("v.value").trim() != "")
        {
            var cmpSpinner = component.find("spinner");
            $A.util.removeClass(cmpSpinner, "hide");
            helper.check_DuplicateIdeas(component);
        }
    },
    
    submitIdea : function(component, event, helper) {
        helper.debug(component,"called controller method...",null);
        var currIdea = component.get("v.currIdea");
        var inputDescriptionCmp = component.find("description");
        var isError = false;
        
        var inputTitleCmp = component.find("title");
        
        if(!inputTitleCmp.get("v.value") || inputTitleCmp.get("v.value").trim() == "")
        {
            inputTitleCmp.set("v.errors", [{message:"Please fill out the Title field."}]);
            isError = true;
        }
        else
        {
            inputTitleCmp.set("v.errors",null);
        }
        
        if(!inputDescriptionCmp.get("v.value") || inputDescriptionCmp.get("v.value").trim() == "" )
        {
            inputDescriptionCmp.set("v.errors", [{message:"Please fill out the Description field."}]);
            isError = true;
        }
        else
        {
            inputDescriptionCmp.set("v.errors", null);
        }
        
        if(!isError)
        {
            helper.debug(component,"no error continuing...",null);
            currIdea.Title = inputTitleCmp.get("v.value");
            var zoneid = component.get("v.zoneid");
            currIdea.CommunityId = zoneid;
            helper.debug(component,"zoneid: ", zoneid);
            helper.debug(component,"currIdea.CommunityId : ", currIdea.CommunityId);
            
            helper.submitIdea(component, currIdea,null, null);
            
        }
    }
})