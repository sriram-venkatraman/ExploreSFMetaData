@isTest
public class Sriram_Test {

    public static testmethod void testAccountCallout() {
        Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

        endOfDayOpportunityProcess x = new endOfDayOpportunityProcess();

        x.sendOptys('opty', 'acct');
        
        System.AssertNotEquals(null, x.comm);   
        
    }
}