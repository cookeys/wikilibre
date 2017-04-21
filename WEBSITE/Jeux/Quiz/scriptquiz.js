//#######################
//  Variables globales
//#######################
var canvas,timer;
var F=[];//Positions des fonds
var P; //postion du personnage
var delta; //déplacement du personnage
var direction; //direction du personnage
var timer1,timer2; //timer des déplacements
var num;
var numQ;//numéro de la question
var Brep; //La bonne réponse est la 1ère ou la 2ème
//#######################
//  Initialisation
//#######################
function init()
{
	canvas=new graphics('ecran');
	delta = 0;
	direction = 0; //fixe regardant vers la droite
	num=0;
	numQ=1;
	initFond();
	initPerso();
	repeter();
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
	P={x:canvas.width/2,y:200};
}

//#######################
//  Boutton
//#######################
function reponse1()
{
	deplacement1();
}

function reponse2()
{
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
}

function deplacePerso()
{

	P.y= P.y+delta;
}

function deplacement1()
{
	if (P.y>130) 
	{
		delta=-1;
		direction=1; //marchant vers le haut
	}

	if ((P.y==130)&&(F[numQ].x>0))
	{
		for (var i = 0; i <11; i++)
		{
			delta=0;
			direction=2; //marchant vers la droite
			F[i].x = F[i].x-2;
		}
	}

	if ((F[numQ].x==0)&&(P.y<200))
	{
		delta=1;
		direction=3; //marchant vers le bas
	}

	timer1=requestAnimationFrame(deplacement1);

	if ((Brep==2)&&(F[numQ].x<200))
	{
		direction=0;
		cancelAnimationFrame(timer1);
		alert("Perdu :(");
	}

	if ((F[numQ].x==0)&&(P.y==200))
	{
		delta=0;
		direction=0;
		cancelAnimationFrame(timer1);
		numQ=numQ+1;
	}
}

function deplacement2()
{
	if (P.y<280) 
	{
		delta=1;
		direction=3; //marchant vers le bas
	}

	if ((P.y==280)&&(F[numQ].x>0))
	{
		for (var i = 0; i <11; i++)
		{
			delta=0;
			direction=2; //marchant vers la droite
			F[i].x = F[i].x-2;
		}
	}

	if ((F[numQ].x==0)&&(P.y>200))
	{
		delta=-1;
		direction=1; //marchant vers le haut
	}
	
	timer2=requestAnimationFrame(deplacement2);

	if ((Brep==1)&&(F[numQ].x<200))
	{
		direction=0;
		cancelAnimationFrame(timer2);
		alert("Perdu :(");
	}

	if ((F[numQ].x==0)&&(P.y==200))
	{
		delta=0;
		direction=0;
		cancelAnimationFrame(timer2);
		numQ=numQ+1;
	}	
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
	if (direction==0) canvas.drawImage(imPerso[0],P);
	if ((direction==1)&&(num<10)) canvas.drawImage(imPerso[5],P);
	if ((direction==1)&&(num>9)) canvas.drawImage(imPerso[6],P);
	if ((direction==2)&&(num<10)) canvas.drawImage(imPerso[3],P);
	if ((direction==2)&&(num>9)) canvas.drawImage(imPerso[4],P);
	if ((direction==3)&&(num<10)) canvas.drawImage(imPerso[1],P);
	if ((direction==3)&&(num>9)) canvas.drawImage(imPerso[2],P);
}

//#######################
//Questions
//#######################

function questions()
{
	if((numQ==1)||(numQ==2)||(numQ==4)||(numQ==7)) Brep=2;
	if((numQ==3)||(numQ==5)||(numQ==6)||(numQ==8)||(numQ==9)||(numQ==10)) Brep=1;
}