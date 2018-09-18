<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <fieldUpdates>
        <fullName>Update_Custom_Date_of_Birth</fullName>
        <field>Date_of_Birth__c</field>
        <formula>TEXT(MONTH(Birthdate)) &amp; &quot;/&quot; &amp; TEXT(DAY(Birthdate)) &amp; &quot;/&quot; &amp; TEXT(YEAR(Birthdate))</formula>
        <name>Update Custom Date of Birth</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Update Custom Date of Birth</fullName>
        <actions>
            <name>Update_Custom_Date_of_Birth</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <formula>ISCHANGED( Birthdate )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
</Workflow>
