public class exampleCon {

    public String getStateG() {
        return stateG;
    }

    public void setStateG(string value) {
        stateG = value;
    }

    String uname;

    public String getUsername() {
        return uname;
    }
            
    public PageReference sayHello() {
        uname = UserInfo.getName();
        return null;
    }
            
    public void setState(String n) {
        state = n;
    }
            
    public String getState() {
        return state;
    }
            
    public PageReference methodOne() {
        return null;
    }
            
    private String state = 'no';
    private String stateG = 'no';
}