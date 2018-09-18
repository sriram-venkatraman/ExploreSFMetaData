({
    doInit : function(component, event, helper) {     
        var url = encodeURIComponent(window.location.href);
        component.set("v.currentURL",url);
        helper.isAuthenticated(component);
        helper.isNicknameDisplayEnabled(component);
        helper.get_SitePrefix(component);
        helper.getZoneId(component);
        helper.getTotalVoterCount(component);
        helper.getIdeaVoters(component);
    },
})