//Create js var using html element myCanvas, then turn into x.y co-ords.
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

//scores
var oneScore = 0;
var twoScore = 0;
var canScore = true;

//Set Ball position variables
var x = (canvas.width/2) + 1;
var y = canvas.height - 40;
var ballRadius = 12;
var dx = 1;
var dy = 1.3;
var timer = 3;
var secondTimer = 100;
var veloc = 1;

//Set paddle variables
var padLength = 50;
var padWidth = 10;
var playerOneY = 5;
var playerTwoY = 5;

//Control state variables
var wPressed = false;
var sPressed = false;
var upPressed = false;
var downPressed = false;
window.alert(" Hello, welcome to Pong! \n Before we begin I just have to ask a few questions.")
var userOne = prompt("PLAYER ONE \nWhat is your name?", "test");
var userTwo = prompt("PLAYER TWO \nWhat is your name?", "test");
var topScore = prompt("How many points to be named SUPREME?", "5")
var audio = new Audio('beep.wav');
var paddleAudio = new Audio('paddlebeep.wav')

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
  if (e.keyCode == 87) {
    wPressed   = true;
  }
  else if (e.keyCode == 83) {
    sPressed = true;
  }
  else if (e.keyCode == 38) {
    upPressed   = true;
  }
  else if (e.keyCode == 40) {
    downPressed = true;
  }
}

   function keyUpHandler(e) {
    if (e.keyCode == 87) {
      wPressed   = false;
    }
    else if (e.keyCode == 83) {
      sPressed = false;
    }
    else if (e.keyCode == 38) {
      upPressed   = false;
    }
    else if (e.keyCode == 40) {
      downPressed = false;
    }
}

function drawBall() {

    //draw ball
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2, false);
    context.fillStyle = "red";
    context.fill();
    context.closePath();

}

function drawPlayer() {
  //draw paddles
  context.beginPath();
  context.rect(5,playerOneY,padWidth,padLength);
  context.fillStyle = "#209DD4";
  context.fill();
  context.closePath();

  context.beginPath();
  context.rect(500,playerTwoY,padWidth,padLength);
  context.fillStyle = "#209DD4";
  context.fill();
  context.closePath();

  context.font = "14pt Courier New";
  context.strokeStyle = "white";
  context.textAlign = "center";
  context.strokeText(userOne + ":" + oneScore + "  " + userTwo + ":" + twoScore , canvas.width/2 , 20);


  //context.font = "14pt Courier New";
  //context.strokeStyle = "white";
  //context.textAlign = "center";
  //context.strokeText(userTwo + ":" + twoScore, 0, 20);


  context.font = "30pt Courier New";
  context.strokeStyle = "white";
  context.strokeText(timer, canvas.width/2, canvas.height/2);
}


function bounceLogic() {
  if (y + dy < ballRadius) {
  dy = -dy;
  audio.play();
}
if (y + dy > canvas.height-ballRadius) {
  dy = -dy;
  audio.play();
}
if (x + (dx * veloc) < ballRadius) {
  dx = -dx;
  if (canScore == true) {
    twoScore +=1;
    x = (canvas.width/2);
    veloc =1;
    timer = 3;
  }
}
if (x + (dx * veloc) > canvas.width-ballRadius) {
 dx = -dx;
  if (canScore == true) {
    oneScore +=1;
    x = (canvas.width/2);
    veloc = 1;
    timer = 3;
  }
}
if (x < (15 + ballRadius) && canScore == true) {
  if ((y > playerOneY) && (y < (playerOneY + padLength))){
paddleAudio.play();
    dx = -dx;
    canScore = false;
    veloc = veloc + 0.5;
  }
}
if (x > (500 - ballRadius) && canScore == true) {
  if ((y > playerTwoY) && (y < (playerTwoY + padLength))){
paddleAudio.play();
    dx = -dx;
    canScore = false;
    veloc = veloc + 0.5;
  }
}
if (x > 50 && x < 400) {
  canScore = true;
}
}



function draw() {
  //clear canvas each interval
  context.clearRect(0, 0, canvas.width, canvas.height);


 secondTimer = secondTimer - 1;
 if (secondTimer == 0) {
   secondTimer = 100;
   if (timer > 0) {
   timer = timer -1;

 }
 }

if (timer == 0){
    //move ball
    timer = "";
  x += (dx * veloc);
  y += (dy * veloc);
}

if (oneScore == topScore){
  context.font = "14pt Courier New";
  context.strokeStyle = "white";
  context.textAlign = "center";
  context.strokeText(userOne + " Won!",canvas.width/2 , canvas.height/2 )
  timer = "";
  dx, dy, veloc = 0;

}
else if (twoScore == topScore){
  context.font = "14pt Courier New";
  context.strokeStyle = "white";
  context.textAlign = "center";
  context.strokeText(userTwo + " Won!",canvas.width/2, canvas.height/2)
  timer = "";
  dx, dy, veloc = 0;

}


 //move players
 if (wPressed == true && playerOneY > 5) {
 playerOneY -= 5;
 }
 if ((sPressed == true) && (playerOneY < (((canvas.height - padLength) - 10)))) {
 playerOneY += 5;
 }

 if (upPressed == true && playerTwoY > 5) {
 playerTwoY -= 5;
 }
 if ((downPressed == true) && (playerTwoY < (((canvas.height - padLength)) - 10)))  {
 playerTwoY += 5;
 }

 drawPlayer();
 drawBall();
 bounceLogic();
}




setInterval(draw,10);
