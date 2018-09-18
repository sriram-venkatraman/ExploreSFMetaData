/**
 * implement Action object on TriggerBeforeUpdate which sets the OwnerId
 * of all Contact records associated with an Account to the Account's OwnerId
 */
public class ContactsChangeOwnerIdAction implements TriggerBeforeUpdate.Action {
    /**
     * The single method in the Criteria interface to implement. Provides a trigger
     * context and a list of SObjects which matched the MicroTrigger criteria.
     * Returns true if action has been completed successfully
     */
    public Boolean run(TriggerBeforeUpdate.Context currentContext, List<SObject> scope) {
        Set<Id> accountIds = (new Map<Id,SObject>(scope)).keySet();
        // query for contacts with given account id's
        List<Contact> allTheContacts = [
            SELECT AccountId from Contact where AccountId in :accountIds
        ];

        // change contact ownerid's to account's ownerid
        for(SObject theObject : scope) {
            Account theAccount = (Account) theObject;
            for(Contact theContact : allTheContacts) {
                if(theAccount.Id == theContact.AccountId) {
                    theContact.OwnerId = theAccount.OwnerId;
                }
            }
        }

        // try to update contacts. If fail, print error to debug log and return false
        try {
            update allTheContacts;
        } catch (Exception e) {
            System.assert(false,e);
            return false;
        }   

        // if we got here everything worked so return true
        return true;
    }
}