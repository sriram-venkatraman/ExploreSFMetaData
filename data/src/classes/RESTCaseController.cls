@RestResource(urlMapping='/FieldCase/*')
global with sharing class RESTCaseController {

@HttpPost
  global static List<Case> createNewCase(String CompanyId) {
     List<Case> cases = [Select CaseNumber, Reason, Type, Subject, Priority, Status from Case where AccountId = :CompanyId];
     RestResponse res = RestContext.response;
     //res.statusCode = 400;
     return cases;
  }
}