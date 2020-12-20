var monkey , monkeyRu
var Ground;
var banana ,bananaImg, obstacle, obstacleImg;
var food,FoodGroup, obstacleGroup;
var score;
var gameState = 1;
var PLAY = 1, END = 0;
var backGr,backGrImg;
var surviveTime = 0,score = 0;
var over, overImg;
var stop;

function preload(){
  
monkeyRun =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
     bananaImg  = loadImage("banana.png");
   obstacleImg = loadImage("obstacle.png");
  
  backGrImg = loadImage("504.jpg");
  
  overImg = loadImage("222.png");
 
  stop = loadImage("sprite_5.png");
}

function setup() {
  createCanvas(600,400);
  
  backGr = createSprite(300,180,10,10);
  backGr.addImage(backGrImg);
  backGr.velocityX = -5;
  backGr.scale = 1;
  
 monkey = createSprite(80,315,10,10);
 monkey.addAnimation("many",monkeyRun);
 monkey.addAnimation("STOP",stop) 
 monkey.scale = 0.19;
 monkey.setCollider("circle",0,0,300) 
//monkey.debug = true;
  
 Ground = createSprite(600,380,1200,10);
 Ground.velocityX = -4;
 Ground.visible = false;
  
 over = createSprite(300,200,10,10);
 over.addImage(overImg);
 over.scale = 0.8; 
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
background("lightblue");
  
  
  if (gameState === PLAY){
    
    over.visible = false;
    
    if(keyDown("space") && monkey.y >= 312) {
        monkey.velocityY = -10
  }
    
   if(monkey.isTouching(FoodGroup)){
     
     score = score+1;
     FoodGroup.destroyEach();
     
   }
    
  console.log(monkey.y);
 monkey.velocityY = monkey.velocityY + 0.3;
    
    if(monkey.isTouching(obstacleGroup)){
      
      gameState = END;
    }
    
    Food();
  Obstacle();
    
  
  if (Ground.x <=0){
    Ground.x = 600;
  }
  if (backGr.x <= 0){
    backGr.x = 600;
    
  }
    drawSprites();
    stroke("white");
    textSize(20);
    fill("white");
    text("score :" + score,400,50);
    
    stroke("black")
    textSize(20);
    fill("black");
    surviveTime = Math.round(frameCount/frameRate());
    text("Timer :" + surviveTime,100,50);
    
    
   
  }
  if(gameState === END){
    
    over.visible = true;
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.velocityY = 0;
    monkey.changeAnimation("STOP",stop);
    backGr.velocityX = 0;
    Ground.velocityX = 0;
    surviveTime = 0;
    score = 0;
    drawSprites();
  }

  monkey.collide(Ground);
  
  
  
  
  
}

function Food(){
  
  if(frameCount % 120 === 0){
    
    food = createSprite(600,Math.round(random(120,200)),10,10);
    food.addImage(bananaImg);
    food.velocityX = -5;
    food.scale = 0.15;
    food.lifetime = -120;
    FoodGroup.add(food);
    
  }
}

function Obstacle(){
  
  if(frameCount % 200 === 0){
    
  obstacle = createSprite(600,335,10,10);
  obstacle.addImage(obstacleImg);
  obstacle.velocityX = -6;
  obstacle.lifetime = -100;  
  obstacle.scale = 0.21;  
  obstacleGroup.add(obstacle);  
  
  }
}

  



