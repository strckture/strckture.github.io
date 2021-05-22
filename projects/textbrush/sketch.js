
var x = 0, y = 0;
var stepSize = 5.0;
var letters = "hello world! ";
var fontSizeMin = 10;
var counter = 0;


function setup() {
  createCanvas(windowWidth, screen.availHeight);
  background(255);
  smooth();
  //cursor(CROSS);
  mouseX = width / 2;
	mouseY = height / 2;
  x = mouseX;
  y = mouseY;
  textAlign(LEFT);
  stroke(0);
  colorMode(HSB, 255);
}

function draw() {
  if (mouseOver) {
    var d = dist(x,y, mouseX,mouseY);
    //textFont('Georgia');
    textSize(fontSizeMin+d/2)
    var newLetter = letters.charAt(counter);;
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      var angle = atan2(mouseY-y, mouseX-x);

      push();
      translate(x, y);
      rotate(angle);
			fill(255, 100, 200);
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
