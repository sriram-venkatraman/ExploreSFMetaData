@isTest 
public class testCaseTest {
static testmethod void testLoadData(){ 
List<sObject> ls = Test.loadData(Case.sObjectType,'testCases'); 
List<Case> cList = new List<Case>(); 
 
for(Integer i=0;i<ls.size();i++){ 
cList.add((Case)ls[i]); 
} 
 
System.debug('Case List:'+cList); 
 
for(Case c : cList){ 
String cStatus = c.Status; 
DateTime cDate = c.CreatedDate; 
 
System.debug('Case Id: ' + c.Id); 
System.debug('Case Status: ' + cStatus); 
System.debug('Case Date: ' + cDate); 
} 
 
 
List<sObject> cs = Test.loadData(CaseComment.sObjectType,'testComments'); 
List<CaseComment> ccList = new List<CaseComment>(); 
 
for(Integer i=0;i<cs.size();i++){ 
ccList.add((CaseComment)cs[i]); 
} 
 
System.debug('Case comment List:' + ccList); 
 
for(CaseComment cc: ccList){ 
System.debug('Comment ID: '+cc.Id); 
System.debug('Comment Date: '+cc.CreatedDate); 
 
System.debug('Parent ID:' + cc.parentId); 
} 
} 
}