({
	doInit : function(component, event, helper) { 
        var url = encodeURIComponent(window.location.href);
        component.set("v.currentURL",url);
        helper.get_SitePrefix(component);
        helper.getZoneId(component);
        helper.isAuthenticated(component);
	},
    
    voteUp : function(component, event, helper) {
        helper.vote(component, true);
    },
    
    voteDown : function(component, event, helper) {
        helper.vote(component, false);
    }
})