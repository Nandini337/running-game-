var PLAY =1;
var END =0;
var gameState= PLAY;
var obstacle1,obstacle2,obstacle3;
var woman;
var ground;
var backgroundImage;
var grassImage,invisibleGround;
var score=0;
var highScore=0;
var gameOverImage;
var restartImage;
var jumpSound;
function preload(){

woman_running=loadAnimation("girl1.png","girl2.png","girl3.png","girl4.png");
obstacle1=loadImage("log.png");
obstacle2=loadImage("fire.png");
obstacle3=loadImage("rocks.png");  
backgroundImage=loadImage("forest.png");
grassImage=loadImage("grass.png");
gameOverImg=loadImage("gameover .png");
restartImage=loadImage("restart .png");
jumpSound = loadSound("jump.mp3");
  
} 
function setup() {
  createCanvas(1000, 800);
  woman = createSprite(50,735,20,50)
  woman.addAnimation("running", woman_running);
  woman.scale=0.7;
  ground=createSprite(0,750,0,1000);
  ground.addImage(grassImage);
  ground.scale=0.1;
  invisibleGround = createSprite(50,750,700,20);
  invisibleGround.visible = false;
  gameOverImage = createSprite(500,400,50,50);
  gameOverImage.addImage(gameOverImg);
  gameOverImage.scale=0.4;
  restartImage = createSprite(500,600,50,50);
  
}

function draw() {
  background(backgroundImage);
//displaying score
stroke("blue");
textSize(20);
text("Score: "+ score, 850,300);
if(highScore>score){
  text("highScore: "+ highScore, 400,300);
}

console.log("this is ",gameState)
if(gameState === PLAY){
  gameOverImage.visible = false
  restartImage.visible = false
   //move the ground
   ground.velocityX = -4;
  //scoring
  score = score + Math.round(getFrameRate()/60);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }


ground.velocityX=-3;
if(ground.x<0){
  ground.x=800
}
 
 woman.collide(invisibleGround);
  
 if(keyDown("space")&& woman.y >= 100) {
woman.velocityY = -10;
jumpSound.play()

}

woman.velocityY = woman.velocityY + 0.8
woman.setCollider("rectangle",20,60,20,50);
  //woman.debug=true
}

 
 else if (gameState === END) {
  console.log("hey")
   gameOver.visible = true;
   restart.visible = true;
      //set lifetime of the game objects so that they are never destroyed
      obstacle.setLifetimeEach(-1);
   ground.velocityX = 0;
   woman.velocityY = 0
  
  if(mousePressedOver(restart)){
    gameState=PLAY;
    obstacle.destroyEach();
    woman.changeAnimation("running", woman_running);
    
    if (highScore<score){
      highScore=score
    }
    score=0;
  }
}
obstacles();
  drawSprites();
  
}


function obstacles (){
  
  if(frameCount%200 === 0){
  obstacle = createSprite (735,770,20,20)
  obstacle.velocityX=-5
    obstacle.lifetime = 600/5
    var rand = Math.round(random(1,3)) 
    switch (rand){
      case 1 :obstacle.addImage(obstacle1)
              break  ;      
      case 2 :obstacle.addImage(obstacle2)
              break  ;
      case 3 :obstacle.addImage(obstacle3)
              break ;
      default:break;
           
    }
      obstacle.scale=0.5
  }

  
  
}
