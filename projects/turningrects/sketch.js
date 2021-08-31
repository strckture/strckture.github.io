const num = 35
let counter = 0

let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)

  // for (let i = 0; i < num; i++) {
  //   shapes.push(new Shape());
  // }
  noStroke()
  background(255);
  //colorMode(HSB,100,100,100);
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0)
  translate(width / 2, height / 2)
  for (let i = num; i > 0; --i) {
    push()
    //fill(0.5*i,200,200)
    fill(255,245,100+i*3)
    drawingContext.shadowOffsetY = 5;
    drawingContext.shadowBlur = 10;
    //drawingContext.shadowColor = color(0.5*i,100,50)
    drawingContext.shadowColor = color(190,170,60+i*3)

    rotate(radians(sin(frameCount / 100) * i) * 20)
    //const s = width / num * i
    const s = width/30*i
    ellipse(0, 0, s, s*1.5)
    //rect(0, 0, s, s)
    pop()
  }
}

// class Shape {
//   constructor() {
//     this.c = color(random(255));
//     this.s = 50
//   }
//
//   display() {
//     fill(this.c);
//     rect(0,0,this.s,this.s);
//   }
//
// }
