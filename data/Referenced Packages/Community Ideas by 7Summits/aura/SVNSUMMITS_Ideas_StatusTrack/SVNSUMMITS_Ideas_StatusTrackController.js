({
    doInit : function(component, event, helper) {
        var url = encodeURIComponent(window.location.href);
        component.set("v.currentURL",url);
        helper.getZoneId(component);
        helper.get_SitePrefix(component);
        helper.isAuthenticated(component);
        
        helper.getPicklistValues(component);
    }
    
   
})