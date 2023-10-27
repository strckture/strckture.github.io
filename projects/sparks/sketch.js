let Shader;
const balls=[],num=1000;
let spawn=[0,0];



function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}

function preload(){
    Shader=getShader(this._renderer);
    // sound = loadSound('assets/beat.mp3');
    sound = loadSound('assets/delilah.mp3');
}

function setup() {
    let cnv = createCanvas(windowWidth,windowHeight,WEBGL);
    cnv.mouseClicked(togglePlay);
    amplitude = new p5.Amplitude();

    background(25);
    pixelDensity(1);
    noStroke();
    // color(0,0,255);
}

function draw() {
	let data=[];
    let level = amplitude.getLevel();

    // print(level);

	if (random()>0.8) {
		for (let i=0;i<num/10;i++) {
			if (balls.length<num) {
				let a=random(2*PI);
				let g=random();
				let b={
					x:width/2,
					y:height/2,
					vx:cos(a)*random(3.5,4.5),
					vy:sin(a)*random(3.5,4.5),
					rad:random(2,5)
				}
				balls.push(b);
			}
		}
	}

    // if (level*10 >.5) {spawn=[random(150,width-150),random(150,height-150)];}
    // if (frameCount%30<25) {spawn=[random(150,width-150),random(150,height-150)];}
    // else {

    // if (mouseIsPressed) {
    if (level*10 >.7) {
		for (let bl=0;bl<balls.length;bl++) {
			if (balls[bl].rad<0.2&&random()>0.8) {
				let a=random(2*PI);
				let g=random();
				let b={
					// x:mouseX,
					// y:mouseY,
                    // x:spawn[0],
					// y:spawn[1],
                    x:width/2,
					y:height/2,
					vx:cos(a)*random(3.5,4.5),
					vy:sin(a)*random(3.5,4.5),
					// rad:random(2,5)
                    // rad:random(level*15)
                    rad:level*10
				}
				balls[bl]=b;
			}
		}
	}
	for (let b of balls) {
		b.rad/=1.04;
		b.vy+=0.05;
		b.x+=b.vx;
		b.y+=b.vy;
		if (b.x<			 b.rad) {b.x=			 b.rad;b.vx*=-1;}
		if (b.x>width -b.rad) {b.x=width -b.rad;b.vx*=-1;}
		if (b.y<			 b.rad) {b.y=			 b.rad;b.vy*=-1;}
		if (b.y>height-b.rad) {b.y=height-b.rad;b.vy*=-1;}
		data.push(b.x,b.y,b.rad);
	}

    shader(Shader);
    Shader.setUniform("balls",data);
    rect(0,0,width,height);

    // print(spawn);
}

function togglePlay() {
    if (sound.isPlaying() ){
        sound.pause();
    } else {
        sound.loop();
        amplitude = new p5.Amplitude();
        amplitude.setInput(sound);
    }
  }


function getShader(_renderer) {
	const vert = `
		precision lowp float;
		attribute vec3 aPosition;
		attribute vec2 aTexCoord;
		varying vec2 vTexCoord;
		void main() {
			vTexCoord = aTexCoord;
			vec4 positionVec4=vec4(aPosition,1.);
			positionVec4.xy=positionVec4.xy*2.-1.; 
			gl_Position = positionVec4;
		}
	`;
	const frag = `
		precision lowp float;
		varying vec2 vTexCoord;
		const float WIDTH=${windowWidth}.;
		const float HEIGHT=${windowHeight}.;
		uniform vec3 balls[${num}];
		void main() {
			float x=vTexCoord.x*WIDTH;
			float y=HEIGHT-vTexCoord.y*HEIGHT;
			float v=0.;
			for (int i=0;i<${num};i++) {
				vec3 b=balls[i];
				v+=b.z*b.z/((b.x-x)*(b.x-x)+(b.y-y)*(b.y-y));
			}
			v=sqrt(v);
			gl_FragColor = vec4(v,  v-.5    ,0.     ,1.);
		}
	`;
	return new p5.Shader(_renderer, vert, frag);
}