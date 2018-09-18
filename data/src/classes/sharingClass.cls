public with sharing class sharingClass {

    
    class  noSharing {
	    Account a = [select id, name from account limit 1];
    }

}