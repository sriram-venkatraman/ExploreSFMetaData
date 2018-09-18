/**
 * Implement Criteria object on TriggerBeforeUpdate to create a criteria that
 * will be used in a before update context to find Accounts whose OwnerIds changed
 */
public class DataChangedCritera implements TriggerAfterUpdate.Criteria {
    /**
     * The single method in the Criteria interface to implement. Return a list of
     * objects which match the desired criteria, given the trigger context object
     */
    public List<SObject> run(TriggerAfterUpdate.Context currentContext) {
        System.Debug('Entering DataChangedCritera');
        
        List<SObject> resultList = new List<SObject>();
System.Debug('Entering DataChangedCritera 1: ' + currentContext.newList );
         
        // iterate through all changed records, and add accounts
        // whose ownerid's have just changed to the result list
        for(SObject newSObject : currentContext.newList) {
        System.Debug('Entering DataChangedCritera 2: ' + newSObject.get('OwnerId') + ' || ' + currentContext.oldMap.get(newSObject.Id).get('OwnerId'));
            if(newSObject.get('OwnerId') != currentContext.oldMap.get(newSObject.Id).get('OwnerId')) {
                resultList.add(newSObject);
            }
        }
System.Debug('Entering DataChangedCritera 3: ' + resultList );

        // return list of objects which have fulfilled the criteria
        return resultList;
    }
}