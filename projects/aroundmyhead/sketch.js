let svg;
let cur = [];

let bg;

function preload() {
   svg = loadImage('assets/myhead.svg');
   cur[0] = loadImage('assets/mouse.svg');
   cur[1] = loadImage('assets/mouse1.svg');
   cur[2] = loadImage('assets/mouse2.svg');
   bg = loadImage('assets/noise.png');

 }

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  imageMode(CENTER);
  image(bg,0,0,width,height);

  noCursor();
}

function draw() {
  let c1 = map(mouseX,0,width,0,50);
  let c2 = map(mouseY,0,height,0,50);

  background(245+c1,250,245+c2);

  image(bg,width/2 ,height/2 ,width,height);
  let moveX = map(mouseX,0,width,-10,10);
  let moveY = map(mouseY,0,height,-4,4);

  push();
  translate(width/2,height/2);
  stroke(20,35,58);
  fill(20,35,58,30);
  //fill(255);
  ellipse(-37+moveX,0+moveY,12,12);
  ellipse(37+moveX,0+moveY,12,12);
  pop();

  image(svg, width/2 , height/2, 220, 237);

  let test = int(random(0,3));
  //print(test)
  image(cur[test],mouseX,mouseY,43,43);

  image(bg,width/2 ,height/2 ,width,height);
}
