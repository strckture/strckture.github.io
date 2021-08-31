let radiusSpan = 8,
		arcLengthStep = 1,
		rotationSpeed = Math.PI/2, //13
		radius,radian,cx,cy,x,y;

let img;

function preload() {
	img = loadImage('assets/nofre2.png');
}

function setup() {

	let s = min(windowWidth,windowHeight);
	createCanvas(windowWidth, windowHeight);
	cx = width/2;
	cy = height/2;
  init();
	background(0,255,0);

	img.resize(500,500);
	//img.resize(width,height);
}


function init() {
	//background(0,255,0);
  radius = radiusSpan/2;
	//radius = 100;
	radian = 0;
	x = cx + cos(radian)*radius;
	y = cy + sin(radian)*radius;
}



function draw() {

	let drawnRad = 0;
  while(drawnRad < rotationSpeed && radius < min(windowWidth,windowHeight)*0.49){
  	let px = x;
    let py = y;
    let radianStep = map(arcLengthStep,0,radius*TWO_PI,0,TWO_PI);
    radian += radianStep;
    radius += map(radianStep,0,TWO_PI,0,radiusSpan);
    x = cx + cos(radian)*radius;
    y = cy + sin(radian)*radius;

		let col = img.get(x,y);

    col = map(brightness(col),0,255,1,0);
    col = pow(col,3);
  	let sw = map(col,1,0,radiusSpan*0.7,0.01);
    sw += (noise(x,y)- 0.5)*radiusSpan*0.2;
    stroke(0,0,255);
    strokeWeight(sw);
    line(px,py,x,y);
    drawnRad += radianStep;
	}
}
