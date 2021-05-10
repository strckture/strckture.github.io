
//let font;
let permissionGranted = false;


// function preload() {
//   font = loadFont('assets/SpaceGrotesk-Regular.ttf');
// }


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // DeviceOrientationEvent, DeviceMotionEvent
  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    // ios 13 device

    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        // show permission dialog only the first time
        let button = createButton("allow access to motion sensors");
        button.style("font-size", "24px");
        button.center();
        button.mousePressed( requestAccess );
        throw error;
      })
      .then(() => {
        // on any subsequent visits
        permissionGranted = true;
      })
  } else {
    // non ios 13 device
    textSize(48);
    // text("non ios 13 device", 100, 100);
    permissionGranted = true;
  }
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
  .catch(console.error);

  this.remove();
}

function draw() {
  if (!permissionGranted) return;

  background(255);

  // rotationX, rotationY
  //translate(width/2,height/2);
  rotateX(radians(rotationX));
  rotateY(radians(rotationY));
  fill(0,0,255);
  box(75);

  /*push();
  translate(0,-4,76);
  fill(255,0,0);
  textFont(font);
  textAlign(CENTER,CENTER);
  textSize(20);
  text("Hallo!",0,0);
  pop();*/

}
