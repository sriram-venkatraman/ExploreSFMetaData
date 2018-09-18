@isTest              
global class WebServiceMockImpl implements WebServiceMock {
   global void doInvoke(
           Object stub,
           Object request,
           Map<String, Object> response,
           String endpoint,
           String soapAction,
           String requestName,
           String responseNS,
           String responseName,
           String responseType) {
       onboardingSalesforceCom.getCommissionsResponse respElement = new onboardingSalesforceCom.getCommissionsResponse();
       respElement.return_x = 900.99;
       response.put('response_x', respElement); 
   }
}