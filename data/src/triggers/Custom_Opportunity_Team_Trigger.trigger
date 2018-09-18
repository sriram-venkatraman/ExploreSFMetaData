trigger Custom_Opportunity_Team_Trigger on Opportunity (after update) {

    Set<String> teamoptyIds = new Set<String>();
    List<String> optyTeams = new List<String>();
    
    for( Opportunity opty : Trigger.new )
    {
      if( Trigger.oldMap.get( opty.Id ).Deal_Support_Teams__c != Trigger.newMap.get( opty.Id ).Deal_Support_Teams__c && Trigger.newMap.get( opty.Id ).Deal_Support_Teams__c != null)
      {
        teamoptyIds.add(opty.Id);
        String[] teams = Trigger.newMap.get( opty.Id ).Deal_Support_Teams__c.split(',');
        for (String t: teams) {
            optyTeams.add(t.substring(1,t.length()-1));
        }
      }
    }

    List<Custom_Opportunity_Team_Member__c> cotms = [select Id, Custom_Opportunity_Team__r.Name, Team_Member__c, Team_Role__c from Custom_Opportunity_Team_Member__c where Custom_Opportunity_Team__r.Name in :optyTeams];

    for (Custom_Opportunity_Team_Member__c cotm: cotms) {
        System.Debug('Member: ' + cotm.Team_Member__c + '; Role: ' + cotm.Team_Role__c);
    }
    
    List<OpportunityTeamMember> lstOppTeams = new List<OpportunityTeamMember>();
    for( Opportunity opty : Trigger.new )
    {
      if( Trigger.oldMap.get( opty.Id ).Deal_Support_Teams__c != Trigger.newMap.get( opty.Id ).Deal_Support_Teams__c && Trigger.newMap.get( opty.Id ).Deal_Support_Teams__c != null)
      {
        for (Custom_Opportunity_Team_Member__c cotm: cotms) 
        {
            if (Trigger.newMap.get( opty.Id ).Deal_Support_Teams__c.contains('_' + cotm.Custom_Opportunity_Team__r.Name + '_')) 
            {
                OpportunityTeamMember otm = new OpportunityTeamMember(
                   TeamMemberRole = cotm.Team_Role__c,
                   OpportunityId = opty.Id,
                   UserId        = cotm.Team_Member__c);
                lstOppTeams.add(otm);
            }
        }
      }
    }
    
    // Insert Opportunity Team
    if (!lstOppTeams.isEmpty()) {
        try {
            insert lstOppTeams;        
        } catch(DmlException e) {
            System.debug('The following exception has occurred: ' + e.getMessage());
        }
    }
}