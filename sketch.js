var canvas

var balls = [];

var cvalue = 0;
var fade = 1;

let font;
let permissionGranted = false;
let cx, cy;


function preload() {
  font = loadFont('assets/SpaceGrotesk-Regular.ttf');
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');

  background(255);

  cx = width/2;
  cy = height/2;

  textFont(font);
  textAlign(CENTER);
  text("Tilt your Phone!", width/2, height/3);
  textAlign(RIGHT);
  text("created by Pascal Struck", width-20, height-20);

  colorMode(HSB,255,100,100);

  // DeviceOrientationEvent, DeviceMotionEvent
  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    // ios device

    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        // show permission dialog only the first time
        let button = createButton("allow access to motion sensors");
        button.style("font-size", "24px");
        button.center();
        button.mousePressed( requestAccess );
        throw error;
      })
      .then(() => {
        // on any subsequent visits
        permissionGranted = true;
      })
  } else {
    // non ios device
    permissionGranted = true;
  }
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
  .catch(console.error);

  this.remove();
}

function draw() {
  if (!permissionGranted) return;

  //background(255);
  /*eyes bottom right
  ellipseMode(CENTER);
  const ex = constrain(rotationY, -10, 10);
  const ey = constrain(rotationX, -10, 10);
  fill(255);
  ellipse(width-160, height-80,60,60);
  ellipse(width-80, height-80,60,60);
  fill(0);
  ellipse(width-160+ex,height-80+ey,25,25);
  ellipse(width-80+ex,height-80+ey,25,25);*/

  if (cvalue > 255 || cvalue < 0) {
    fade = fade* -1;
  }
  cvalue = cvalue + fade;

  //print(cvalue);

  const dx = constrain(rotationY, -3, 3);
  const dy = constrain(rotationX, -3, 3);
  cx += dx;
  cy += dy;
  cx = constrain(cx, 0, width);
  cy = constrain(cy, 0, height);

  for (var i = 0; i < balls.length; i++){
    balls[i].draw();
    balls[i].update();
  }

  for (var j = 0; j < balls.length; j++){
    if (balls[j].radius < 0){
	  balls.splice(j, 2);
	}
  }


  for (var i = 0; i < 5; i++){
    balls.push(new Ball(cx, cy, color(0,0,0)));
    //balls.push(new Ball(mouseX, mouseY, color(0,0,0)));
  }

}

class Ball{

  //start where the user clicks
  //move up from where the user has clicked
  //become smaller as it moves up
  //be drawn to the screem

  constructor(mX, mY, c){
    this.location = createVector(mX, mY);
	this.radius = random(10, 20);
    this.xOff = 0.0;
    this.yOff = 0.0;
  }

  update(){
    this.radius -= random(0.25, 0.6);

    this.xOff = this.xOff + random(-0.5, 0.5);
    this.nX = noise(this.location.x) * this.xOff;

    this.yOff = this.yOff + random(-0.5, 0.5);
    this.nY = noise(this.location.y) * this.yOff;

    this.location.x += this.nX;
    this.location.y += this.nY;
}

  draw(){
    strokeWeight(0.2);
    fill(cvalue, 60,100);
    //fill(cvalue, 200, 255-cvalue);
    ellipse(this.location.x, this.location.y, this.radius, this.radius);
  }
}
