//Script horloge
window.onload=function() 
    {
        horloge('horloge');
    };
 
    function horloge(el) {
      if(typeof el=="string") { el = document.getElementById(el); }
      function actualiser() {
        var date = new Date();
        var str = date.getHours();
        str += ':'+(date.getMinutes()<10?'0':'')+date.getMinutes();
        str += ':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
        el.innerHTML = str;
      }
        actualiser();
            setInterval(actualiser,1000);
}


//Script de clignotement
var blink_speed = 600; 
var t = setInterval(function ()                    
{   
    var ele = document.getElementsByClassName('blink'); 
    for (var i=0; i<ele.length; i++)
        {
            ele[i].style.visibility = (ele[i].style.visibility == 'hidden' ? '' : 'hidden'); 
        }
}, blink_speed);

