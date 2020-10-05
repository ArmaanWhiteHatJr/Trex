
// declaring variables
var trex ,trex_running, trexCo;
var ground , groundImg, invGround;
var score, hiScore;
var PLAY,END,gameState;    
var cloud, cloudImage,badalGroup; 
var obstacle,obsGroup, cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;
var gameOver,reset,resetImg,gameOverImg;
var jumpSound,die,checkPoint;
var flag;

//uploading animations in function preload
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCo = loadImage("trex_collided.png");
  
  groundImg = loadImage("ground2.png");
  
  resetImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  
  jumpSound = loadSound("jump.mp3");  
  dieSound = loadSound("die.mp3"); 
  checkSound = loadSound("checkPoint.mp3");
  
  cloudImage = loadImage("cloud.png");
  
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
}


//Adding a basic structure to the game
function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //create a trex sprite
  trex = createSprite(50,height-130,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trexCo);
  trex.scale = 0.6;
  trex.debug = false; 
  trex.setCollider("rectangle",0,0,70 ,100);  

  //creating the ground 
  ground = createSprite(width/2,height-150,600,4);
  ground.addAnimation("moving",groundImg);
  ground.x = ground.width/2;
  ground.debug = false;
  
  //creating the invisible ground
  invGround = createSprite(50,height-125,200,4);
  invGround.visible = false;
  
  flag = 0;
  
  score = 0;
  hiScore = 0;
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  obsGroup = createGroup();
  badalGroup = createGroup();
  
  reset = createSprite(width/2,(height/2)+50,30,30);
  reset.addImage("restart",resetImg);
  reset.scale = 0.5;
  
  
  gameOver = createSprite(width/2,height/2,70,10);
  gameOver.addImage("overGame",gameOverImg);
  gameOver.scale = 0.9;
  gameOver.visible = false;
  
}

  

//Modification and overall look
function draw(){
  background("white") 
  
  //text(mouseX+","+mouseY, mouseX, mouseY); 
  text("Score:"+score,width-100,height-210);
  //console.log(trex.y);
  if(gameState == PLAY){
     
     if(flag > 0){
       fill("black");
       stroke("black");
       text("High Score:"+hiScore,width-200,height-210);
     }
    if((touches.length == 1 || keyDown("space")) && trex.y >= 139){     
        trex.velocityY = -10;   
        jumpSound.play();
        touches = [];
     }  
     trex.velocityY = trex.velocityY+0.5;
    
     ground.velocityX = -(7+score/70);
     if(ground.x < 0){
        ground.x = ground.width/2;
     }
     
    
     score = score+round(frameCount/70);
    
     
     spawnClouds();
     spawnObstacles();
     if(obsGroup.isTouching(trex)){
        gameState = END;
        dieSound.play();
        flag = flag+1;
        //trex.velocityY = -6;
        //jumpSound.play();
     }
    reset.visible = false;
    gameOver.visible = false;
  }
  if(gameState == END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.changeAnimation("collided",trexCo);
    
    obsGroup.setVelocityXEach(0);
    badalGroup.setVelocityXEach(0);       
    reset.visible = true;
    gameOver.visible = true;
    if(hiScore < score){
      hiScore = score;
    }
    fill("black");
    stroke("black");
    text("High Score:"+hiScore,width-200,height-210);
    if(mousePressedOver(reset)){
        startOver();  
    }
  }
  
  trex.collide(invGround); 
  drawSprites();  
} 


//create cloud function

 function spawnClouds(){
  if(frameCount % 30 == 0){
     cloud = createSprite(width,height-200,10,10);
     cloud.velocityX = -4;
     cloud.y = random(height-275,height-200); 
     cloud.depth = trex.depth;
     trex.depth = trex.depth+1;
     cloud.debug = false;
     cloud.addImage("cloud",cloudImage);
     cloud.scale = 0.5;
     badalGroup.add(cloud);
  }
 }
 
 function spawnObstacles(){
   if(frameCount % 60 == 0){ 
     obstacle = createSprite(width,height-160,20,50);
     obstacle.velocityX = -(7+score/120); 
     obstacle.debug = false;
  
     
     var xyz = random(1,6);
     switch(xyz)//switch case passes a single variable to match with cases
     {
       case 1: obstacle.addImage("cactus1",cactus1);
               break;
       case 2: obstacle.addImage("cactus2",cactus2);
               break;
       case 3: obsctacle.addImage("cactus3",cactus3);
               break;
       case 4: obstacle.addImage("cactus4",cactus4);
               break;
       case 5: obstacle.addImage("cactus5",cactus5);
               break;
       case 6: obsctacle.addImage("cactus6",cactus6);
               break;
      default: obstacle.addImage("cactus1",cactus1); 
               break;
     }
     
     
     obsGroup.add(obstacle);     
   }
 }

//function to reset and startOver
function startOver(){
    gameState = PLAY; 
    badalGroup.destroyEach();
    obsGroup.destroyEach();
    trex.changeAnimation("running",trex_running);
    if(hiScore < score){
      hiScore = score;
    }
    score = 0;
}

