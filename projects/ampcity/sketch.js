// Residing in the sky
// original code by takawo

const color_palette = ["#FFF000, #1FFA8C, #FFBFC4, #AA93C4, #602F6B"];
//["#FFF000, 1FFA8C, FFBFC4, AA93C4, 602F6B"]

let seed;
let sound, amp;
let level

var des = true;
let font;

function preload(){
	//SOUND
  sound = loadSound('assets/test.mp3');
	font = loadFont('assets/SpaceGrotesk-Regular.ttf');
}

function setup() {
	let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
	cnv.mouseClicked(togglePlay);

	//SOUND
  // fft = new p5.FFT();
  // sound.amp(0.2);
	amp = new p5.Amplitude();

	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	ortho(-width / 2, width / 2, -height / 2, height / 2, -5000, 5000);
	seed = int(random(7));

	textFont(font);
  textAlign(CENTER);
}


function draw() {
	randomSeed(seed);

	//SOUND
	//let spectrum = fft.analyze();
	level = amp.getLevel();

  level = map(level,0,1.0,0,100);


	background(200,10,10);
	translate(0, height / 3, 0);

	ambientLight(0, 0, 80);
	directionalLight(color(200, 80, 80), 1, 0, -1);
	directionalLight(color(230, 80, 30), -1, 0, -1);
	directionalLight(color(260, 80, 50), 0, 1, 0);

	noStroke();

	push();
	rotateX(-35);
	rotateY(40);
	let sd = map(1, 0, 5, 1, 5);
	let d = max(width, height)*2.5;

	let minD = (width, height) / sd;
	separateGrid(-d / 2, 0, -d / 2, d, minD);
	pop();

	push();
	if (des) {
		rectMode(CENTER);
		translate(0,-height/3,5000);
		noStroke();
		fill(0,0,100);
		rect(0,0,width,40);
		fill(0,0,0);
    textSize(16);
		text("Tap to play! Make sure your phone is not in silent mode.",0,5);
	}
	pop();

}

function separateGrid(x, y, z, d, minD) {
	//gridsize
	let sep = int(random(3,5))
	let w = d / sep;

	for (let j = 0; j < sep; j++) {
		for (let i = 0; i < sep; i++) {
			let nx = x + i * w;
			let nz = z + j * w;
			if (random(100) < 95 && w > minD || d == max(width, height) * 2.5) {
				separateGrid(nx, 0, nz, w, minD);
			} else {
				let h = random(minD / 5, d);
				let ny = -h / 2;

				push();
				translate(nx + w / 2, ny, nz + w / 2);
				if (random() > 0.25) {
					drawBuilding(w * 0.9, h, w * 0.9);
				}
				pop();

			}
		}
	}
}

function drawBuilding(w, h, d) {
	// rotateY((int(random(4)) * 360) / 4);

	//building color
	fill(random(200),random(30),random(30));

	//BUILDING HEIGHT
	box(w, h, d);

	let w_num = int(random(2, 6));
	let w_offset = w / 10;
	let w_margin = w_offset *0.5;
	let nw = (w - w_offset * 2 - w_margin * (w_num - 1)) / w_num;

	let h_offset = h / 10;
	let h_margin = w_offset *0.5;
	let h_num = int((w_num * h) / w);
	let nh = (h - h_offset * 2 - h_margin * (h_num - 1)) / h_num;

	//windows
	if (min(nw, nh) > max(width, height) / 50 || random(100) > 70) {
		push();
		translate(-w / 2, -h / 2, d / 2 + 1);
		for (let j = 0; j < h_num; j++) {
			for (let i = 0; i < w_num; i++) {
				let nx = w_offset + i * (w_margin + nw);
				let ny = h_offset + j * (h_margin + nh);

				fill(255,10+level);
				rect(nx+nw/4, ny, nw*0.5, nh*0.8);
			}
		}
		pop();

		//windows2
		push();
		translate(-w / 2 - 1, -h / 2, -d / 2);
		rotateY(-90);
		for (let j = 0; j < h_num; j++) {
			for (let i = 0; i < w_num; i++) {
				let nx = w_offset + i * (w_margin + nw);
				let ny = h_offset + j * (h_margin + nh);

				fill(255,10+level);
				rect(nx+nw/4, ny, nw*0.5, nh*0.8);
			}
		}
		pop();
	}
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
		amp = new p5.Amplitude();
		//amp.setInput(sound);
  }
}

function mousePressed() {
  if (des) {
   des = false;
 } else {
   on = true;
 }
}
