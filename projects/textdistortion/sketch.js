let currentShader;
let graphic;
let font;

function preload() {
	currentShader = getShader(this._renderer);
	// font = loadFont('Barlow-Black.otf');
}

function setup() {
	let orientation = windowWidth > windowHeight ? 'landscape' : 'portrait';
	let size = orientation === 'portrait' ? windowWidth : windowHeight;
  
  	// createCanvas(size, size, WEBGL);
	createCanvas(windowWidth, windowHeight, WEBGL);
	noStroke();
	
	// ------------ create graphic with text ------------------ //
	graphic = createGraphics(size, size);
	graphic.background(255,0,0);
  	graphic.noStroke();
	// graphic.textFont(font);
  	graphic.textSize(windowWidth*0.14);
	graphic.textAlign(CENTER,CENTER);
	graphic.fill(0,255,255);
  	graphic.stroke(0);
  	graphic.strokeWeight(0);
  	graphic.text('healing',size*0.5,size*0.5);
	
	shader(currentShader);
	currentShader.setUniform('tex', graphic);
}

function draw() {
	// lets map the mouseX to frequency and mouseY to amplitude
	// try playing with these to get a more or less distorted effect
	// 10 and 0.25 are just magic numbers that I thought looked good

	// let freq = map(mouseX, 0, width, 0, 10.0);
	// let amp = map(mouseY, 0, height, 0, .25);

	let freq = 15;
	let amp = 0.06;

	print(freq);
	print(amp);
	

	// let freq = map(sin(frameCount *.025), -1, 1, 0, 1);
	// let amp = map(sin(frameCount *.025), -1, 1, 0, 1);

	currentShader.setUniform('frequency', freq);
	currentShader.setUniform('amplitude', amp);
	currentShader.setUniform('speed', frameCount * 0.02);
	
	rect(0, 0, width, height);
}

// OpenProcessing has a bug where it always creates a scrollbar on Chromium.
// function mouseWheel() { // This stops the canvas from scrolling by a few pixels.
// 	return false;
// }


function getShader(_renderer) {
	const vert = `
		attribute vec3 aPosition;
		attribute vec2 aTexCoord;

		varying vec2 vUV;

		void main() {
			vUV = aTexCoord;

			vec4 position = vec4(aPosition, 1.0);
			position.xy = position.xy * 2.0 - 1.0;
			gl_Position = position;
		}
	`;

	const frag = `
		precision highp float;

		varying vec2 vUV;

		uniform sampler2D tex;
		uniform float speed;
		uniform float frequency;
		uniform float amplitude;

		void main() {
			vec2 uv = vec2(1.0, 1.0) - vUV;
			//flip the image so its the right way around
			uv.x = uv.x * -1.0;

			// lets create a sine wave to distort our texture coords
			// we will use the built in sin() function in glsl
			// sin() returns the sine of an angle in radians
			// first will multiply our uv * frequency -- frequency will control how many hills and valleys will be in the wave
			// then we add some time to our sine, this will make it move 
			// lastly multiply the whole thing by amplitude -- amplitude controls how tall the hills and valleys are, in this case it will be how much to distort the image
			// *try changing uv.y to uv.x and see what happens

			float sineWave = sin(uv.y * frequency + speed) * amplitude;

			// create a vec2 with our sine
			// what happens if you put sineWave in the y slot? in Both slots?
			vec2 distort = vec2(sineWave, sineWave);

			// use mod() to wrap our texcoords back to 0.0 if they go over 1.0
			vec4 texColor = texture2D(tex, mod(uv - distort, 1.0));

			gl_FragColor = texColor;
		}
	`;
	
	return new p5.Shader(_renderer, vert, frag);
}