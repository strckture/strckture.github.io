let x; //LOC
let y;

let count = 0;

var score = 0;

let xMove = 5; //VEL
let yMove = -5;

const sizePong = 10;
var widthPlayer = 100;
const heightPlayer = 10;
const handleOffset = 50;

let test;

let health = 3;

function preload() {
  test = loadFont('assets/font.ttf');
}

function setup() {
  //createCanvas(640,480);
  createCanvas(windowWidth,windowHeight);
  background(0);

  rectMode(CENTER);

  x = random(0,width-10);
  y = random(0,height-handleOffset);

  noCursor();
  textFont(test);

  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 5;
}

function draw() {
  background(0);

  //Pong
  drawingContext.shadowColor = color(255,120,100);
  fill(255,120,100,200+random(55));
  noStroke();
  rect(x,y,sizePong,sizePong);

  if (score == 10 ){
    widthPlayer = 60;
  }
  if (score == 50 ){
    widthPlayer = 20;
  }

  //Handle
  //drawingContext.shadowColor = color(241,230,11);
  drawingContext.shadowColor = color(187,246,255);
  fill(187,246,255,200+random(55));
  //rect(mouseX, height-handleOffset,widthPlayer,heightPlayer);
  drawHandle(mouseX, height-handleOffset,widthPlayer,heightPlayer);



  x += xMove;
  y += yMove;

  if(x<=sizePong/2 ||x>=width-sizePong/2){
    xMove=-xMove;
  }

  if(y<=sizePong/2){
    yMove=-yMove;
  }

  //Player
  if((height-handleOffset-sizePong/2-heightPlayer/2<=y)&&(y<=height+sizePong/2)&&(yMove>0)&&(mouseX-widthPlayer*0.6<=x)&&(x<=mouseX+widthPlayer*0.6)){
    yMove=-(yMove+0.3);
    if(xMove>0) {
      xMove+=0.3;
    } else {
      xMove-=0.3;
    }
  score+=1;
  }

  //Score
  textSize(20);
  textAlign(LEFT);
  text("Score: "+score,width*0.1,height*0.1);

  if(y>=height){
    health = health-1;
    x = width*0.8;
    y = height*0.1;
  }

  for(let i = 0; i< health; i++) {
    rect(width*0.8+i*sizePong*1.5, height*0.1-sizePong/2, sizePong,sizePong)
  }

  //GameOver
  if(health <= -1){
    y = height+10;
    count= 5+count;
    background(0,count);

    textSize(width/10);
    fill(187,246,255,200+random(55));
    textAlign(CENTER);
    text("GAME OVER",width/2,height*0.45);
    textSize(width/30)
    text("Score: "+score,width/2,height*0.5);
  }

}

function drawHandle(x,y,b,h) {
  push();
  translate(x-b/2,y);
  for (let i = 0; i<b/h; i++){
    rect(i*h*1.1,0,h,h)
  }
  pop();
}
