// ###############################################
// Boite à outils "toolBox.js"    
// Auteur: Stephane SOULABAILLE 
// email: stephane.soulabaille@ac-versailles.fr
// Version 1 - Septembre 2016
// 1. La classe graphics ...................18
//		1.1 Constructeur ...................47
//		1.2 Méthodes du canvas .............64
//		1.3 Méthodes du context.............81
//
// 2. La classe collision .................168
//		2.1 Constructeurs .................182
//		2.1 Methodes collision ............199
// ################################################
//
//##################################################
//
// 1. La classe graphics
//
//##################################################
	function graphics(canvasID)
	{
		//Attributs
		this.canvasDOM=initCanvas(canvasID);
		this.width=this.canvasDOM.width;
		this.height=this.canvasDOM.height;
		this.style=this.canvasDOM.style;
		this.ctx=initCtx(canvasID);
			
		//Méthodes du canvas
		this.getMousePosition=getMousePosition;
		//Méthodes du context
		this.drawLine=drawLine;
		this.drawRectangle=drawRectangle;
		this.drawFillRectangle=drawFillRectangle;
		this.drawCircle=drawCircle;
		this.drawFillCircle=drawFillCircle;
		this.clear=clear;
		this.drawImage=drawImage;
		this.movePixel=movePixel;
		this.drawText=drawText;
		this.drawFillText=drawFillText;
		this.getImageData=getImageData;
		this.putImageData=putImageData;
	}

//--------------------------------------------------
// 1.1 Constructeur
//--------------------------------------------------
	function initCanvas(canvasID)
	{
		var can=document.getElementById(canvasID);
		can.style.backgroundColor="#1c1c1c";
		return can;
	}

	function initCtx(canvasID)
	{
		var can=document.getElementById(canvasID);
		var ctx=can.getContext('2d');
		return ctx;
	}

//--------------------------------------------------
// 1.2 Méthodes du canvas
//--------------------------------------------------

	// renvoie les coordonnées du clic de la souris 
	// dans le canvas
	function getMousePosition(event)
	{
	    var rect = this.canvasDOM.getBoundingClientRect();
	    var mx = Math.round(event.clientX - rect.left);
	    var my= Math.round(event.clientY - rect.top);
	    //console.log("Click en: "+mx+" "+my);
	    return {x:mx, y:my};
	}


//--------------------------------------------------
// 1.3 Méthodes du context
//--------------------------------------------------

// Dessine un segment entre les points A et B
function drawLine(A,B,color)
{
   	
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(A.x,A.y);
	this.ctx.lineTo(B.x,B.y);
	this.ctx.stroke();
}



// Dessine un rectangle "vide" de "coin" haut gauche HG
// de largeur w et de hauteur h.
// 
function drawRectangle(HG,w,h,color)
{
	this.ctx.strokeStyle = color;
	this.ctx.strokeRect(HG.x,HG.y,w,h);
}
// Dessine un rectangle "plein" de "coin" de "coin" haut gauche HG
// de largeur w et de hauteur h.
//
function drawFillRectangle(HG,w,h,color)
{
	this.ctx.fillStyle = color;
	this.ctx.fillRect(HG.x,HG.y,w,h);
}

// Dessine un cercle "vide" de centre "centre" de rayon "rayon".
// Epaisseur du trait = 2
//
function drawCircle(centre,rayon,color)
{
	this.ctx.strokeStyle = color;
	this.ctx.beginPath();
	this.ctx.lineWidth=2;
	this.ctx.arc(centre.x,centre.y,rayon,0,2*Math.PI);
	this.ctx.stroke();
}

// Dessine un cercle "plein" de centre "centre" de rayon "rayon".
// Epaisseur du trait = 2
//
function drawFillCircle(centre,rayon,color)
{
	this.ctx.fillStyle = color;
	this.ctx.beginPath();
	this.ctx.arc(centre.x,centre.y,rayon,0,2*Math.PI);
	this.ctx.fill();	
}

// Efface le canvas
function clear()
{
	this.ctx.clearRect(0,0,this.width,this.height);
}


// Affiche HTMLpicture en HG qui correspond au coin haut gauche
function drawImage(HTMLpicture,HG)
{	
   	this.ctx.drawImage(HTMLpicture,HG.x,HG.y);
}

function movePixel(HTMLpicture,orig,dest)
{
	this.ctx.drawImage(HTMLpicture,orig.x,orig.y,1,1,dest.x,dest.y,1,1);
}

// Affiche du texte en Arial avec style creux 
function drawText(text,HG,size,color)
{
 	this.ctx.lineWidth=1;
 	this.ctx.font = ""+size+"px Arial";
 	this.ctx.strokeStyle = color;
	this.ctx.strokeText(text,HG.x,HG.y);
}

//Affiche du texte en Arial	
function drawFillText(text,HG,size,color)
{
 	this.ctx.font =  ""+size+"px Arial";
 	this.ctx.fillStyle = color;
	this.ctx.fillText(text,HG.x,HG.y);
}

function getImageData(HG, w, h)
{
	var imgData=this.ctx.getImageData(HG.x,HG.y,w,h);
	return imgData;
}

function putImageData(imgData, HG)
{
	this.ctx.putImageData(imgData, HG.x,HG.y);	
}
// ###############################################
//       
// 2. La classe collision
//
// ################################################

function collision(image1,image2)
{
    // Attributs
    this.image1=DonneImageData(image1);
    this.image2=DonneImageData(image2);

    // Methodes
    this.detection = detection;
}
//--------------------------------------------------
// 2.1 Constructeurs
//--------------------------------------------------

function DonneImageData(image)
    {
      var can2,ctx2;
      can2=document.createElement('canvas');
      can2.setAttribute('width',image.width);
      can2.setAttribute('height',image.height);
      
      ctx2=can2.getContext('2d');      
      ctx2.drawImage(image,0,0);

      return ctx2.getImageData(0,0,can2.width,can2.height);
    }

//--------------------------------------------------
// 2.1 Methodes de la classe Collision
//--------------------------------------------------

function detection(A,B)
    {
           
    // On travaille avec des entiers
    A.x  = Math.round( A.x ); A.y  = Math.round( A.y);
    B.x = Math.round( B.x );  B.y = Math.round( B.y );
    
    //On détermine le rectangle d'intersection des deux images
    //(xMin,yMin) correspond au point haut gauche 
    //(xMax,yMax) correspond au point bas droit 
    var xMin = Math.max( A.x, B.x );
    var yMin = Math.max( A.y, B.y );
    var xMax = Math.min( A.x+this.image1.width, B.x+this.image2.width );
    var yMax = Math.min( A.y+this.image1.height, B.y+this.image2.height );
    
    //Largeur et hauteur du rectangle d'intersection
    var xDiff = xMax - xMin;
    var yDiff = yMax - yMin;
        
    // Cas où il n'y a pas d'intersection des deux images.
    if ( xMin >= xMax || yMin >= yMax ) {return false;}
    
    for ( var j = xMin; j < xMax; j++ )
    {
      for ( var i = yMin; i < yMax; i++ ) 
      {
        var pixel1 = ((j-A.x ) + (i-A.y )*this.image1.width )*4 + 3 ;
        var pixel2 = ((j-B.x) + (i-B.y)*this.image2.width)*4 + 3 ;
        //Si les deux pixels alpha (cf+3) ne sont pas nuls, 
        //c'est qu'il y a une intersection (un pixel commun).
        if ( this.image1.data[pixel1] !== 0 && this.image2.data[pixel2] !== 0 )// 
        {
          return true;
        }
      }
    }
    return false;
  }



