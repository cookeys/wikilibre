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





