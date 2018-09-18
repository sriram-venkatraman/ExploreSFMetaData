trigger OpportunityLineItem_Trigger on OpportunityLineItem (after insert, after delete) {
    
    //To store list of opportunity ids from the trigger
    list<id> oppIds = new list<id>();
   
    if (Trigger.isDelete) {
        for (OpportunityLineItem oli : Trigger.old) {
            oppIds.add(oli.opportunityid);
        }
    }
    else {        
        for (OpportunityLineItem oli : Trigger.new) {
            oppIds.add(oli.opportunityid);
        }
    }
    
    String productList;
    list <Opportunity> opps = [SELECT Id, Product_List__c, (select PriceBookEntry.Product2.Name FROM OpportunityLineItems) from Opportunity where id in :oppIds];
    
    for(Opportunity opp : opps ) {
        productList = '';
        for (OpportunityLineItem oli: opp.OpportunityLineItems) {
            if (!productList.contains('_' + oli.PriceBookEntry.Product2.Name + '_'))
                productList = productList + '_' + oli.PriceBookEntry.Product2.Name + '_';
        } 
        
        opp.Product_List__c = '_' + productList + '_';
    }

    update opps;
}