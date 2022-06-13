var PLAY = 1;
var END = 0;
var gameState = PLAY;

var battery;
var robot1,robot2,robot3,robot4;
var garbage;
var metal;
var glass;
var plastic;
var bg,invisibleG,bgImage
 
var score;

var gameOverImg,restartImg;
var obstaclesGroup;
var batteryGroup,batteryImage;

function preload(){
    
batteryImg=loadImage("battery.png")
garbageImg=loadImage("garbage.png")
metalImg=loadImage("metal.png")
glassImg=loadImage("glass.png")
bgImg=loadImage("back.png")
plasticImg=loadImage("plastic.png")

robotImg = loadAnimation("robot1.png","robot2.png","robot3.png","robot4.png");

gameOverImg =loadImage("gameover.png.png") 
 restartImg=loadImage("restart.png") 



}

function setup() {
 createCanvas(400,400)
 
  bg = createSprite(200,180,400,400);
  bg.addImage("bg",bgImg);
  
  robot = createSprite(50,300,100,100);
  robot.addAnimation("running", robotImg);
  robot.scale = 0.6;

 
  invisibleG = createSprite(300,310,800,20);
  invisibleG.visible = false ;

  gameOver = createSprite(200,150,20,20);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(200,200,20,20);
  restart.addImage(restartImg);
  gameOver.scale = 0.5;
  restart.scale = 0.35;

  

  
// create Obstacles  
obstaclesGroup = createGroup();
cloudsGroup = createGroup();


console.log("Hello" + 5);

robot.setCollider("circle",0,0,40);


score=0;


}

function reset(){
  gameState=PLAY
    obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach()
  score=0
  
    
  }

function draw() {
 
  textSize(20);
text("Score: "+ score, 300,50,10,10);



if(gameState === PLAY){
  gameOver.visible = false
  restart.visible = false
 //move the ground
 bg.velocityX = -(4+score/200000);
 //scoring
 score = score + Math.round(frameCount/10);
 
if (bg.x <100){
  bg.x =200

  
}
 //jump when the space key is pressed
 if(keyDown("space")&& robot.y >= 150) {
  robot.velocityY = -5;
}

 //add gravity
 robot.velocityY = robot.velocityY + 0.8

  
   if(obstaclesGroup.isTouching(robot)){
    gameState=END;
  }

  spawnObstacles();
  spawnClouds();
}

else if (gameState === END) {
  bg.velocityX = 0;
  gameOver.visible = true;
  restart.visible = true;
 obstaclesGroup.setVelocityXEach(0);
 cloudsGroup.setVelocityXEach(0);
 if(mousePressedOver(restart)){
  reset()

}
}


robot.collide(invisibleG);


drawSprites();
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(300,280,10,20);
    obstacle.velocityX = -(6+score/20500);
  
    //generate random obstacles
     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: obstacle.addImage(plasticImg)
              break;  
       case 2: obstacle.addImage(garbageImg);
               break;
       case 3: obstacle.addImage(metalImg);
               break;
       case 4: obstacle.addImage(glassImg);
               break; 
       
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.2;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
 }
 function spawnClouds() {
  //write code here to spawn the clouds
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,350,40,10);
    cloud.y = Math.round(random(100,200));
    cloud.addImage(batteryImg);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = robot.depth ;
    robot.depth = robot.depth + 1;
    score.depth = score.depth +1.
    //adding cloud to the group
  cloudsGroup.add(cloud);
    }
}
























