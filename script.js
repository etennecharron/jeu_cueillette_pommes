const player = document.querySelector(".player");
let positionX = 200;
let vie;
let score;
let gamePlaying = false;
let gameOverText = document.querySelector(".textMort");
const maxVitesse = 300;
const minVitesse = 80;
let vitesseActuelle = maxVitesse;
if(localStorage.getItem("bestScore")==null){
    localStorage.setItem("bestScore",0);
    document.querySelector(".best").innerText = localStorage.getItem("bestScore");
}
else{
  document.querySelector(".best").innerText = localStorage.getItem("bestScore");
}
function initialisation(){
vie = 3;
score = 0;
document.querySelector(".score").innerText = score;
document.querySelector(".vie").innerText = vie;
player.style.top = 350+"px";
player.style.left = positionX +"px";
for(let i =0; i<objectArr.length;i++){
    objectArr[i].style.top = "0px"
}
}
const objectArr = document.querySelectorAll(".object")


/**************FONCTION QUI FAIS TOMBER LES OBJETS**********/
function objectFalling(objectNum){
  const choixPositionXArr = [0,50,100,150,200,250,300,350];
  let positionY = 0;
  gamePlaying = true;
  objectArr[objectNum].classList.add("tombe")  
  objectArr[objectNum].style.opacity = "100%"
  function positionXObject(){
    objectArr[objectNum].style.left = choixPositionXArr[Math.round(Math.random()*choixPositionXArr.length)]+"px";
  };
  positionXObject()
  //function qui fais descendre l'objet
  function decrementationY(){
    //vérifie que le jeu est toujours en cours
    if(gamePlaying==false){
        clearInterval(fallingInterval);
        for(let i=0;i<objectArr.length;i++){
            objectArr[i].style.opacity = "0%";
        }
    }
    else{
    positionY = positionY + 50;
    objectArr[objectNum].style.top = positionY+"px";
    //SI LE JOUEUR ÉCHOUE A ATTRAPER UN CUBE
    if(positionY>300){
    clearInterval(fallingInterval);
      setTimeout(function(){
        objectArr[objectNum].style.opacity="0%";
        positionY=0;
        objectArr[objectNum].style.top=positionY+"px";
        objectArr[objectNum].classList.remove("tombe");
      },1000)
     
  };// SI LE JOEUR RÉUSSIS A ATTRAPER UN CUBE
    if(player.style.left == objectArr[objectNum].style.left && player.style.top == objectArr[objectNum].style.top){
      score=score+1;
      document.querySelector(".score").innerText = score;
      objectArr[objectNum].style.opacity="0%"
      positionY = 0;
      objectArr[objectNum].style.top=positionY+"px";
      objectArr[objectNum].classList.add("tombe")  
    }
    // si le joueur ne réussis pas attraper un cube, il perd une vie
    if(objectArr[objectNum].style.top=="350px"&& player.style.left !== objectArr[objectNum].style.left){
        vie=vie-1;
        document.querySelector(".vie").innerText=vie;
        if(vie==0){
            if(score>localStorage.getItem("bestScore")){
                localStorage.setItem("bestScore",score)
                document.querySelector(".best").innerText = localStorage.getItem("bestScore");
            };
            gameOverText.style.opacity="100%";
            setTimeout(function(){
                gameOverText.style.opacity="0%";
                document.querySelector(".btnStart").classList.toggle("unclickable");
            },5000);
            gamePlaying = false;
            console.log(gamePlaying)
            clearInterval(fallingInterval);
            initialisation();
        }
    }
  }
}
   let fallingInterval = setInterval(decrementationY,vitesseActuelle);// <-------------------------------------- MIN 80 MAX 300  VITESSE DE JEU
}



/**********FUNCTION QUI PERMET AU JOUEUR DE BOUGER**********/
document.addEventListener("keydown",function(){
  if(event.key=="ArrowRight" && positionX<350 || event.key=="d" && positionX<350){
    if(player.classList[1]=="flip"){
      player.classList.remove("flip")
    }
    positionX = positionX + 50;
    player.style.left = positionX+"px";
  }
  if(event.key=="ArrowLeft" && positionX>0 || event.key=="a" && positionX>0){
    if(player.classList[1]!=="flip"){
      player.classList.add("flip")
    }
    positionX = positionX -50;
    player.style.left = positionX+"px";
  }
});




/***************FUNCTION QUI FAIS FONCTIONNER LE JEU************/
function gameStart(){
  let vitesseAcceleration = setInterval(function(){
    if(gamePlaying==false){
      clearInterval(vitesseAcceleration);
      vitesseActuelle = maxVitesse;
    }else if(gamePlaying==true && vitesseActuelle>minVitesse){
      vitesseActuelle = vitesseActuelle - 10;
      console.log(vitesseActuelle);
    }
    },5000);

   let intervalGame = setInterval(function(){
    if(gamePlaying==false){
        clearInterval(intervalGame);
    }
    else{
        let object = Math.round(Math.random()*objectArr.length)
    if(object == 8){
      object = 7
      if(objectArr[object].classList[2]=="tombe"){
      }
      else{
        objectFalling(object)
      }
    }
    else{
      if(objectArr[object].classList[2]=="tombe"){
      }
      else{
        objectFalling(object)
      }
    }
    }    
  },1000);
}
/**FUNCTION QUI FAIS COMMENCER LE JEU***/
document.querySelector(".btnStart").addEventListener("click",function(){
  console.log("click")
    gamePlaying=true;
    console.log(gamePlaying)
    document.querySelector(".textMort").style.opacity="0%";
    gameStart();
    document.querySelector(".btnStart").classList.toggle("unclickable");
});

initialisation();

