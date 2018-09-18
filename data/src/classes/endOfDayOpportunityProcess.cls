public class endOfDayOpportunityProcess {
    public Double comm;
    public void sendOptys(String optyNum, String acctNum) {
        onboardingSalesforceCom.GetCommisionsPort stub = new onboardingSalesforceCom.GetCommisionsPort();
        
        comm = stub.getCommissions(optyNum, acctNum);

        System.Debug('Commission: ' + comm);
    }
}