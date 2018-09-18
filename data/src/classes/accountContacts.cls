public class accountContacts {
    public List<accountView> theAVList;
    
    public PageReference setAccountViewSOQL() {
        return null;
    }
    public String prevAccountViewName { get; set; }
    public String currentAccountViewName { get; set; }
    public String currentAccountViewSOQL { 
        get; 
        set {
            //system.debug('God is great: ' + value);
            currentAccountViewSOQL = value; 
        }
    }
    public List<String> currentAccountViewCols { get; set; }

    public String prevAccountId {get;set;}
    public String currentAccountId {get;set;}
    public String currentAccountName { get; set; }
    public Boolean accountHasContacts { 
        get {
            return (getContacts().size() > 0);
        }
        set; 
    }

    public PageReference setCurrentAccountId() { 
        //system.debug ('God: ' + currentAccountId);       
        return null;
    }

    public ApexPages.StandardSetController setAcct {
        get {
            system.debug('God -prevAccountViewName : ' + prevAccountViewName);
            system.debug('God -currentAccountViewName : ' + currentAccountViewName);
            system.debug('God -currentAccountViewSOQL : ' + currentAccountViewSOQL);
            if (currentAccountViewSOQL != null && (prevAccountViewName != currentAccountViewName)) {
                setAcct = new ApexPages.StandardSetController(Database.getQueryLocator(currentAccountViewSOQL));
                
                for (accountView av : theAVList) {
                    if (av.Name == currentAccountViewName) currentAccountViewCols = av.Fields;
                }
                
                        
                prevAccountViewName = currentAccountViewName;
                setAcct.setpagesize(5);
                //system.debug('Sriram: ' + currentAccountViewCols.size());
                //for (String s : currentAccountViewCols) system.debug('Sriram: ' + s);
            } 
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

    public ApexPages.StandardSetController setCon {
        get {
            if(setCon == null || prevAccountId != currentAccountId) {
                setCon = new ApexPages.StandardSetController(Database.getQueryLocator([select name, mobilephone, AccountId from Contact where AccountId = :currentAccountId]));
                prevAccountId = currentAccountId;
                setCon.setpagesize(5);
            }
            return setCon;
        }
        set;
    }

    // Initialize setCon and return a list of records
   
    public List<Contact> getContacts() {
         return (List<Contact>) setCon.getRecords();
    }
   
    public class accountView {
        public String Name {get; set;}
        public String SOQL {get; set;}
        public List<String> Fields {get; set;}
        
        public accountView(String n, String s, List<String> f) {
            this.Name = n;
            this.SOQL = s;
            this.Fields = f;
        }
    }   

    public List<accountView> getAccountViews() {

        Map<String, String> lv = new Map<String, String>();
        Map<String, List<String>> lvcols = new Map<String, List<String>>();
        List<String> curlvcols = new List<String>();
        List<accountView> avl = new List<accountView>();
        accountView av;
        
        //currentAccountViewCols = new List<String>();
        
        HttpRequest req = new HttpRequest();
        req.setEndpoint(URL.getSalesforceBaseUrl().toExternalForm() + '/services/data/v32.0/sobjects/Account/listviews');
        req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
        req.setMethod('GET');
        Http http = new Http();
        HTTPResponse res;
        try {
            res = http.send(req);  
        } 
        catch(System.CalloutException e) {
            //system.debug('Callout Error: ' + e.getMessage());
        }
        
        // Parse JSON response
        JSONParser parser = JSON.createParser(res.getBody());
        String describeURL;
        
        while (parser.nextToken() != null) {
            if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && (parser.getText() == 'describeUrl')) {
                // Get the value.
                parser.nextToken();
                
                // Get describe url.
                
                describeURL = parser.getText();
                while (parser.nextToken() != null && !((parser.getCurrentToken() == JSONToken.FIELD_NAME) && (parser.getText() == 'label'))) {
                }

                if (parser.getText() == 'label') {
                    if (parser.nextToken() != null) {
                        lv.put(parser.getText(), describeURL);
                    }
                }
            }
        }
        
        for (String s : lv.keySet()) {
            req = new HttpRequest();
            req.setEndpoint(URL.getSalesforceBaseUrl().toExternalForm() + lv.get(s));
            req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
            req.setMethod('GET');
            http = new Http();
            try {
                res = http.send(req);  
            } 
            catch(System.CalloutException e) {
                //system.debug('Callout Error: ' + e.getMessage());
            }

            curlvcols = new List<String>();

            // Parse JSON response 
            parser = JSON.createParser(res.getBody());
            Boolean hidden = false;
            while (parser.nextToken() != null) {
                if (parser.getCurrentToken() == JSONToken.FIELD_NAME && parser.getText() == 'columns') {
                    while (parser.nextToken() != null && parser.getCurrentToken() != JSONToken.END_ARRAY) {
                        if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && (parser.getText() == 'hidden')) {
                            parser.nextToken();
                            hidden = (parser.getText() == 'true');
                        }

                        if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && (parser.getText() == 'fieldNameOrPath')) {
                            parser.nextToken();
                            if (!hidden) curlvcols.add(parser.getText());
                        }
                    }
                }
        
                if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && (parser.getText() == 'query')) {
                    // Get the Query.
                    parser.nextToken();
                    lv.put(s, parser.getText());
                    lvcols.put(s, curlvcols);
                }
            }      
        }
        
        for (String s : lv.keySet()) {
            //system.debug('Key: ' + s + '; Value: ' + lv.get(s));
            avl.add(new accountView(s, lv.get(s), lvcols.get(s)));
        }
        
        for (accountView avlx : avl) {
            //system.debug('Meow: ' + avlx.Name + '; ' + avlx.SOQL);
            //for (String f : avlx.Fields) system.debug('    Fields: ' + f);
        }
        
        theAVList = avl;
        return avl;
    }
}