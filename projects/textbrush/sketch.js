
var x = 0, y = 0;
var stepSize = 5.0;
var letters = "I like to sing, dance, pretend and Kazoo! ";
var fontSizeMin = 10;
var counter = 0;

let font;
let img;


function preload() {
  font = loadFont('assets/ChicagoFLF.ttf');
  img = loadImage('assets/bg.jpg');
}

function setup() {
  createCanvas(windowWidth-4, windowHeight-4);
  //background(102,101,161);
  //background(72,162,165);
  img.resize(width,height);
  image(img,0,0);
  smooth();

  mouseX = width / 2;
	mouseY = height / 2;
  x = mouseX;
  y = mouseY;

  textAlign(LEFT);
  stroke(0);
  colorMode(HSB, 360,100,100);
}

function draw() {
  if (mouseOver) {
    var d = dist(x,y, mouseX,mouseY);
    textFont(font);
    textSize(fontSizeMin+d/2)
    var newLetter = letters.charAt(counter);;
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      var angle = atan2(mouseY-y, mouseX-x);

      push();
      translate(x, y);
      rotate(angle);
			//fill(random(255), 100, 200);
      fill(frameCount % 255 ,37, 89);
      //fill(255);
      noStroke();
      text(newLetter, 0, 0);
      pop();

      counter++;

      if (counter > letters.length-1) counter = 0;

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }

  } else {
		counter = 0;
	}
}

function mouseOver() {
  x = mouseX;
  y = mouseY;
}
