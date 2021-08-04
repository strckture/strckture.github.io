
let img;
// let cellsize = 20;
// let cols, rows;

let vScale =10;


function preload()
{
	img = loadImage('assets/vangogh.jpg');
}


function setup() {
	createCanvas(windowWidth, windowHeight,WEBGL);

	rectMode(CENTER);
	imageMode(CENTER);


	img.loadPixels();
	img.resize(min(width,height)/vScale,min(width,height)/vScale)

	//cols = width/cellsize;
  //rows = height/cellsize;
}

function draw() {
	background(200);

	//orbitControl();
	//rotateZ(PI/2);
	//rotateY(frameCount*0.005);

	translate(-width/2,-height/4,-500);

	img.loadPixels();
	//loadPixels();
	//Begin loop for columns
  // for ( var i = 0; i < cols;i++) {
  //   // Begin loop for rows
  //   for ( var j = 0; j < rows;j++) {
  //     var x = i*cellsize + cellsize/2; // x position
  //     var y = j*cellsize + cellsize/2; // y position
  //     var loc = x + y*width;           // Pixel array location
  //     var c = img.pixels[loc];       // Grab the color
  //     // Calculate a z position as a function of mouseX and pixel brightness
  //     var z = (mouseX/width) * brightness(img.pixels[loc]) - 200.0;
	//
	// 	  // Translate to the location, set fill and stroke, and draw the rect
  //     push();
  //     translate(x,y,z);
	// 		//translate(x,y,z);
  //     //fill(c);
	//
	// 		fill(img.get(x,y));
  //     noStroke();
  //     rectMode(CENTER);
  //     rect(0,0,cellsize,cellsize);
  //     pop();
  //   }
	// 	//updatePixels();
	// 	//image(img,0,0);
	//
  // }

	for (var y = 0; y < img.height; y++){
		for (var x = 0; x < img.width; x++){
			//var index = (x + y * width)*4
			var index = (img.width - x + (y * img.width )) * 4;
			//var index = ((img.height - y - 1) + x * img.height) * 4;
			//var index = (img.width - x + 1 + (y * img.width))*4;
			var r = img.pixels[index+0];
			var g = img.pixels[index+1];
			var b = img.pixels[index+2];
			var bright = (r+g+b)/3;

			//var w = map(bright, 0, 255, 0, vScale);
			// pixels[index+0] = bright;
		 	// pixels[index+1] = bright;
			// pixels[index+2] = bright;
			// pixels[index+3] = 255;

			push();
			translate(x*vScale,y*vScale,bright);
			noStroke();
			fill(r,g,b);
			//ellipse(0,0,vScale,vScale);
			//rect(0,0,vScale,vScale);
			box(vScale, vScale);
			pop();
		}
	}
	//image(img,0,0);
}
