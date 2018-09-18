({
    /**
    * Webkul Software.
    *
    * @category  Webkul
    * @author    Webkul
    * @copyright Copyright (c) 2010-2016 Webkul Software Private Limited (https://webkul.com)
    * @license   https://store.webkul.com/license.html
    */
 
    getAccounts : function(cmp, evt, helper) {
        var next = false;
        var prev = false;
        helper.getAccounts(cmp,next,prev);
    },
    Next:function(cmp,event,helper){
        var next = true;
        var prev = false;
        var offset = cmp.get("v.offset");
        helper.getAccounts(cmp,next,prev,offset); 
    },
    Previous:function(cmp,event,helper){
        var next = false;
        var prev = true;
        var offset = cmp.get("v.offset");
        helper.getAccounts(cmp,next,prev,offset); 
    },
})