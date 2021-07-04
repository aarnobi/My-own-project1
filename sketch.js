//making variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var spaceShip,spaceShipImage,asteroids,asteroidsImage,asteroidGroup;
var earth,earthImage,mars,marsImage,bgImage,lazer,lazerImage,lazerGroup;

//function to load images
function preload(){
  spaceShipImage = loadImage("Images/spaceShip.png");
  asteroidsImage = loadImage("Images/asteroid.png");
  earthImage = loadImage("Images/Earth.png");
  marsImage = loadImage("Images/Mars.png");
  bgImage = loadImage("Images/Space.jpg");
  lazerImage = loadImage("Images/lazerBeam.jpg");
}

function setup() {
//creating sprites
  createCanvas(800,400);
  spaceShip = createSprite(220,200);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.2;

  earth = createSprite(100,200);
  earth.addImage(earthImage);
  earth.scale = 0.5;

  mars = createSprite(600,200);
  mars.addImage(marsImage);
  mars.scale = 0.5;

 //making group
  asteroidGroup = createGroup();
  lazerGroup = createGroup();

  score = 0;
  
}

function draw() {
  background(bgImage);

  //displaying score
  text("Score: "+ score, 500,50);
  if(gameState === PLAY){
 
    score =score + Math.round(getFrameRate()/60);
  

    spaceShip.y = World.mouseY;
    //release lazer to destroy the asteroids when space key is pressed
    if (keyDown("space")){
      createLazers();
    }

    if(lazerGroup.isTouching(asteroids)){
      asteroidGroup.destroyEach();
    }
  }
  
  //czlling the group
  spawnAsteroids();
  drawSprites();

  
}

//function to spawn asteroids
function spawnAsteroids(){
  if(frameCount % 50 === 0){
    var obstacle = createSprite(800,200,40,50);
    obstacle.velocityX = -(5);
    obstacle.y = Math.round(random(90,200));
    obstacle.addImage(asteroidsImage);
    obstacle.scale = 0.4;
    asteroidGroup.add(obstacle);
  }

  //function to create lazers
  function createLazers(){
    var lazer = createSprite(230,230,60,10);
    lazer.addImage(lazerImage);
    lazer.x = 360;
    lazer.y = spaceShip.y;
    lazer.velocityX = 5;
    lazer.lifetime = 100;
    lazer.scale = 0.3;
    lazerGroup.add(lazer);
  }
}