var background,backgroundImage, coin, coinImage
var gameOver, gameOverImage, restrt, restrtImage
var character, characterImage, obstacle, obstacleImage,invisibleGround, skeleton, skeletonImage
var score ;
var coins;
var PLAY=1;
var PLAY2=2
var END = 3;
var gameState =PLAY;
var coinsGroup, obstaclesGroup, skeletonsGroup

function preload()
{  
  backgroundImage=loadImage("background.jpg")
  gameOverImage=loadImage("gameOver.png");
  restrtImage=loadImage("restart.png");
  characterImage=loadAnimation("sprite1.png","sprite2.png","sprite3.png","sprite4.png","sprite5.png","sprite6.png",
  "sprite7.png","sprite8.png")
  
  obstacleImage=loadAnimation("obstacle1.png","obstacle2.png",
                              "obstacle3.png","obstacle4.png","obstacle5.png","obstacle6.png")
  
  skeletonImage=loadAnimation("skeleton1.png",
                              "skeleton2.png","skeleton3.png","skeleton4.png",
  "skeleton5.png")
  
  coinImage=loadAnimation("coin1.png","coin2.png",
                          "coin3.png","coin4.png","coin5.png","coin6.png")
}

function setup() 
{
 createCanvas(windowWidth,windowHeight);
  
 background=createSprite(200,200)
 background.addImage("background",backgroundImage)
 background.scale=1.2;
 background.x = background.width /2;
 background.velocityX = -6

 gameOver=createSprite(300,180)
 gameOver.addImage("gameOver", gameOverImage);
 gameOver.scale=0.2;
 gameOver.visible=false;
 
 restrt=createSprite(300,260)
 restrt.addImage("restrt",restrtImage);
 restrt.scale=0.2
 restrt.visible=false;
  
  character=createSprite(55,370);
  character.addAnimation("character", characterImage)
  character.scale=0.5
  character.debug=false
  character.setCollider("rectangle",0,0,50,90)
  
  invisibleGround = createSprite(55,450);
  invisibleGround.visible = false;
 
  score=0;
  coins=0;
  
  coinsGroup= new Group();
  obstaclesGroup= new Group();
  skeletonsGroup= new Group();
}

function draw() 
{

   if (gameState===PLAY){
  
    if (background.x < 0){
      background.x = background.width/2;
    }

      background.velocityX = -6;
     
      score = score + Math.round(getFrameRate()/60); 
     
     
      if(keyDown("space") && character.y >= 345) {
      character.velocityY = -12;
    }
  
   character.velocityY = character.velocityY + 0.8
     
      
  
   character.collide( invisibleGround)
     
    spawnObstacles();
     spawnCoins();
    
     
     if(obstaclesGroup.isTouching(character))
    {
       gameState=END;
      
    }
     
     if(coinsGroup.isTouching(character))
     {
       coins=coins+1
       coinsGroup.destroyEach();
     }
     
    if(score===250)
    {
      gameState=PLAY2
      obstaclesGroup.destroyEach();
    }
     
     drawSprites();
     fill("black");
     textSize(17);
     text("For a new obstacle",230,40);
     text("score should be 250",240,60)
     
     
   }  
    
     else if (gameState===END)
     {
    gameOver.visible = true;
    restrt.visible = true;
    
    background.velocityX = 0;
    character.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    
       
     obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
       skeletonsGroup.setLifetimeEach(-1);
       
       coin.depth=restrt.depth;
       restrt.depth=restrt.depth+1;

       
    if(mousePressedOver(restrt))
    {
      reset();
    }
       
       drawSprites();
    
  }
     
  else if (gameState===PLAY2)
  {
        if (background.x < 0){
      background.x = background.width/2;
    }

      score = score + Math.round(getFrameRate()/60); 
      
     
      if(keyDown("space") && character.y >= 354) {
      character.velocityY = -12;
    }
  
   character.velocityY = character.velocityY + 0.8
  
   character.collide( invisibleGround)
    
    background.velocityX=-6
     
    
   spawnSkeletons();
   spawnCoins();
    
      if(skeletonsGroup.isTouching(character))
    {
       gameState=END;

    }
     
     if(coinsGroup.isTouching(character))
     {
       coins=coins+1
       coinsGroup.destroyEach();
    }
    
    drawSprites();
  }

  
  fill("black");
  textSize(17);
  text("Score: "+ score, 490,50); 
  text("Coins: "+ coins, 90,50);
  

}

function spawnObstacles()
{
  if(frameCount % 80 === 0) {
    obstacle = createSprite(600,365,10,40);
    obstacle.velocityX = -6
    obstacle.addAnimation("obstacle", obstacleImage);
    obstacle.scale=0.25;
    
    obstacle.lifetime=100
    
    obstaclesGroup.add(obstacle);
  }
}

function spawnSkeletons()
{
  
  if(frameCount % 40 === 0) {
    skeleton = createSprite(600,370,10,40);
    skeleton.velocityX = -15;
    skeleton.addAnimation("skeleton", skeletonImage);
    skeleton.scale=0.2;
    
    skeleton.lifetime=70
    
    skeletonsGroup.add(skeleton);
  }
}


function spawnCoins()
{
  
  if(frameCount % 60 === 0) {
    coin = createSprite(600,350,10,40);
    coin.velocityX = -6
    coin.y = Math.round(random(250,320));
    coin.addAnimation("coin", coinImage);
    coin.scale=0.2;
    
    coin.lifetime=100
    
    coinsGroup.add(coin);
  }
}

function reset()
{
    gameState = PLAY;
  gameOver.visible = false;
  restrt.visible = false;
  
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  skeletonsGroup.destroyEach();
  
  
  score = 0;
  coins=0;
}