/**
 * implement Action object on TriggerBeforeUpdate which sets the OwnerId
 * of all Contact records associated with an Account to the Account's OwnerId
 */
public class PublishDataChangeAction implements TriggerAfterUpdate.Action { 

    /**
     * The single method in the Criteria interface to implement. Provides a trigger
     * context and a list of SObjects which matched the MicroTrigger criteria.
     * Returns true if action has been completed successfully
     */
    public Boolean run(TriggerAfterUpdate.Context currentContext, List<SObject> scope) {
        System.Debug('Entering PublishDataChangeAction');

        try {
            List<Id> ownerIds = new List<Id>();
            for (SObject theObject : scope) {
                ownerIds.add((Id)theObject.get('OwnerId')); 
            }
            Map<Id, User> owners = new Map<Id, User>([SELECT Id, Name FROM User WHERE Id in :ownerIds]);
            JSONGenerator gen = JSON.createGenerator(true);
            
            // change contact ownerid's to account's ownerid
            for(SObject theObject : scope) {
                // Write data to the JSON string.
                gen.writeStartObject();
                    gen.writeStringField('sobject', (String)theObject.getSObjectType().getDescribe().getName());
                    gen.writeStringField('id', (String)theObject.get('Id'));
                    gen.writeStringField('name', (String)theObject.get('Name'));
                    gen.writeStringField('owner', owners.get((Id)theObject.get('OwnerId')).Name);
                gen.writeEndObject();
        
            }
    
            // Get the JSON string.
            String pretty = gen.getAsString();
            
            // Create an instance of the event and store it in the newsEvent variable
            Data_Change_Event__e changeEvent = new Data_Change_Event__e(Data__c=pretty);
            
            // Call method to publish events
            Database.SaveResult sr = EventBus.publish(changeEvent);
            
            // Inspect publishing result 
            if (sr.isSuccess()) {
                System.debug('Successfully published event.');
            } else {
                for(Database.Error err : sr.getErrors()) {
                    System.debug('Error returned: ' +
                                 err.getStatusCode() +
                                 ' - ' +
                                 err.getMessage());
                }
                return false;
            }

        } catch (Exception e) {
            System.assert(false,e);
            return false;
        }   

        // if we got here everything worked so return true
        return true;
    }
}