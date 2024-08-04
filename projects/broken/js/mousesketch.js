let sections = [];
let currentCol ;

let hue = 0;
let sat = 255;
let bright = 255;

let cnv;


function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function setup() {
	cnv = createCanvas(windowWidth,windowHeight);
	colorMode(HSB);

	currentCol  = color(hue, sat, bright,.8);
	stroke(255);
}

function draw() {
	background(currentCol);
	
	fill(200,255,255);
	cnv.mouseClicked(test);

	if (mouseIsPressed) {
		fill(200,255,255);
		rect(30, 20, 55, 55);;
	}

	for (let a = sections.length - 1; a >= 0; a--) {
		sections[a].dessine();
	}

	let newsections = [];
	for (let a = 0; a < sections.length; a++) {
		if (!sections[a].tokill) {
		newsections.push(sections[a]);
		}
	}
	sections = newsections;
}

function test() {
	ellipse(width/2, height/2, 50, 50);
}

// function mousePressed() {
// 	let center = [mouseX, mouseY];
// 	let p1 = [0, 0];
// 	let p2 = [width, 0];
// 	let p3 = [width, height];
// 	let p4 = [0, height];

// 	hue = random(255);

// 	if (sat < 255) {
// 		sat = sat +2;
// 	}

// 	bright = random(255);

// 	cut(10, p1, p2, p3, p4, center, currentCol );
// 	currentCol  = color(hue, sat, bright, .8);
// }

function cut(fois, a, b, c, d, center, coul) {
	let t1 = random(0.1, 0.9);
	let t2 = random(0.1, 0.9);
	let p1 = [
		a[0] + (b[0] - a[0]) * t1,
		a[1] + (b[1] - a[1]) * t1
	];
	let p2 = [
		d[0] + (c[0] - d[0]) * t2,
		d[1] + (c[1] - d[1]) * t2
	];
	fois--;
	if (fois > 0) {
		cut(fois, p1, p2, d, a, center, coul);
		cut(fois, b, c, p2, p1, center, coul);
	} else {
		sections.push(new Section(a, b, c, d, center, coul));
	}
}

class Section {
	constructor(_a, _b, _c, _d, center, coul) {
		this.vx = 0;
		this.vy = 0;
		this.an = 0;
		this.van = 0;
		this.pos = [0, 0];
		this.tokill = false;
		this.coords = [];
		this.col = coul;

		let ang = random(TWO_PI);
		this.an = 0;
		let vitz = random(1, 20);
		this.pos[0] = (_a[0] + _b[0] + _c[0] + _d[0]) / 4;
		this.pos[1] = (_a[1] + _b[1] + _c[1] + _d[1]) / 4;
		let aaan = atan2(this.pos[1] - center[1], this.pos[0] - center[0]);
		aaan += radians(random(-5, 5));
		this.vx = cos(aaan) * vitz;
		this.vy = sin(aaan) * vitz;
		this.van = radians(random(-10, 10));
		this.coords = [
		new Coord(this.pos[0], this.pos[1], _a[0], _a[1]),
		new Coord(this.pos[0], this.pos[1], _b[0], _b[1]),
		new Coord(this.pos[0], this.pos[1], _c[0], _c[1]),
		new Coord(this.pos[0], this.pos[1], _d[0], _d[1])
		];
	}

	dessine() {
		if (!this.tokill) {
		this.an += this.van;
		this.vx *= 1.035;
		this.vy *= 1.0351;
		this.vy += 0.01;
		this.pos[0] += this.vx;
		this.pos[1] += this.vy;
		fill(this.col);
		beginShape();
		let a = this.coords[0].affiche(this.an);
		vertex(this.pos[0] + a[0], this.pos[1] + a[1]);
		let b = this.coords[1].affiche(this.an);
		vertex(this.pos[0] + b[0], this.pos[1] + b[1]);
		let c = this.coords[2].affiche(this.an);
		vertex(this.pos[0] + c[0], this.pos[1] + c[1]);
		let d = this.coords[3].affiche(this.an);
		vertex(this.pos[0] + d[0], this.pos[1] + d[1]);
		endShape(CLOSE);

		if (this.vy > height + 30 || this.vy < -30 || this.vx < -30 || this.vx > width + 30) {
			this.tokill = true;
		}
		}
	}
}

class Coord {
	constructor(cx, cy, _x, _y) {
		this.an = atan2(_y - cy, _x - cx);
		this.ray = dist(cx, cy, _x, _y);
	}

  affiche(_an) {
		_an += this.an;
		let toreturn = [0, 0];
		toreturn[0] = cos(_an) * this.ray;
		toreturn[1] = sin(_an) * this.ray;
		return toreturn;
	}
}