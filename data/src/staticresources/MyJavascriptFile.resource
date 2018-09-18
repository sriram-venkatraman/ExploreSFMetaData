var sfdcChoiceId = "j_id0:j_id2:i:f:pb:d:element___multiselectchoice____Plans";

for (var i = 0; i < document.getElementsByName(sfdcChoiceId).length; i++)
{
   var eleIdName = document.getElementsByName(sfdcChoiceId)[i].id;

   document.getElementById(eleIdName).onclick = (function () {
									for (var i = 0; i <= document.getElementsByName(sfdcChoiceId).length; i++)
									{
										var eleIdName = document.getElementsByName(sfdcChoiceId)[i].id;
										var divIdName = eleIdName+"__div";
									        var olddiv = document.getElementById(divIdName);
									//alert(olddiv);
									
										if (document.getElementById(eleIdName).checked && olddiv == null)
										{
											var newdiv = document.createElement('div');
									
											newdiv.setAttribute('id',divIdName);
											newdiv.innerHTML = '<p> This is a dynamic content with div id: ' + divIdName+'</p>';
									               document.getElementById(eleIdName).nextSibling.appendChild(newdiv);
										}
									
										if (!document.getElementById(eleIdName).checked && olddiv != null)
										{
									               document.getElementById(eleIdName).nextSibling.removeChild(olddiv);
										}
									}
									    
		});
}