public class FieldSetwithCustomSettings {

    private final Account acct;

    public FieldSetwithCustomSettings(ApexPages.StandardController controller) {
//        controller.reset();
//        controller.addFields();
        this.acct = (Account) controller.getRecord();
    }
     
    public String StateFieldSet { get; set; }
    
    public List<String> getFields() {
        if (StateFieldSet == null) {
            return null;
        }
        List <String> s = new List <String>();
        for (Schema.FieldSetMember fsm : Schema.SObjectType.Account.fieldSets.getMap().get(StateFieldSet).getFields()) {
            s.add(fsm.getFieldPath());
        }
        return s;
    }

// Variables to store State and FieldSetName selected by user
    public String FieldSetName { get; set; }
    public String State {get; set;}   

    // Generates State dropdown from State settings
    public List<SelectOption> getStatesSelectList() {
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('', '-- Select One --'));        

        // Find all the States in the custom setting
        Map<String, State_Specific_Field_Sets__c> States = State_Specific_Field_Sets__c.getAll();
        
        // Sort them by name
        List<String> StateNames = new List<String>();
        StateNames.addAll(States.keySet());
        StateNames.sort();
        
        // Create the Select Options.
        for (String StateName : StateNames) {
            State_Specific_Field_Sets__c State = States.get(StateName);
            options.add(new SelectOption(State.Field_Set_Name__c, State.Name));
        }
        return options;
    }
    
}