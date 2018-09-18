({
    doInit : function(component, event, helper) {

        var url = window.location.href;
        component.set("v.currentURL",encodeURIComponent(url));

        var topicValue = url.split("/").pop();

        topicValue = decodeURIComponent(topicValue);
        topicValue = topicValue.replace(/#/g , "");

        if(component.get("v.filterOn") == 'Topic')
        {
        	component.set("v.topicValue",topicValue);
        }

        if(component.get("v.filterOn") == 'Search Term')
        {
            component.set("v.searchTermValue",topicValue);
        }

        var cmpSpinner = component.find("spinner");
        $A.util.addClass(cmpSpinner, "hide");

        helper.isAuthenticated(component);

        helper.getUserId(component);
        helper.get_SitePrefix(component);
        helper.getZoneId(component);
        helper.getPicklistValues(component);
    },
    
    handleSortChange : function(component, event, helper) {
        component.set("v.ideaListWrapper.ideaList",null);
        var cmpSpinner = component.find("spinner");
        $A.util.removeClass(cmpSpinner, "hide");

        var sortByCmp = component.find("sortByInput");
        component.set("v.sortBy",sortByCmp.get("v.value"));
        helper.getIdeasList(component);
		
    },

    getNextPage : function(component, event, helper) {
        helper.debug(component,"nextPage called", null);
        component.set("v.ideaListWrapper.ideaList",null);
        var cmpSpinner = component.find("spinner");
        $A.util.removeClass(cmpSpinner, "hide");
        helper.getNextPage(component, event);

    },

    getPreviousPage : function(component, event, helper) {
        helper.debug(component,"previousPage called",null);
        component.set("v.ideaListWrapper.ideaList",null);
        var cmpSpinner = component.find("spinner");
        $A.util.removeClass(cmpSpinner, "hide");
        helper.getPreviousPage(component, event);

    },

    updateCategories : function(component,event,helper){
        component.set("v.ideaListWrapper.ideaList",null);

        var cmpSpinner = component.find("spinner");
        $A.util.removeClass(cmpSpinner, "hide");

        var cmpCategoriesFilter = component.find("categoriesFilter");
        var selectedCategories = cmpCategoriesFilter.get("v.value");

        component.set("v.categories", selectedCategories);

        helper.getIdeasList(component);

    },

    handle_VoteUp : function(component,event,helper) {
        var linkCmp = event.currentTarget;
        var ideaId = linkCmp.dataset.recordid;

        helper.submitVote(component,event,ideaId,"Up");
    },

    handle_VoteDown : function(component,event,helper) {
        var linkCmp = event.currentTarget;
        var ideaId = linkCmp.dataset.recordid;

        helper.submitVote(component,event,ideaId,"Down");
    }
})