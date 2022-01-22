const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ground, ground2;
var box1, box2, pig1, log1;
var box3, box4, pig2, log2;
var box5, log3, log4;
var bird;
var bgImage;
var clog, sling;
var score = 0;
var gameState = "onSling"; 

function preload(){
  bgImage = loadImage("./sprites/bg.png");
  getBackgroundImage();
}

function setup() {
  createCanvas(800,400);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(400,390,800,20);
  ground2 = new Ground(100,304,240,153); 
  //rectMode(CENTER) is used 

  bird = new Bird(220, 100);
  
  box1 = new Box(500, 300, 70, 70);
  box2 = new Box(700, 300, 70, 70);

  pig1 = new Pig(600, 300);

  log1 = new Log(600,250,300,PI/2);

  box3 = new Box(500, 200, 70, 70);
  box4 = new Box(700, 200, 70, 70);

  pig2 = new Pig(600, 200);

  log2 = new Log(600, 150, 300, PI/2);

  box5 = new Box(600, 100, 70, 70);
  log3 = new Log(530, 100, 150, PI/7);
  log4 = new Log(660, 100, 150, -PI/7);

  //clog = new Log(230, 180, 80, PI/2);

  sling = new SlingShot(bird.body, {x:175, y:50});

  //console.log(pig1)
}

function draw() {

  imageMode(CORNER);
  background(bgImage); 

  //This is creating multiple images
  //if(bgImage){}
  //imageMode(CENTER);
  //image(bgImage, width/2, height/2,width,height);

  noStroke();
  textSize(15);
  fill("white");
  text("Score: "+score, width-100, 25);

  Engine.update(engine);
  
  ground.display(); 
  ground2.display(); 

  box1.display();
  pig1.display();
  pig1.score()
  box2.display();
  log1.display();

  box5.display();
  pig2.display();
  pig2.score()
  box4.display();
  log2.display();

  box3.display();
  log3.display();
  log4.display();

  bird.display();

  //clog.display();
  sling.display();

  //text(mouseX+" , "+mouseY, mouseX, mouseY);
}

function mouseDragged(){
  //to stop dragging after launch
  //if(gameState !== "launched"){
    Matter.Body.setPosition(bird.body, {x:mouseX, y:mouseY});
  //}
}

function mouseReleased(){
  sling.fly();
  gameState = "launched";
}

function keyPressed(){
  if(keyCode==32){
    bird.trajectory = [];
    Matter.Body.setPosition(bird.body,{x:220, y:100});
    sling.attach(bird.body);
  }
}

async function getBackgroundImage(){
  var url = "http://worldtimeapi.org/api/timezone/Asia/Kolkata";
  var response = await fetch(url);
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  //console.log(hour);

  if(hour>=6 && hour<=19){
    bgImage = loadImage("sprites/bg.png");
  }else{
    bgImage = loadImage("sprites/bg2.jpg");
  }

}

