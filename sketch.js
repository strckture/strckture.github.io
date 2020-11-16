///////////////////////////////////////

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

///////////////////////////////////////

var t = 0; 

var bg = '#000000';  
var c1 = '#3E00F6';  
var c2 = '#2FD0C6';
var c3 = '#FFFFFF';

var scl = 6;
var g_rad = 100;
var g_teeth = 36;
var yoffset = 83;
var xoffset = 170;

var grip = -0.01;
var grip2 = 0.06;
var grip3 = 0.07;

var pw = 175;
var ph = 175;

var speed = 0;

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
}

function draw() {
  background(bg);
  noStroke();
  //stroke(255);

  //gear1 (+)
  fill(c2);
  gear(0+xoffset,height/2,t,g_teeth,g_rad,8);
  fill(c3);
  pointer(0+xoffset,height/2,t,pw,ph);
  fill(c1);
  gear(0+xoffset,height/2,t,g_teeth/scl,g_rad/scl,6);

  //gear2 (-)
  fill(c1);
  gear(83+xoffset,height/2+yoffset,grip-t/scl,g_teeth,g_rad,8);
  fill(c3);
  pointer_n(83+xoffset,height/2+yoffset,-t/scl,pw,ph);
  fill(c2);
  gear(83+xoffset,height/2+yoffset,-t/scl,g_teeth/scl,g_rad/scl,6);

  //gear3 (+)
  fill(c2);
  gear(200+xoffset,height/2+yoffset,grip2+t/(pow(scl,2)),g_teeth,g_rad,8);
  fill(c3);
  pointer(200+xoffset,height/2+yoffset,t/(pow(scl,2)),pw,ph);
  fill(c1);
  gear(200+xoffset,height/2+yoffset,t/(pow(scl,2)),g_teeth/scl,g_rad/scl,6);

  //gear4 (-)
  fill(c1);
  gear(283+xoffset,height/2,grip3-t/(pow(scl,3)),g_teeth,g_rad,8);
  fill(c3);
  pointer_n(283+xoffset,height/2,-t/(pow(scl,3)),pw,ph);
  fill(c2);
  gear(283+xoffset,height/2,(-t/(pow(scl,3))),g_teeth/scl,g_rad/scl,6);

  //gear5 (+)
  fill(c2);
  gear(400+xoffset,height/2,grip2+t/(pow(scl,4)),g_teeth,g_rad,8);
  fill(c3);
  pointer(400+xoffset,height/2,+t/(pow(scl,4)),pw,ph);
  fill(c1);
  gear(400+xoffset,height/2,0+t/(pow(scl,4)),g_teeth/scl,g_rad/scl,6);

  //gear6 (-)
  fill(c1);
  gear(483+xoffset,height/2+yoffset,grip-t/(pow(scl,5)),g_teeth,g_rad,8);
  fill(c3);
  pointer_n(483+xoffset,height/2+yoffset,-t/(pow(scl,5)),pw,ph);
  fill(c2);
  gear(483+xoffset,height/2+yoffset,-t/(pow(scl,5)),g_teeth/scl,g_rad/scl,6);

  //gear7 (+)
  fill(c2);
  gear(600+xoffset,height/2+yoffset,grip2+t/(pow(scl,6)),g_teeth,g_rad,8);
  fill(c3);
  pointer(600+xoffset,height/2+yoffset,t/(pow(scl,6)),pw,ph);
  fill(c1);
  gear(600+xoffset,height/2+yoffset,t/(pow(scl,6)),g_teeth/scl,g_rad/scl,6);

  //gear8 (-)
  fill(c1);
  gear(683+xoffset,height/2,grip3-t/(pow(scl,7)),g_teeth,g_rad,8);
  fill(c3);
  pointer_n(683+xoffset,height/2,-t/(pow(scl,7)),pw,ph);
  fill(c2);
  gear(683+xoffset,height/2,-t/(pow(scl,7)),g_teeth/scl,g_rad/scl,6);

  //gear9 (+)
  fill(c2);
  gear(800+xoffset,height/2,grip2+t/(pow(scl,8)),g_teeth,g_rad,8);
  fill(c3);
  pointer(800+xoffset,height/2,t/(pow(scl,8)),pw,ph);
  fill(c1);
  gear(800+xoffset,height/2,t/(pow(scl,8)),g_teeth/scl,g_rad/scl,6);

  //gear10 (-)
  fill(c1);
  gear(883+xoffset,height/2+yoffset,grip-t/(pow(scl,9)),g_teeth,g_rad,8);
  fill(c3);
  pointer_n(883+xoffset,height/2+yoffset,-t/(pow(scl,9)),pw,ph);
  fill(c2);
  gear(883+xoffset,height/2+yoffset,-t/(pow(scl,9)),g_teeth/scl,g_rad/scl,6);

  //gear11 (+)
  fill(c2);
  gear(1000+xoffset,height/2+yoffset,grip2+t/(pow(scl,10)),g_teeth,g_rad,8);
  fill(c3);
  pointer(1000+xoffset,height/2+yoffset,t/(pow(scl,10)),pw,ph);
  fill(c1);
  gear(1000+xoffset,height/2+yoffset,t/(pow(scl,10)),g_teeth/scl,g_rad/scl,6);

  //gear12 (-)
  fill(c1);
  gear(1083+xoffset,height/2,grip3-t/(pow(scl,11)),g_teeth,g_rad,8);
  fill(c3);
  pointer_n(1083+xoffset,height/2,-t/(pow(scl,11)),pw,ph);


  //let s = map(millis(), 0, 1000, 0, TWO_PI);
  let s = map(millis(), 0, 3900, 0, TWO_PI);

  
  t = s+speed;

  if (keyIsPressed === true) {
    speed += 2;
  }


  fill(c3);
  textSize(24);
  textFont('Andale Mono');
  text("Cleopatra vs The Universe", 100, 150);
}

//gear(xpos,ypos,angle,numberofteeth,radius,insetheight)
function gear(x, y, angle, z, r, h) {
  push();
  translate(x, y);
  rotate(angle);
  beginShape();
  for (i=0; i<z; i++) {
    vertex((r-h/2)*cos(TWO_PI*i/z-(PI/z)/2), (r-h/2)*sin(TWO_PI*i/z-(PI/z)/2));
    vertex((r+h/2)*cos(TWO_PI*i/z-(PI/z)/4), (r+h/2)*sin(TWO_PI*i/z-(PI/z)/4));
    vertex((r+h/2)*cos(TWO_PI*i/z+(PI/z)/4), (r+h/2)*sin(TWO_PI*i/z+(PI/z)/4));
    vertex((r-h/2)*cos(TWO_PI*i/z+(PI/z)/2), (r-h/2)*sin(TWO_PI*i/z+(PI/z)/2));
  }
  endShape(CLOSE);
  pop();
}

function pointer(x ,y , angle, w, h) {
  push();
  translate(x,y);
  arc(0,0,w,h,0-HALF_PI,0.02+angle-HALF_PI);
  pop();
}

function pointer_n(x ,y , angle, w, h) {
  push();
  translate(x,y);
  arc(0,0,w,h,-0.02+angle-HALF_PI,0-HALF_PI);
  pop();
}