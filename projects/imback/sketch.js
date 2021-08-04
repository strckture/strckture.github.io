// Original code by The Wizard Bear

const string = "I AM BACK"; //words to be displayed

const showText = false; //whether or not to have an overlay of the original text (in the background color)
const textAlpha = 30; //the alpha of the text if displayed (low value will make it slowly fade in)

const fontSampleFactor = 0.5; //How many points there are: the higher the number, the closer together they are (more detail)
const noiseZoom = 0.006; //how zoomed in the perlin noise is
const noiseOctaves = 4; //The number of octaves for the noise
const noiseFalloff = .5; //The falloff for the noise layers

const zOffsetChange = 0; //How much the noise field changes in the z direction each frame
const individualZOffset = 0; //how far away the points/lines are from each other in the z noise axies (the bigger the number, the more chaotic)

const lineSpeed = 1.5; //the maximum amount each point can move each frame
const newPointsCount = 20; //the number of new points added when the mouse is dragged


var font;
var points = [];
var startingPoints;

function preload() {
	font = loadFont('assets/KyivTypeTitling-Bold3.ttf');
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	background(244,236,221);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(244,236,221);

	var myColors = [color('#F90D0D'), color('#120DF9'), color('#3E3C87'),color('#0D6721')];

	for (var i = 0; i < myColors.length; i++) {
		myColors[i].setAlpha(20);
	}


	textFont(font);

	textSize(width/7);
	fill(255, textAlpha);

	stroke(myColors[int(random(0, myColors.length))]);

	noiseDetail(noiseOctaves, noiseFalloff);

	startingPoints = font.textToPoints(string, width / 2 - textWidth(string) / 2, height / 2, width/7, {"sampleFactor": fontSampleFactor});

	for (let p = 0; p < startingPoints.length; p++) {
		points[p] = startingPoints[p];
		points[p].zOffset = random();
	}
}

function draw() {
	//background(244,236,221);
	if(showText){
		noStroke();
		text(string, width / 2 - textWidth(string) / 2, height);
		stroke(255,0,1);
	}
	for (let pt = 0; pt < points.length; pt++) {
		let p = points[pt];
		let noiseX = p.x * noiseZoom;
		let noiseY = p.y * noiseZoom;
		let noiseZ = frameCount * zOffsetChange + p.zOffset*individualZOffset;
		let newPX = p.x + map(noise(noiseX, noiseY, noiseZ), 0, 1, -lineSpeed, lineSpeed);
		let newPY = p.y + map(noise(noiseX, noiseY, noiseZ + 214), 0, 1, -lineSpeed, lineSpeed);
		line(p.x, p.y, newPX, newPY);
		p.x = newPX;
		p.y = newPY;
	}
}

function mouseDragged() {
	for (let i = 0; i < newPointsCount; i++) {
		let angle = random(TAU);
		let magnitude = randomGaussian() * ((newPointsCount-1)**0.5*3);
		let newPoint = {
			"x": mouseX + magnitude * cos(angle),
			"y": mouseY + magnitude * sin(angle),
			"zOffset": random()
		};
		points[points.length] = newPoint;
		startingPoints[startingPoints.length] = newPoint;
	}
}
