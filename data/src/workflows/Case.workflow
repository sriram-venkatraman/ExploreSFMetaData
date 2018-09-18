<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <fieldUpdates>
        <fullName>Update_Open_Opportunities_at_Case_Create</fullName>
        <description>Update Open Opportunities at Case Creation</description>
        <field>Open_Opportunities_When_Case_Created__c</field>
        <formula>Account.Open_Opportunities__c</formula>
        <name>Update Open Opportunities at Case Create</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Get Open Opportunities When Case Created</fullName>
        <actions>
            <name>Update_Open_Opportunities_at_Case_Create</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Get Open Opportunities When Case Created</description>
        <formula>ISNEW() || ISCHANGED( AccountId )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
</Workflow>
