// color palette
var colors   =  ["#F2C4EF","#BBCDF2","#7E9ABF","#024873","#6AB9D9"];
// set weights for each color
var weights  = [1,1,1,1,1,5];

// scale of the vector field
// smaller values => bigger structures
// bigger values  ==> smaller structures
var myScale = 3;
// number of drawing agents
var nAgents = 2000;
let agent = [];
// set spinning direction (plus or minus)
var direction = 1;
var par = 0;

function windowResized() {
  createCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  strokeCap(SQUARE);

  //background(10);
  background(248,100,6);

  for(let i=0;i < nAgents;i++)
  {
    agent.push(new Agent());
  }

}


function draw() {

  background(248,100,6,0.05);

  for(let i=0;i < agent.length;i++)
  {
    agent[i].update();
  }
}

// select random colors with weights from palette
function myRandom(colors,weights)
{
    let tt = 0;
    let sum = 0;

    for(let i=0;i < colors.length; i++)
    {
      sum += weights[i];
    }
    let rr = random(0,sum);
    for(let j=0;j < weights.length;j++)
    {
      if (weights[j] >= rr)
      {
        return colors[j];
      }
        rr -= weights[j];
    }
    return tt;
 }
// paintining agent

class Agent {
  constructor()
  {
    this.p     = createVector(random(width),random(height));
    this.pOld  = createVector(this.p.x,this.p.y);
    this.step  =1;
    let temp   =  myRandom(colors,weights);
    this.color = color(hue(temp) + randomGaussian()*10,
                       saturation(temp) + randomGaussian()*10,
                       brightness(temp) - 10,random(10,90));

    this.strokeWidth = random(1,5);
    this.isOutside = false;

    //this.history = [];
  }

  update() {

    this.p.x += direction*vector_field(this.p.x,this.p.y).x*this.step;
    this.p.y += direction*vector_field(this.p.x,this.p.y).y*this.step;

    strokeWeight(this.strokeWidth);
    stroke(this.color);
    line(this.pOld.x,this.pOld.y,this.p.x,this.p.y);

    this.pOld.set(this.p);
  }
}

// vector field function
// the painting agents follow the flow defined
// by this function
function vector_field(x,y) {

  x = map(x,0,width,-myScale,myScale);
  y = map(y,0,height,-myScale,myScale);

  let k1 = map(mouseX, 0, width, 2,12);                                                     //change?
  let k2 = map(mouseY, 0, height, 3,20);

  let u = sin(k1*y) + cos(k2*y);
  let v = sin(k2*x) - cos(k1*x);

  return createVector(u,v);
}

// function to select
function myRandom(colors,weights)
{
    let tt = 0;
    let sum = 0;

    for(let i=0;i < colors.length; i++)
    {
      sum += weights[i];
    }

    let rr = random(0,sum);

    for(let j=0;j < weights.length;j++)
    {

      if (weights[j] >= rr)
      {
        return colors[j];
      }
        rr -= weights[j];
    }

    return tt;
 }
