//#######################
//  Variables globales
//#######################
var canvas,timer;
var F=[];//Positions des fonds
var P; //Postion du personnage
var delta; //Déplacement du personnage
var direction; //Direction du personnage
var timerDepl; //Timer des déplacements
var T;//Timer de la chute
var temps //Temps restant au timer de la chute
var num;
var numQ;//Numéro de la question
var Brep; //La bonne réponse est la 1ère ou la 2ème
//#######################
//  Initialisation
//#######################
function init()
{
	canvas=new graphics('ecran');
	delta = 0;
	direction = 0; //Fixe regardant vers la droite
	temps = 1250;
	num=0;
	numQ=1;
	initFond();
	initPerso();
	repeter();
	horloge(horloge);
}

function initFond()
{
	for (var i = 0; i <11; i++)
	{
		F[i]={x:canvas.width*i,y:0};
	}
}

function initPerso()
{
	P={x:canvas.width/2,y:280};
}

//#######################
//  Boutton
//#######################
function reponse1()
{
	document.getElementById("enonce").style.display="none";
	document.getElementById("bouton1").style.display="none";
	document.getElementById("bouton2").style.display="none";
	deplacement1();
}

function reponse2()
{
	document.getElementById("enonce").style.display="none";
	document.getElementById("bouton1").style.display="none";
	document.getElementById("bouton2").style.display="none";
	deplacement2();
}

//#######################
//  Boucle
//#######################
function repeter()
{
	deplacePerso();
	afficheJeu();
	questions();
	timer=requestAnimationFrame(repeter);
	if(numQ==11) victoire();
}

function deplacePerso()
{
	P.y= P.y+delta;
}

function deplacement1()
{
	
	if (P.y>190) deplacementHaut();

	if ((P.y==190)&&(F[numQ].x>0)) deplacementDroite();

	if ((F[numQ].x==0)&&(P.y<280)) deplacementBas();

	timerDepl=requestAnimationFrame(deplacement1);

	if ((Brep==2)&&(F[numQ].x<445)) chute();

	if ((F[numQ].x==0)&&(P.y==280)) questionSuivante();
}

function deplacement2()
{
	if (P.y<360) deplacementBas();

	if ((P.y==360)&&(F[numQ].x>0)) deplacementDroite();

	if ((F[numQ].x==0)&&(P.y>280)) deplacementHaut();
	
	timerDepl=requestAnimationFrame(deplacement2);

	if ((Brep==1)&&(F[numQ].x<445)) chute();

	if ((F[numQ].x==0)&&(P.y==280)) questionSuivante();
}

function deplacementHaut()
{
	delta=-1;
	direction=1; //Marchant vers le haut
}

function deplacementDroite()
{
	delta=0;
	direction=2; //Marchant vers la droite

	for (var i = 0; i <11; i++)
	{
		F[i].x = F[i].x-2;
	}
}

function deplacementBas()
{
	delta=1;
	direction=3; //Marchant vers le bas
}

function questionSuivante()
{
	delta=0;
	direction=0;
	cancelAnimationFrame(timerDepl);
	numQ=numQ+1;
	document.getElementById("enonce").style.display="block";
	document.getElementById("bouton1").style.display="inline";
	document.getElementById("bouton2").style.display="inline";
}

function victoire()
{
	document.getElementById("question").innerHTML="Bravo";
	document.getElementById("enonce").style.display="none";
	document.getElementById("bouton1").style.display="none";
	document.getElementById("bouton2").style.display="none";
	document.getElementById("victoire").style.display="block";
}

function chute()
{
	for (var i = 0; i <11; i++)
	{
		
		F[i].x = F[i].x+2;
	}	

	direction=4; //Position de chute
	T=setTimeout(defaite,1250);
	temps=temps-16;
	afficheChute();
}

function defaite()
{
	cancelAnimationFrame(timerDepl);
	document.getElementById("defaite").style.display="block";
}

//#######################
//Affichage
//#######################

function afficheJeu()
{
	canvas.clear;
	afficheFond();
	affichePerso();
}

function afficheFond()
{
	canvas.drawImage(imFond[0],F[0]);
	canvas.drawImage(imFond[2],F[1]);
	canvas.drawImage(imFond[2],F[2]);
	canvas.drawImage(imFond[1],F[3]);
	canvas.drawImage(imFond[2],F[4]);
	canvas.drawImage(imFond[1],F[5]);
	canvas.drawImage(imFond[1],F[6]);
	canvas.drawImage(imFond[2],F[7]);
	canvas.drawImage(imFond[1],F[8]);
	canvas.drawImage(imFond[1],F[9]);
	canvas.drawImage(imFond[3],F[10]);
}

function affichePerso()
{
	num=(num+1)%19;
	if (direction==0)             canvas.drawImage(imPerso[0],P);
	if ((direction==1)&&(num<10)) canvas.drawImage(imPerso[5],P);
	if ((direction==1)&&(num>9))  canvas.drawImage(imPerso[6],P);
	if ((direction==2)&&(num<10)) canvas.drawImage(imPerso[3],P);
	if ((direction==2)&&(num>9))  canvas.drawImage(imPerso[4],P);
	if ((direction==3)&&(num<10)) canvas.drawImage(imPerso[1],P);
	if ((direction==3)&&(num>9))  canvas.drawImage(imPerso[2],P);
}

function afficheChute()
{
	if (temps>=1100)                canvas.drawImage(imPerso[7],P);
	if ((temps<1100)&&(temps>=950)) canvas.drawImage(imPerso[8],P);
	if ((temps<950)&&(temps>=800)) canvas.drawImage(imPerso[9],P);
	if ((temps<800)&&(temps>=650)) canvas.drawImage(imPerso[10],P);
	if ((temps<650)&&(temps>=500)) canvas.drawImage(imPerso[11],P);
}

//#######################
//Questions
//#######################
function questions()
{
	document.getElementById("question").innerHTML="Question "+numQ;
	enonces();
	reponses();
}

function reponses()
{
	if((numQ==3)||(numQ==5)||(numQ==6)||(numQ==8)||(numQ==9)||(numQ==10))       Brep=1;
	if((numQ==1)||(numQ==2)||(numQ==4)||(numQ==7))                              Brep=2;	
}

function enonces()
{
	if(numQ==2)
	{
		document.getElementById("enonce").innerHTML="Quelle organisation était propriétaire des outils de piratage dans l'affaire Vault-7 ?";
		document.getElementById("bouton1").innerHTML="La NSA";
		document.getElementById("bouton2").innerHTML="La CIA";
		document.getElementById("lien").href="../../Actualités/actu_5.html";
	}
	if(numQ==3)
	{
		document.getElementById("enonce").innerHTML="Avec qui la société Qwant a-t-elle coopérée ?";
		document.getElementById("bouton1").innerHTML="Mozilla";
		document.getElementById("bouton2").innerHTML="Microsoft";
		document.getElementById("lien").href="../../Actualités/actu_2.html";
	}
	if(numQ==4)
	{
		document.getElementById("enonce").innerHTML="Comment s'appelle le site où a été publié le dossier Vault-7 ?";
		document.getElementById("bouton1").innerHTML="Wikilibre";
		document.getElementById("bouton2").innerHTML="Wikileaks";
		document.getElementById("lien").href="../../Actualités/actu_5.html";
	}
	if(numQ==5)
	{
		document.getElementById("enonce").innerHTML="Quel est le concours le plus insolite durant la Defcon ?";
		document.getElementById("bouton1").innerHTML="Refroidir le mieux possible une bière du Nevada";
		document.getElementById("bouton2").innerHTML="Faire bouillir de l'eau avec la chaleur d'un ordinateur";
		document.getElementById("lien").href="../../Actualités/actu_4.html";	
	}
	if(numQ==6)
	{
		document.getElementById("enonce").innerHTML="Que peut-on choisir lors de la commande de l'Intel nuc ?";
		document.getElementById("bouton1").innerHTML="Avoir un OS préinstallé";
		document.getElementById("bouton2").innerHTML="Avoir une couleur de châssis personnalisée";
		document.getElementById("lien").href="../../Actualités/actu_3.html";
	}
	if(numQ==7)
	{
		document.getElementById("enonce").innerHTML="Quelle alternative aux dons propose Canonical ?";
		document.getElementById("bouton1").innerHTML="Regarder des publicités monétisées";
		document.getElementById("bouton2").innerHTML="Acheter des goodies";
		document.getElementById("lien").href="../../Actualités/actu_6.html";
	}
	if(numQ==8)
	{
		document.getElementById("enonce").innerHTML="Quel est le logiciel présenté sur la page d'acceuil ?";
		document.getElementById("bouton1").innerHTML="Tor";
		document.getElementById("bouton2").innerHTML="Gimp";
		document.getElementById("lien").href="../../Accueil/home.html";
	}
	if(numQ==9)
	{
		document.getElementById("enonce").innerHTML="Quel est le nom du projet d'OS libre ?";
		document.getElementById("bouton1").innerHTML="GNU/Linux";
		document.getElementById("bouton2").innerHTML="LNU/Linux";
		document.getElementById("lien").href="../../Libre/libre.html";
	}
	if(numQ==10)
	{
		document.getElementById("enonce").innerHTML="Qui a réalisé ce quiz ?";
		document.getElementById("bouton1").innerHTML="Romain Compain";
		document.getElementById("bouton2").innerHTML="Nicolas Robert";
		document.getElementById("lien").href="../../Nous/nous.html";
	}
}