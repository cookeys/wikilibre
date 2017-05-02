var canvas;
var F, G; //Fonds
var S; //Snowden
var vSnow = 5; //Vitesse de Snowden
var dirSnow = 0; //Direction de Snowden
var vCia = 3; //Vitesse de la Cia
var C; //CIA
var L; //Linux
var vLin = 5; //Vitesse de Linux
var chocLinSnow; //Collision Linux avec Snowden
var score = 0;
var scoreSnow; //Score de Snowden : tous les 5 points il a un cour en plus
var c1, c2, c3; //Position des coeurs pour Snowden
var c4, c5, c6; //Position des coeurs pour la CIA
var chocLinCia; //Collision Linux avec la CIA
var scorecoeur = 3; //Nombre de coeurs de Snowden
var scorecoeurCia = 3; //Nombre de coeurs de la Cia
var M; //Microsoft
var vMicro = 7; //Vitesse du Microsoft
var chocMicSnow; //Collision Microsoft avec Snowden
var chocMicCia; //Collision Microsoft avec la Cia
var A=[]; //Tableau de la position des logos d'Apple affichés après une collision
var nbrApple = 25; //Nombre de logos d'Apple affichés maximum
var CollApple = 0; //Nombre de collisions de logo d'Apple avec un objet
var vApple = 5; //Vitesse des logos Apple
var chocApple; //Collision Apple avec Snowden

function init()
{
    canvas = new graphics('toile');
    chocLinSnow = new collision(imgLinux,imgSnowden);
    chocLinCia = new collision(imgLinux,imgCia);
    chocMicSnow = new collision(imgMicrosoft,imgSnowden);
    chocMicCia = new collision(imgMicrosoft,imgCia);
    chocApple = new collision(imgApple,imgSnowden);
    initFond();
    initcoeurs();
    initSnowden();
    initCia();
    initLinux();
    initMicrosoft();
    initApple();
}

function initFond()
{
	F={x:0, y:0};
    G={x:0, y:-canvas.height};
}

function initcoeurs()
{
    //Coeurs de Snowden, de gauche à droite
    c1={x:((canvas.width)/2)-imgSnowden.width-2*imgCoeur.width, y:0};
    c2={x:((canvas.width)/2)-imgSnowden.width-imgCoeur.width, y:0};
    c3={x:((canvas.width)/2)-imgSnowden.width, y:0};
    
    //Coeurs de la CIA, de gauche à droite
    c4={x: imgCia.width, y:canvas.height-imgCoeur.height}
    c5={x: imgCia.width+imgCoeur.width, y:canvas.height-imgCoeur.height}
    c6={x: imgCia.width+2*(imgCoeur.width), y:canvas.height-imgCoeur.height}
}

function initSnowden()
{
    S={x:(canvas.width/2)-(imgSnowden.width/2), y:0};
}

function initCia()
{
    C={x:0, y:(canvas.height)/2};
}

function initLinux()
{
    var alea = Math.floor(Math.random()*(canvas.height));
    L={x:canvas.width, y:alea};
}

function initMicrosoft()
{
    var aleay = Math.floor(Math.random()*(canvas.height));
    var aleax = canvas.width+Math.floor(Math.random()*(canvas.width))
    M={x:aleax, y:aleay};
}

function initApple()
{
    for (var i = 1; i <= nbrApple ; i++)
        {
            A[i]={x:0, y:-2*(imgApple.height)};
        }
}



//*****************
//BOUCLE PRINCIPALE
//******************
    
function repeter()
{
    document.getElementById("lancejeux").src = 'media/bouttons/on.png';
    restrictions();
    deplaceFond();
    deplaceSnowden();
    deplaceCia();
    deplaceLinux();
    deplaceMicrosoft();
    deplaceApple();
    collisions();
	afficheJeu();
	timer=requestAnimationFrame(repeter);
}

function restrictions()
{
    //SNOWDEN
        if (S.y <= 0) S.y = 0;
        if (S.y+imgSnowden.height >= canvas.height) S.y = canvas.height-imgSnowden.height;
    //CIA
        if (C.y <= 0) C.y = 0;
        if (C.y+imgSnowden.height >= canvas.height) C.y = canvas.height-imgSnowden.height;
    //LINUX
        if ((L.y)+imgLinux.height > canvas.height) L.y = (canvas.height)-imgLinux.height;
        if (L.y <= 0) L.y = 0;
        if (L.x <= -imgLinux.width)
        {
            var alea = Math.floor(Math.random()*(canvas.height));
            L={x:canvas.width, y:alea};
        }
    //Microsoft
        if ((M.y)+imgMicrosoft.height > canvas.height) M.y = (canvas.height)-imgMicrosoft.height;
        if (M.y <= 0) M.y = 0;
        if (M.x <= -imgMicrosoft.width)
        {
            var aleay = Math.floor(Math.random()*(canvas.height));
            var aleax = canvas.width+Math.floor(Math.random()*(canvas.width))
            M={x:aleax, y:aleay};
        }
    //Si il y a eu 15 collisions, alors le nombre de collision revient à 0
        if (CollApple >= 15)
            {
                CollApple = 0;
            }
}





//************
//DEPLACEMENTS
//************

function directionSnowden(event)
{
    //haut(Z)
    if (event.charCode == 122) dirSnow = 0;
    //bas(S)
    if (event.charCode == 115) dirSnow = 1;
}

function deplaceSnowden()
{
    if (dirSnow == 0) S.y=S.y - vSnow;
    if (dirSnow == 1) S.y=S.y + vSnow;
}

function deplaceFond()
{
    F.y=F.y+2;
    G.y=G.y+2;
    if (F.y > canvas.height) F.y = -canvas.height;
    if (G.y > canvas.height) G.y = -canvas.height;
}

function deplaceCia()
{
    //direction aleatoire
    var aleat=Math.floor(Math.random()*50);
    
    if (aleat == 0) vCia = vCia;
    if (aleat == 1) vCia = -vCia;
    C.y = C.y + vCia;
}

function deplaceLinux()
{
    L.x = L.x - vLin;
}

function deplaceMicrosoft()
{
    M.x = M.x - vMicro;
}

function deplaceApple()
{
    for (var i = 1; i <= nbrApple ; i++)
        {
            A[i].x = A[i].x + vApple;
        }
}





//**********
//COLLISIONS
//**********

function collisions()
{
    //LINUX-SNOWDEN
        if (chocLinSnow.detection(L,S) ==true)
            {
                //Un autre Linux apparaît
                initLinux();
                score = score+1;
            
                //Tous les 15 de score, Snowden gagne 1 vie
                scoreSnow = score%(15);
                if (scoreSnow == 0) scorecoeur = scorecoeur + 1;
                //Tous les 10 de score, la CIA perd une vie
                scoreCIA = score%(10);
                if (scoreCIA == 0) scorecoeurCia = scorecoeurCia - 1;
            }
    
    //LINUX-CIA
        if (chocLinCia.detection(L,C) == true)
            {
                //Un autre Linux apparaît
                initLinux();
                
                //Snowden perd un coeur
                scorecoeur = scorecoeur - 1;
                
                //Le logo d'Apple apparaît
                CollApple = CollApple + 1;
                A[CollApple]={x:C.x+imgApple.width, y:C.y}; 
            }
    //MICROSOFT-SNOWDEN
        if (chocMicSnow.detection(M,S) == true)
            {
                //Un autre Microsoft apparaît
                initMicrosoft();
                
                //Snowden perd un coeur
                scorecoeur = scorecoeur - 1;
                
                //Le logo d'Apple apparaît
                CollApple = CollApple + 1;
                A[CollApple]={x:C.x+imgApple.width, y:C.y}; 
            }
    //MICROSOFT-CIA
        if (chocMicCia.detection(M,C) == true)
            {
                //Un autre Microsoft apparaît
                initMicrosoft();
                
                //Le logo d'Apple apparaît
                CollApple = CollApple + 1;
                A[CollApple]={x:C.x+imgApple.width, y:C.y};                
            }
    //APPLE-SNOWDEN
    for (var i = 1; i <= nbrApple ; i++)
        {
            if (chocApple.detection(A[i],S) == true)
                {
                    //Le logo Apple disapparaît
                    A[CollApple].y = -(imgApple.height);
                    
                    //Snowden perd un coeur
                    scorecoeur = scorecoeur - 1; 
                }
        }
}







//********
//AFFICHER
//********
    
function afficheJeu()
{
    canvas.clear();
    afficheFond();
    affichescore();
    afficheCoeurs();
    afficheSnowden();
    afficheCia();
    afficheLinux();
    afficheMicrosoft();
    afficheApple();
}

function afficheFond()
{
    canvas.drawImage(imgFond[0],F);
    canvas.drawImage(imgFond[0],G);
}

function affichescore()
{
	var P={x:canvas.width-50, y:30};
	canvas.drawFillText(score,P,40,"yellow");
}

function afficheSnowden()
{
    canvas.drawImage(imgSnowden,S);
}

function afficheCia()
{
    canvas.drawImage(imgCia,C);
}
function afficheLinux()
{
    canvas.drawImage(imgLinux,L);
}

function afficheCoeurs()
{    
    //Restrictions de coeurs
    if (scorecoeur >= 3) scorecoeur = 3;
    if (scorecoeurCia >= 3 ) scorecoeurCia = 3;
    
    //Coeurs de Snowden
    if (scorecoeur == 3)
        {
            canvas.drawImage(imgCoeur, c1);
            canvas.drawImage(imgCoeur, c2);
            canvas.drawImage(imgCoeur, c3);    
        }
    if (scorecoeur == 2)
        {
            canvas.drawImage(imgCoeur, c1);
            canvas.drawImage(imgCoeur, c2);
            canvas.drawImage(imgCoeurVide, c3);    
        }
    if (scorecoeur == 1)
        {
            canvas.drawImage(imgCoeur, c1);
            canvas.drawImage(imgCoeurVide, c2);
            canvas.drawImage(imgCoeurVide, c3);    
        }
    
            //SNOWDEN A PERDU
    if (scorecoeur == 0)
        {
            document.getElementById('perdu').style.display='block';
            cancelAnimationFrame(Timer);
        }
    
    //Coeurs de la CIA
    if (scorecoeurCia == 3)
        {
            canvas.drawImage(imgCoeur, c4);
            canvas.drawImage(imgCoeur, c5);
            canvas.drawImage(imgCoeur, c6);
        }
    if (scorecoeurCia == 2)
        {
            canvas.drawImage(imgCoeur, c4);
            canvas.drawImage(imgCoeur, c5);
            canvas.drawImage(imgCoeurVide, c6);
        }
    if (scorecoeurCia == 1)
        {
            canvas.drawImage(imgCoeur, c4);
            canvas.drawImage(imgCoeurVide, c5);
            canvas.drawImage(imgCoeurVide, c6);
        }
    
            //LA CIA A PERDU
    if (scorecoeurCia == 0)
        {
            document.getElementById('gagne').style.display='block';
            cancelAnimationFrame(Timer);
        }
    
}

function afficheMicrosoft()
{
    canvas.drawImage(imgMicrosoft,M);
}

function afficheApple()
{
    for (var i = 1; i <= nbrApple ; i++)
        {
            canvas.drawImage(imgApple,A[i]);
        }
}