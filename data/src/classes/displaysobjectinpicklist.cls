public class displaysobjectinpicklist
    {
    public String val {get;set;}
    public Map <String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
    public string forquery;
    public set<string>flds{get;set;}
    public list<string> fieldapiname{get;set;}
    public list<sobject> objectforquery{get;set;}
    public displaysobjectinpicklist ()
    {   
        val='Contact';
        objectforquery=new list<sobject>();
        flds=new set<string>();
        fieldapiname=new list<string>();
        createquery();
    }

    public List<SelectOption> getName()
    {
 
        List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();    
        List<SelectOption> options = new List<SelectOption>();
       
 
        for(Schema.SObjectType f : gd)
        {
            options.add(new SelectOption(f.getDescribe().getName(),f.getDescribe().getLabel()));
            System.debug('@@@@@@@@@@@@@@@@f.getDescribe().getName()'+f.getDescribe().getName());
        }
        return options;
    }
 
    public void createquery()
    {
        system.debug('@@@@@@ val'+val);
        if(val.length()>0)
        {
            fieldapiname=new list<string>();
            forquery=null;
            Map<string,Schema.SObjectField> mpConField=schemaMap.get(val).getDescribe().fields.getMap();
            flds=mpConField.keySet();
            for(String name : flds)
            {
                Schema.DescribeFieldResult fldResult=mpConField.get(name).getDescribe();
                if(string.valueof(fldResult.getName())!='Jigsaw' && string.valueof(fldResult.getName())!='JigsawContactId' &&  string.valueof(fldResult.getName())!='Address' )
                fieldapiname.add(string.valueof(fldResult.getName()));
                if(forquery==null)
                {
                    forquery=string.valueof(fldResult.getName());
                   
                }
                else
                {
                    forquery=forquery+','+string.valueof(fldResult.getName());
                }
            }
        fieldapiname.sort();
        string finalquery='select '+forquery + ' from '+val+' limit 1000 ';
        system.debug('query text'+forquery+'@@Final query'+  finalquery);
        objectforquery=Database.query(finalquery);
        system.debug('!!!! after query '+objectforquery );
       
        }
    }
 
}