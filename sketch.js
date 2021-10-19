var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup= new Group ()
  climbersGroup= new Group ()
  invisibleBlockGroup= new Group ()
  ghost= createSprite (200,200,50,50)
  ghost.addImage (ghostImg)
  ghost.scale = 0.3
}

function draw() {
  background(200);
  if (gameState == "play") {
  //if (!spookySound.isPlaying ()) {
  //  spookySound.play ()
 // }
  
  drawSprites ()
  if(tower.y > 400){
      tower.y = 300
    }
  if (keyDown ("Left")) {
    ghost.x = ghost.x-3
  }
  if (keyDown ("Right")) {
    ghost.x = ghost.x+3
  }
  if (keyDown ("Space")) {
    ghost.velocityY = -7
  }
  ghost.velocityY = ghost.velocityY + 0.8
  spawndoors()
  if (climbersGroup.isTouching (ghost)){
    ghost.velocityY=0
  }
  if (ghost.y > 600 || invisibleBlockGroup.isTouching (ghost)) {
    ghost.destroy ()
    gameState = "end" 
  }
}
else if (gameState == "end") {
stroke("yellow") 
fill ("yellow")
textSize (30)
text ("Game over", 230,250) 
}
}
function spawndoors (){
  if (frameCount %250 == 0 ) {
  door=createSprite (200,-50)
  door.addImage (doorImg)
  door.x= Math.round(random (120,400))
  door.velocityY = 1 
  door.lifetime = 800
  doorsGroup.add (door)

  climber=createSprite (200,10)
  climber.addImage (climberImg)
  climber.x=door.x
  climber.velocityY = 1
  climber.lifetime = 800
  climbersGroup.add (climber)

  invisibleBlock=createSprite (200,15)
  invisibleBlock.width=climber.width
  invisibleBlock.height=2
  invisibleBlock.x = door.x
  invisibleBlock.debug=true
  invisibleBlock.visible=false
  invisibleBlock.velocityY=1
  invisibleBlockGroup.add (invisibleBlock) 

  ghost.depth = invisibleBlock.depth +1
  }


}