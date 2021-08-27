let svg;
let cur;

function preload() {
   // gSVGImg = loadImage('Akun.svg');
   svg = loadImage('assets/myhead.svg');
   cur = loadImage('assets/mouse.svg');
 }

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  imageMode(CENTER);

  noCursor();
}

function draw() {
  background(200,200,255);

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

  image(cur,mouseX,mouseY,30,30);

}
