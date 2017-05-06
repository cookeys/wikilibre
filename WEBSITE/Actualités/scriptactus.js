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

function hide() 
        {
            var x = document.getElementById('wrap_pa');
            var y = document.getElementById('hide_1');
            var z = document.getElementById('hide_2');
            var w = document.getElementById('fond_3a');
            var v = document.getElementById('accueil');
            
            
            
            if (x.style.display == 'none') 
            {
                x.style.display = 'block';
                y.style.display = 'none';
                z.style.display = 'block';
                w.style.display = "block";
                v.style.borderBottom = "0px solid #ffffff";
            } 
            
            else 
            {
                x.style.display = 'none'; 
                y.style.display = 'block';
                z.style.display = 'none';   
                w.style.display = 'none'; 
                v.style.borderBottom = "2px solid #EF8A2A";
            }
        }


