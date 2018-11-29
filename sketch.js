var bg
var musicMap_svg
var musicMap_jpg

var initialMap

var homeX, homeY, createX, createY, modifyX, modifyY, consumeX, consumeY
var create_chainX, create_chainY, modify_chainX, modify_chainY, consume_chainX, consume_chainY
var mouseIsInside = 0

var s_Create, s_Modify, s_Consume;
var gravity = 9.0;
var mass = 2.0;

let createLeaves = []
let modifyLeaves = []
let consumeLeaves = []
var n_createLeaves = 16
var n_modifyLeaves = 12
var n_consumeLeaves = 16

function preload(){
		// Abstract Art Credit : Photo by Art by L'nfeldt on Unsplash
		bg = loadImage("assets/background_abstract.jpg");
		//musicMap_svg = loadImage("assets/MusicTechMap.svg");
		musicMap_jpg = loadImage("assets/MusicTechMap2.jpg");

		initialMap = 1
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	assignCenters();

	createChains();
}

function assignCenters(){
	createX = 783
	createY = 180

	modifyX = 783
	modifyY = 337

	consumeX = 785
	consumeY = 491

	homeX = 780
	homeY = 0

	aboutX = 20
	aboutY = 0

	projectX = windowWidth - 40
	projectY = 0

	create_chainX = createX
	create_chainY = createY

	modify_chainX = modifyX
	modify_chainY = modifyY

	consume_chainX = consumeX
	consume_chainY = consumeY

}

function draw() {
	clear()

	// Test adding SVG image in the presence of non white background
	//image(musicMap_svg, 400, 0)

	if (initialMap == 1){
		background(bg)
		display_InitialMap()
	}
	else{
		tint(255, 100)
		background(bg)
		display_chains(initialMap)
	}


	fill(255, 255, 255, 200)
	arc(780, 0, 100, 100, TWO_PI, PI)
	fill(0)
	textSize(10)
	text("HOME", homeX - 15, 20)

	fill(255, 255, 255, 200)
	arc(0, 0, 150, 100,  0, PI/2)
	fill(0)
	textSize(10)
	text("ABOUT", aboutX - 15, 20)

	fill(255, 255, 255, 200)
	arc(windowWidth, 0, 150, 100, PI/2, PI)
	fill(0)
	textSize(10)
	text("PROJECTS", projectX - 15, 20)



	if(mouseIsPressed & mouseIsInside){
		if(initialMap == 2){
			create_chainX = mouseX
			create_chainY = mouseY
		}
		else if(initialMap == 3){
			modify_chainX = mouseX
			modify_chainY = mouseY
		}
		else if(initialMap == 4){
			consume_chainX = mouseX
			consume_chainY = mouseY
		}
	}

	if(initialMap == 1){
		checkMouseOver();
	}

	if(mouseIsPressed){
		if (dist(mouseX, mouseY, aboutX, aboutY) < 50){
			console.log("ABOUT")
			link("http://manaswimishra.com/about/", "_blank", "nofollow" )
		}
		if (dist(mouseX, mouseY, projectX, projectY) < 50){
			console.log("PROJECTS")
			link("http://manaswimishra.com/", "_blank", "nofollow" )
		}
	}

}

function link(url, winName, options) {
  winName && open(url, winName, options) || (location = url);
}

function display_InitialMap(){

	fill(0)
	textSize(40)
	text("Space of Sound", 650, 80)

	tint(255, 220)
	image(musicMap_jpg, 400, 100)

}

function mousePressed(){
	var createD = dist(mouseX, mouseY, create_chainX, create_chainY)
	var modifyD = dist(mouseX, mouseY, modify_chainX, modify_chainY)
	var consumeD = dist(mouseX, mouseY, consume_chainX, consume_chainY)

	var homeD = dist(mouseX, mouseY, homeX, homeY)

	if (homeD < 50){
		initialMap = 1
		assignCenters()
	}

	if (createD < 50 && initialMap == 1) {
		initialMap = 2
	}
	else if (modifyD < 50 && initialMap == 1) {
		initialMap = 3
	}
	else if (consumeD < 50 && initialMap == 1) {
		initialMap = 4
	}
  else if (createD < 50 || modifyD < 50 || consumeD < 50 ) {
		mouseIsInside = 1
	}
	else {
		mouseIsInside = 0
	}
// If Mouse pressed and not in Initial Map, update position of the center chain

}

function createChains(){
	s_Create = new Spring2D(createX, createY, mass, gravity)
	s_Modify = new Spring2D(modifyX, modifyY, mass, gravity)
	s_Consume = new Spring2D(consumeX, consumeY, mass, gravity)
}

function display_chains(status){

	if (status == 2){
		// Means Create Chain must be displayed

			fill(255, 255, 200);
			ellipse(create_chainX, create_chainY, 80, 40)
			fill(0)
			textSize(15)
			text("Creation", create_chainX - 30, create_chainY + 5)

	}

	else if (status == 3){
			// Means Modify Chain must be displayed

			fill(255, 182, 193);
			ellipse(modify_chainX, modify_chainY, 100, 40)
			fill(0)
			textSize(15)
			text("Modification", modify_chainX - 40, modify_chainY + 5)
	}
	else if (status == 4){
			// Means Modify Chain must be displayed

			fill(144, 255, 144);
			ellipse(consume_chainX, consume_chainY, 100, 40)
			fill(0)
			textSize(15)
			text("Consumption", consume_chainX - 45, consume_chainY + 5)
	}
}


function checkMouseOver(){

	var createDist = dist(mouseX, mouseY, createX, createY)
	var modifyDist = dist(mouseX, mouseY, modifyX, modifyY)
	var consumeDist = dist(mouseX, mouseY, consumeX, consumeY)

	if (createDist < 100){
		noFill()
		strokeWeight(10)
		stroke(0, 0, 0, 100)
		ellipse(createX, createY, 100, 45)
		stroke(0)
		strokeWeight(1)
	}

	if (modifyDist < 100){
		noFill()
		strokeWeight(10)
		stroke(0, 0, 0, 100)
		ellipse(modifyX, modifyY, 110, 45)
		stroke(0)
		strokeWeight(1)
	}

	if (consumeDist < 100){
		noFill()
		strokeWeight(10)
		stroke(0, 0, 0, 100)
		ellipse(consumeX, consumeY, 110, 45)
		stroke(0)
		strokeWeight(1)
	}

}


function Spring2D(xpos, ypos, m, g) {
  this.x = xpos;// The x- and y-coordinates
  this.y = ypos;
  this.vx = 0; // The x- and y-axis velocities
  this.vy = 0;
  this.mass = m;
  this.gravity = g;
  this.radius = 30;
  this.stiffness = 0.2;
  this.damping = 0.7;

  this.update = function(targetX, targetY) {
    var forceX = (targetX - this.x) * this.stiffness;
    var ax = forceX / this.mass;
    this.vx = this.damping * (this.vx + ax);
    this.x += this.vx;
    var forceY = (targetY - this.y) * this.stiffness;
    forceY += this.gravity;
    var ay = forceY / this.mass;
    this.vy = this.damping * (this.vy + ay);
    this.y += this.vy;
  }

  this.display = function(nx, ny) {
    noStroke();
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
    stroke(255);
    line(this.x, this.y, nx, ny);
  }
}
