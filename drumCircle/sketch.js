var x, y, z;
var xpos, ypos;


function setup()
{
  rectMode(CENTER);
  // set canvas size
  createCanvas(windowWidth, windowHeight);

  // default values
  xpos = windowWidth/2;
  ypos = windowHeight/2;
  x = 0;
  y = 0;
}

function draw()
{
  // set background color to white
  background(0);

	rect(windowWidth*0.5,windowHeight*0.5,windowWidth*0.5,windowHeight*0.5);

  // add/subract xpos and ypos
  xpos = xpos + x;
  ypos = ypos - y;

  // wrap ellipse if over bounds
  if(xpos > windowWidth) { xpos = windowWidth; x=-x }
  if(xpos < 0) { xpos = 0; x=-x}
  if(ypos > windowHeight) { ypos = windowHeight; y=-y }
  if(ypos < 0) { ypos = 0; y=-y }

  // draw ellipse
  fill(255, 0, 0);

	var xMapped = map(xpos, 0, windowWidth, windowWidth*0.25, windowWidth * 0.75 )
	var yMapped = map(ypos, 0, windowHeight, windowHeight*0.25, windowHeight * 0.75 )
  //ellipse(xpos, ypos, 25, 25);
	ellipse(xMapped, yMapped, 25, 25);
  // music



  // display variables
  fill(255);
  noStroke();
  text("x: " + x, 25, 25);
  text("y: " + y, 25, 50);
  text("z: " + z, 25, 75);
}

// accelerometer Data
window.addEventListener('devicemotion', function(e)
{
  // get accelerometer values
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z);
});
