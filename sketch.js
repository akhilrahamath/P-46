
var END=0;
var PLAY=1;
var gameState=PLAY;
var bg,bgimage;
var ground;
var Hero,HeroImage;
var Enemy,enemyImage,Enemygroup;
var cloud,cloudImage1,cloudImage2,cloudImage3,cloudImage4,cloudgroup;
var Heroimg2,enemyimg2;


function preload(){
 HeroImage=loadAnimation("Images/Hero Walking 1.png","Images/Hero Walking 2.png","Images/Hero Walking 3.png","Images/Hero Walking 4.png","Images/Hero Walking 5.png");
 
 cloudImage1=loadImage("Images/Cloud_1.png");
 cloudImage2=loadImage("Images/Cloud_2.png");
 cloudImage3=loadImage("Images/Cloud_3.png");
 cloudImage4=loadImage("Images/Cloud_4.png");

 enemyImage=loadAnimation("Images/Enemy_Walking_1.png","Images/Enemy_Walking_2.png","Images/Enemy_Walking_3.png","Images/Enemy_Walking_4.png","Images/Enemy_Walking_5.png","Images/Enemy_Walking_6.png","Images/Enemy_Walking_7.png");

 bgimage=loadImage("Images/Background.jpg");

 Heroimg2=loadAnimation("Images/Hero Walking 1.png");

 enemyimg2=loadAnimation("Images/Enemy_Walking_1.png");
}

function setup(){
createCanvas(1800,800);

bg=createSprite(900,400,2500,800);
bg.addImage(bgimage);
bg.scale=1.5;
bg.velocityX=-5;

Hero=createSprite(200,790);
Hero.addAnimation("Hero",HeroImage);

Hero.addAnimation("collided",Heroimg2);

ground = createSprite(2200,790,9000,40); 
ground.x = ground.width/4;
ground.shapeColor="brown";
ground.velocityX=-4;

Enemygroup=createGroup();
cloudgroup=createGroup();
}

function draw(){
  background(0);

  if(gameState===PLAY){
   if(bg.x<600){
     bg.x=bg.width/2;
   }

   if(Enemygroup.isTouching(Hero)){
    gameState=END;
   }

   if(keyDown("space")){
     Hero.velocityY=-16;  
   }

   Hero.velocityY = Hero.velocityY + 0.8;

   if (ground.x < 0){
    ground.x = ground.width/4;
  }

   spawnClouds();

   spawnEnemy();
 }
 
 if(gameState===END){
   bg.velocityX=0;
   ground.velocityX=0;
   Hero.velocityX=0;
   Enemygroup.setVelocityXEach(0);
   cloudgroup.setVelocityXEach(0);

   Hero.changeAnimation("collided",Heroimg2);
   Enemygroup.changeAnimation("collided",enemyimg2);
 }  
 Hero.collide(ground);
 drawSprites();
}

function spawnClouds(){
  if(frameCount%150===0){
   cloud=createSprite(2200,50,20,10);
   cloud.y=Math.round(random(10,200));
   cloud.scale=0.5;
   var rand=Math.round(random(1,4));
   switch(rand){
       case 1:cloud.addImage(cloudImage1);
       break;
       case 2:cloud.addImage(cloudImage2);
       break;
       case 3:cloud.addImage(cloudImage3);
       break;
       case 4:cloud.addImage(cloudImage4);
       break;
       default:break;
   }
   cloud.velocityX=-4;
   cloudgroup.add(cloud);
  }  
}

function spawnEnemy(){
  if(frameCount%200==0){
   Enemy=createSprite(2200,790);
   Enemy.addAnimation("Enemy",enemyImage);
   Enemy.addAnimation("collided",enemyimg2);
   Enemy.scale=0.7;
   Enemy.velocityX=-7;
   Enemy.collide(ground);
   Enemygroup.add(Enemy);
  }  
}