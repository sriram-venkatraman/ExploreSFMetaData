trigger Opportunity_History_Tracker on Opportunity (after update, after insert) {
    SObjectType optyType = Schema.getGlobalDescribe().get('Opportunity');
    Map<String, Schema.SObjectField> mfields = optyType.getDescribe().fields.getMap();
    
    if (Trigger.isUpdate) { 
        for (Opportunity opty : Trigger.New) {
            for (String key : mfields.keyset()) {
                if (key != 'systemmodstamp' && key != 'lastmodifieddate' && key != 'lastmodifiedbyid' && key != 'createddate' && key != 'createdbyid') {
                    if (opty.get(key) != Trigger.oldMap.get(opty.Id).get(key)) {
                        Audit_History__c ah = new Audit_History__c();
                        ah.Change_Date_Time__c = (DateTime) opty.get('LastModifiedDate');
                        ah.Changed_By__c = (Id) opty.get('LastModifiedById');
                        ah.Field__c = mfields.get(key).getDescribe().getLabel();
                        ah.New_Value__c = String.valueOf(opty.get(key));
                        ah.Old_Value__c = String.valueOf(Trigger.oldMap.get(opty.Id).get(key));
                        ah.Type__c = 'Opportunity';
                        ah.Opportunity__c = (Id) opty.get('Id');
                        insert ah;
                        System.Debug('Quote Changed: Field [' + key + '] Changed from [' + Trigger.oldMap.get(opty.Id).get(key) + '] to [' + opty.get(key) + ']');
                    }
                }
            }            
        }
    }

    if (Trigger.isInsert) { 
        for (Opportunity opty : Trigger.New) {
            for (String key : mfields.keyset()) {
                Audit_History__c ah = new Audit_History__c();
                ah.Change_Date_Time__c = (DateTime) opty.get('LastModifiedDate');
                ah.Changed_By__c = (Id) opty.get('LastModifiedById');
                ah.New_Value__c = 'Creating new record';
                ah.Type__c = 'Opportunity';
                ah.Opportunity__c = (Id) opty.get('Id');
                insert ah;
            }            
        }
    }
}