/*###################################################################################
#####################################################################################
####/                          Barre de navigation                              /####
#####################################################################################
###################################################################################*/

window.onload=function() 
    {
        horloge('horloge');
    }
 
    function horloge(el) 
    {
      if(typeof el=="string") el = document.getElementById(el); 
        
      function actualiser() 
        {
            
        var date = new Date();
        var str = date.getHours();
        str += ':'+(date.getMinutes()<10?'0':'')+date.getMinutes();
        str += ':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
        el.innerHTML = str;
            
      }
        
        actualiser();
        setInterval(actualiser,1000);
    }

/*###################################################################################
#####################################################################################
####/                   Sript pour afficher plus d'articles                     /####
#####################################################################################
###################################################################################*/

function show() 
{
   	document.getElementById('wrap_pa').style.display = 'block';
 	document.getElementById('show').style.display = 'none';
 	document.getElementById('hide').style.display = 'block';
	document.getElementById('fond_3a').style.display = "block";
	document.getElementById('accueil').style.borderBottom = "0px solid #ffffff";
}

function hide()
{
   document.getElementById('wrap_pa').style.display = 'none'; 
   document.getElementById('show').style.display = 'block';
   document.getElementById('hide').style.display = 'none';   
   document.getElementById('fond_3a').style.display = 'none'; 
   document.getElementById('accueil').style.borderBottom = "2px solid #EF8A2A";
}

