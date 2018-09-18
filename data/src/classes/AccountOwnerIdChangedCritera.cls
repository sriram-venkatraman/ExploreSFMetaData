/**
 * Implement Criteria object on TriggerBeforeUpdate to create a criteria that
 * will be used in a before update context to find Accounts whose OwnerIds changed
 */
public class AccountOwnerIdChangedCritera implements TriggerBeforeUpdate.Criteria {
    /**
     * The single method in the Criteria interface to implement. Return a list of
     * objects which match the desired criteria, given the trigger context object
     */
    public List<SObject> run(TriggerBeforeUpdate.Context currentContext) {
        List<Account> resultList = new List<Account>();
 
        // iterate through all changed records, and add accounts
        // whose ownerid's have just changed to the result list
        for(SObject newObject : currentContext.newList) {
            Account newAccount = (Account) newObject;
            Account oldAccount = (Account) currentContext.oldMap.get(newAccount.Id);
            if(newAccount.OwnerId != oldAccount.OwnerId) {
                resultList.add(newAccount);
            }
        }
        // return list of objects which have fulfilled the criteria
        return resultList;
    }
}