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
  colorMode(HSB,100,100,100);
}

function draw() {
  background(0)
  translate(width / 2, height / 2)
  for (let i = num; i > 0; --i) {
    push()
    fill(1*i,100,100)
    drawingContext.shadowOffsetY = 10;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(1*i,100,60)

    //drawingContext.shadowColor = "#00000066"
    rotate(radians(sin(frameCount / 100) * i) * 20)
    //const s = width / num * i
    const s = width/18*i
    rect(0, 0, s, s)
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
