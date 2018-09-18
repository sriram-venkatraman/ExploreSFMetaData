<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Email_Approved_Opportunity</fullName>
        <description>Email Approved Opportunity</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/Opportunity_Approved_Template</template>
    </alerts>
    <alerts>
        <fullName>Email_Deal_Support_Team</fullName>
        <description>Email Deal Support Team</description>
        <protected>false</protected>
        <recipients>
            <recipient>Deal Support</recipient>
            <type>opportunityTeam</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/Opportunity_Approval_Template</template>
    </alerts>
    <alerts>
        <fullName>Email_Rejected_Opportunity</fullName>
        <description>Email Rejected Opportunity</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/Opportunity_Rejected_Template</template>
    </alerts>
    <fieldUpdates>
        <fullName>Check_Management_Approval_Flag</fullName>
        <field>Management_Approval__c</field>
        <literalValue>1</literalValue>
        <name>Check Management Approval Flag</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Cumulate_Amount_Change</fullName>
        <field>Cumulative_Change_of_Amount__c</field>
        <formula>NULLVALUE(Cumulative_Change_of_Amount__c,0) + (Amount -  PRIORVALUE(Amount))</formula>
        <name>Cumulate Amount Change</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Increment_Amount_Change_Count</fullName>
        <field>No_of_times_Amount_Changed__c</field>
        <formula>NULLVALUE(No_of_times_Amount_Changed__c,0) + 1</formula>
        <name>Increment Amount Change Count</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Populate_Opportunity_Owner_Manager_Email</fullName>
        <field>Owner_Manager_Email_Address__c</field>
        <formula>Owner.Manager.Email</formula>
        <name>Populate Opportunity Owner Manager Email</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Uncheck_Management_Approval_Flag</fullName>
        <field>Management_Approval__c</field>
        <literalValue>0</literalValue>
        <name>Uncheck Management Approval Flag</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Deal_Support_Team_Alpha</fullName>
        <field>Deal_Support_Teams__c</field>
        <formula>IF( CONTAINS(Deal_Support_Teams__c, &quot;_Big Deal Support - Team Alpha_&quot;), Deal_Support_Teams__c, IF(ISBLANK( Deal_Support_Teams__c ), &quot;&quot;, Deal_Support_Teams__c &amp; &quot;,&quot;) &amp; &quot;_Big Deal Support - Team Alpha_&quot;)</formula>
        <name>Update Deal Support Team Alpha</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Deal_Support_Team_Gamma</fullName>
        <field>Deal_Support_Teams__c</field>
        <formula>IF( CONTAINS(Deal_Support_Teams__c, &quot;_Big Deal Support - Team Gamma_&quot;), Deal_Support_Teams__c, IF(ISBLANK( Deal_Support_Teams__c ), &quot;&quot;, Deal_Support_Teams__c &amp; &quot;,&quot;) &amp; &quot;_Big Deal Support - Team Gamma_&quot;)</formula>
        <name>Update Deal Support Team Gamma</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <outboundMessages>
        <fullName>PublishOpportunity</fullName>
        <apiVersion>33.0</apiVersion>
        <endpointUrl>http://intg-playground.herokuapp.com/sfdc/omlistener/endpoint/b16feaa1-0b01-4c68-aebf-6946eb482c3e</endpointUrl>
        <fields>Id</fields>
        <fields>IsWon</fields>
        <fields>Name</fields>
        <includeSessionId>true</includeSessionId>
        <integrationUser>sriram.venkatraman@testco.com</integrationUser>
        <name>PublishOpportunity</name>
        <protected>false</protected>
        <useDeadLetterQueue>false</useDeadLetterQueue>
    </outboundMessages>
    <rules>
        <fullName>Big Deal Support - Team Alpha</fullName>
        <actions>
            <name>Update_Deal_Support_Team_Alpha</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>Opportunity.ForecastCategoryName</field>
            <operation>equals</operation>
            <value>Commit</value>
        </criteriaItems>
        <criteriaItems>
            <field>Opportunity.Type</field>
            <operation>equals</operation>
            <value>New Business</value>
        </criteriaItems>
        <criteriaItems>
            <field>Opportunity.Amount</field>
            <operation>greaterOrEqual</operation>
            <value>&quot;USD 1,000,000&quot;</value>
        </criteriaItems>
        <criteriaItems>
            <field>Opportunity.Product_List__c</field>
            <operation>contains</operation>
            <value>_Finance Management_,_GenWatt Diesel 200kW_</value>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Big Deal Support - Team Gamma</fullName>
        <actions>
            <name>Update_Deal_Support_Team_Gamma</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>Opportunity.ForecastCategoryName</field>
            <operation>equals</operation>
            <value>Commit</value>
        </criteriaItems>
        <criteriaItems>
            <field>Opportunity.Type</field>
            <operation>equals</operation>
            <value>New Business</value>
        </criteriaItems>
        <criteriaItems>
            <field>Opportunity.Amount</field>
            <operation>greaterOrEqual</operation>
            <value>&quot;USD 1,000,000&quot;</value>
        </criteriaItems>
        <criteriaItems>
            <field>Opportunity.Product_List__c</field>
            <operation>contains</operation>
            <value>_SLA: Bronze__SLA: Silver_</value>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Populate Opportunity Owner Manager Email</fullName>
        <actions>
            <name>Populate_Opportunity_Owner_Manager_Email</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Opportunity.OwnerId</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>PublishOpportunityOrder</fullName>
        <actions>
            <name>PublishOpportunity</name>
            <type>OutboundMessage</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Opportunity.StageName</field>
            <operation>equals</operation>
            <value>Closed Won</value>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Reset Management Approval Flag</fullName>
        <actions>
            <name>Uncheck_Management_Approval_Flag</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When Opportunity Amount Changes reset this flag</description>
        <formula>ISCHANGED(Amount)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Track Amount Changes</fullName>
        <actions>
            <name>Cumulate_Amount_Change</name>
            <type>FieldUpdate</type>
        </actions>
        <actions>
            <name>Increment_Amount_Change_Count</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Track cumulative amount and no. of times Amount changes</description>
        <formula>(NOT ISNEW()) &amp;&amp; ISCHANGED(Amount)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <tasks>
        <fullName>Check</fullName>
        <assignedToType>owner</assignedToType>
        <dueDateOffset>-7</dueDateOffset>
        <notifyAssignee>false</notifyAssignee>
        <offsetFromField>Opportunity.CloseDate</offsetFromField>
        <priority>Normal</priority>
        <protected>false</protected>
        <status>Not Started</status>
        <subject>Check</subject>
    </tasks>
</Workflow>
