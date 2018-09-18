public with sharing class CustomLogACall {

    public PageReference redirect() {
        Task t = new Task();
        t.WhoId = ApexPages.currentPage().getParameters().get('LeadId');
        t.Phone_Used__c = '(862) 258-3362';
        //t.Email = 'God@heaven.com';
        Insert t;
        
        PageReference pageRef = new PageReference('/' + t.Id + '/e?retURL=/' + ApexPages.currentPage().getParameters().get('LeadId'));
        
        return pageRef;
    }

}