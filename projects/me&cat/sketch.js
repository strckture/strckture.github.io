

    let img
		//let img2
    let c = 0;
    let fade = 0.5;

    function preload() {
      img = loadImage('assets/Photoshop.png');
			//img2 = loadImage('assets/2.png');
    }

    function windowResized() {
      createCanvas(windowWidth,windowHeight);
    }



    function setup() {
      createCanvas(windowWidth,windowHeight);
      colorMode(HSB, 360, 100, 100, 1)
      background(0);
			//imageMode(CENTER);

			img.resize(width,height);
			//img2.resize(width/4,height/4);

    }

    let index = 0
    function draw() {

      c = c + fade;


      if (c > 360 || c < 0){
        fade = fade* -1;
      }

      print(c);

      let color1 = color(255, 59, 98);
      //var color2 = color(200, 0, 100,0);
      var color3 = color(200, 62, 98);
      background(0);
      //fill(100,100,100);
      //rect(0,0,500,500);
      setGradient(0, 0, width, height, color1, color3, "Y");

      // if (frameCount<300){
      //   image(img,0,0);
      // } else {
      //   divide(0, 0, width, height, 8, 0, 0, width, height)
      // }
      //image(img,0,0);

      divide(0, 0, width, height, 8, 0, 0, width, height)

    }

    function setGradient(x, y, w, h, c1, c2, axis) {
      noFill();
      if (axis == "Y") { // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
          var inter = map(i, y, y + h, 0, 1);
          var c = lerpColor(c1, c2, inter);
          stroke(c);
          line(x, i, x + w, i);
        }
      }
    }



    function divide(x, y, w, h, depth, ix, iy, iw, ih) {
      if (depth > 0) {
        const n = noise(w / width * 2, w / height * 2, frameCount / 800 * depth)
        if (depth-- % 2 === 1) {
          divide(x, y, w * n, h, depth,
            ix, iy, iw / 2, ih)
          divide(x + w * n, y, w - w * n, h, depth,
            ix + iw / 2, iy, iw / 2, ih)
        } else {
          divide(x, y, w, h * n, depth,
            ix, iy, iw, ih / 2
          )
          divide(x, y + h * n, w, h - h * n, depth,
            ix, iy + ih / 2, iw, ih / 2
          )
        }
      } else {
        push()
        noFill()
        image(img, x, y, w, h, ix, iy, iw, ih)
				//image(img2, x+300, y+200, w, h, ix, iy, iw, ih)
				noStroke();
        //stroke(255,0.2)
        rect(x, y, w, h)
        pop()
        // text(index(see), x, y + 10)
      }
    }
