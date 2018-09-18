public with sharing class findDuplicateAccounts {

    public String dateMsg { get; set; }

    public PageReference doDateValidation() {
        try {
            dateMsg = '';
            if (PersonAccount.SSN__pc != null) date.parse(PersonAccount.SSN__pc);
        } 
        catch (Exception e) {
            dateMsg = e.getMessage();
        }
        return null;
    }

    public String addressMsg {get; set;}

    public PageReference doAddressValidation() {
        addressMsg = 'Validated';
        return null;
    }

    public PageReference pickThisAccount() {
        return new PageReference('/' + currentAccountId);
    }

    private Account PersonAccount;
    public Boolean clickedFind {get; set;}
    public String currentAccountId {get; set;}

    public Account getPersonAccount() {
        if (PersonAccount == null) {
            PersonAccount = new Account(RecordTypeId = [SELECT Id FROM RecordType WHERE SobjectType='Account' AND IsPersonType=True limit 1][0].Id);
        }
        return PersonAccount;
    }


    public PageReference save() {
        insert PersonAccount;
        
        return new PageReference('/' + PersonAccount.Id + '/e?retURL=%2F' + PersonAccount.Id);
    }

    public ApexPages.StandardSetController setAcct {
        get {
            if (clickedFind == null) clickedFind = false;
           
            //if (clickedFind)  {
                String theSOQL = 'select id, firstname, lastname, phone, personbirthdate, billingstate, billingpostalcode, ssn__pc from account where ';
                
                if (personaccount.ssn__pc != null) {
                    theSOQL = theSOQL + '(ssn__pc = \'' + personaccount.ssn__pc + '\')';
                }
                else {
                    if (PersonAccount.firstname != '' && PersonAccount.lastname != '') {
                        theSOQL = theSOQL + '(firstname like \'' + PersonAccount.firstname + '%\' and lastname like \'' + PersonAccount.lastname + '%\')';
                    }
                    else {
                        if (String.valueof(PersonAccount.personbirthdate) != '') {
                            theSOQL = theSOQL + '(personbirthdate = ' + String.valueof(PersonAccount.personbirthdate) + ')';
                        }
                    }
                }

                system.debug('God: ' + theSOQL);
                
                setAcct = new ApexPages.StandardSetController(Database.getQueryLocator(theSOQL));
                
                setAcct.setpagesize(5);
            //} 
            //clickedFind = false;
            return setAcct;
        }
        set;
    }

    // Initialize setAcct and return a list of records
    public List<Account> getAccounts() {
        if (setAcct != null) {
            return (List<Account>) setAcct.getRecords();
        }
        else {
            return null;
        }
    }

}