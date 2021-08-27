let svg;
let cur = [];

function preload() {
   // gSVGImg = loadImage('Akun.svg');
   svg = loadImage('assets/myhead.svg');
   cur[0] = loadImage('assets/mouse.svg');
   cur[1] = loadImage('assets/mouse1.svg');
   cur[2] = loadImage('assets/mouse2.svg');

 }

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  imageMode(CENTER);

  noCursor();
}

function draw() {
  //background(200,250,255);
  background(240,255);

  // image(cur,mouseX,mouseY);

  //fill(255,0,0);
  //ellipse(mouseX,mouseY,30,30);

  let moveX = map(mouseX,0,width,-10,10);
  let moveY = map(mouseY,0,height,-3,3);

  push();
  translate(width/2,height/2);
  stroke(20,35,58);
  //fill(20,35,58,80);
  fill(255)
  // ellipse(-61+moveX,0+moveY,20,20);
  // ellipse(60+moveX,0+moveY,20,20);

  ellipse(-37+moveX,0+moveY,12,12);
  ellipse(37+moveX,0+moveY,12,12);
  pop();

  //image(svg, width/2 , height/2, 200, 215);
  image(svg, width/2 , height/2, 220, 237);

  let test = int(random(0,3));
  //print(test)

  image(cur[test],mouseX,mouseY,30,30);
}
