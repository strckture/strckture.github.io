let svg;

function preload() {
   // gSVGImg = loadImage('Akun.svg');
   svg = loadImage('assets/myhead.svg');
 }

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  imageMode(CENTER);
}

function draw() {
  background(255);

  let moveX = map(mouseX,0,width,-15,15);
  let moveY = map(mouseY,0,height,-6,6);

  push();
  translate(width/2,height/2);
  stroke(20,35,58);
  fill(0,40);
  ellipse(-61+moveX,0+moveY,20,20);
  ellipse(60+moveX,0+moveY,20,20);
  pop();

  image(svg, width/2 , height/2);

}
