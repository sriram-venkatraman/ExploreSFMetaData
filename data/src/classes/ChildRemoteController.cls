global with sharing class ChildRemoteController {
    @RemoteAction
    global static String sayHello(String helloTo) {
        return 'Hello ' + helloTo + ' from the Grandparent.';
    }
}