public class mySOSLTest {

    public static void runSOSL() {
        String str = 'FIND {salesforce} IN ALL FIELDS RETURNING Account(Name,Description) WITH HIGHLIGHT';
        
        List<List<SObject>> result = search.query(str);
        
        System.debug('Output: ' + JSON.serializePretty(result));
    }
}