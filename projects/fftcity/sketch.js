let scl = 5;

let cols;
let rows;

let seed;
let resp;

var des = true;
let font;

const palette = ["#001219", "#005f73", "#0a9396", "#94d2bd", "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226"];


function preload(){
  sound = loadSound('assets/test.mp3');
  font = loadFont('assets/SpaceGrotesk-Regular.ttf');
}



function setup() {
  let cnv = createCanvas(windowWidth,windowHeight,WEBGL);
  cnv.mouseClicked(togglePlay);

  fft = new p5.FFT();


  background(0);

  textFont(font);
  textAlign(CENTER);

  ortho(-width / 2, width / 2, -height / 2, height / 2, -5000, 5000);

  seed = int(random(2,7));
  cols = min(windowWidth,windowHeight)/80;
  rows = min(windowWidth,windowHeight)/80;


  colorMode(HSB,360,100,100,100);
}


function draw() {
  randomSeed(seed);
  background(202,63,88);

  let spectrum = fft.analyze();

  push();
  ambientLight(0, 0, 80);
	directionalLight(color(30, 100, 80), 1, 0, -1);
	directionalLight(color(60, 100, 10), -1, 0, -1);
	directionalLight(color(90, 100, 20), 0, 1, 0);

  //Perspective
  translate(-width/40,0,0);
  rotateX(-35);
	rotateY(40);

  //Grid
  for (let i = 0; i< cols; i++) {
    for (let j = 0; j< rows; j++) {
      var x = 50*i;
      var z = 50*j;

      let h = random(20,150)+ map(spectrum[i+j],0,255,0,100);

      drawBuilding(x,h/2,z,int(random(20,50)),h);
    }
  }
  pop();

  push();
  if (des) {
    rectMode(CENTER);
    translate(0,0,400);
    noStroke();
    fill(0,0,100);
    rect(0,0,width,40);
    fill(0,0,0);
    textSize(16);
    text("Tap to play! Deactivate silent mode.",0,5);
  }
  pop();

}

function drawBuilding(x,y,z,b,h) {
  let c = palette[int(random(palette.length))];

  push();
  translate(x,y,z);
  drawWindows(b,h);
  push();
  rotateY(radians(90));
  drawWindows(b,h);
  pop();

  fill(c);
  noStroke();
  box(b,h,b);
  pop();
}

function drawWindows(b,h) {

  //let winHeight = 5;
  let winHeight = h-20;
  let winWidth = b/10;

  let winRows = 3;
  let winCols = h/winHeight-10;

  // push()
  // translate(b/-2, h/-2, b/2+1);
  // for (let i = 0; i< winRows; i++) {
  //   for (let j = 0; j< winCols; j++) {
  //     var px = b/5*i;
  //     var py = winHeight+5*j;
  //     //push();
  //     rectMode(CENTER)
  //     //translate(px+b/-2,py+h/-2,b/2+1);
  //     fill(70,10,100);
  //     noStroke();
  //     //rect(b/4,h/4,b/10,b/10);
  //     rect(px+b/4,py+h/6,winWidth,winHeight);
  //     //pop();
  //   }
  // }
  // pop()

  push()
  translate(b/-2, h/-2, b/2+1);
  for (let i = 0; i< winRows; i++) {
    var px = b/5*i;
    var py = winHeight+10;
    rectMode(CENTER)
    fill(70,10,100);
    //stroke(230,5,45,0.5);
    noStroke();
    rect(px+b/4,py-h/2+10,winWidth,winHeight);
  }
  pop()

}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}

function mousePressed() {
  if (des) {
   des = false;
 } else {
   on = true;
 }
}
