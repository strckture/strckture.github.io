let svg;
let cur = [];

let bg;

function preload() {
   // gSVGImg = loadImage('Akun.svg');
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
  background(255);

  background(mouseX,200,mouseY);
  //background(mouseX,200,mouseY);
  //background("#FFD3D3");

  // image(cur,mouseX,mouseY);
  image(bg,width/2 ,height/2 ,width,height);
  //fill(255,0,0);
  //ellipse(mouseX,mouseY,30,30);

  let moveX = map(mouseX,0,width,-10,10);
  let moveY = map(mouseY,0,height,-4,4);

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
