public class historyViewer {
    public ApexPages.StandardSetController setHistory {
        get {
            if (setHistory == null) {
                String theSOQL = 'SELECT (select Id, IsDeleted, OpportunityId, CreatedById, CreatedDate, Field, OldValue, NewValue FROM OpportunityFieldHistories) from opportunity';
                List <Opportunity> ofh = [select (select Id, IsDeleted, OpportunityId, CreatedById, CreatedDate, Field, OldValue, NewValue FROM histories) from opportunity where id = '006j0000003j6eU'];

                setHistory = new ApexPages.StandardSetController(ofh);
                setHistory.setpagesize(5);
            }
            return setHistory;
        }
        set;
    }

    // Initialize setAcct and return a list of records
    public List<Opportunity> getHistories() {
        if (setHistory != null) {
            return (List<Opportunity>) setHistory.getRecords();
        }
        else {
            return null;
        }
    }
}