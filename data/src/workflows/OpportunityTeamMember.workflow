<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <rules>
        <fullName>Opportunity Team Member</fullName>
        <active>false</active>
        <criteriaItems>
            <field>OpportunityTeamMember.TeamMemberRole</field>
            <operation>equals</operation>
            <value>Sales Rep</value>
        </criteriaItems>
        <triggerType>onCreateOnly</triggerType>
    </rules>
</Workflow>
