var img_us, img_plane, img_m, img_s;
var myFont, myFont2, myFont3;
var sendLoveButton;
var planes;
var planeOriginX, planeOriginY;
var maxPlanes = 10;

var animationMode = 0, totalModes = 3;

function preload(){
	img_us = loadImage("assets/us.png");
	img_m = loadImage("assets/manaswi.png");
	img_s = loadImage("assets/sumedha.png");

	img_plane = loadImage("assets/plane.png");

}

function setup() {
	createCanvas(windowWidth, windowHeight);
  myFont = loadFont("assets/AlexBrush-Regular.ttf");
	myFont2 = loadFont("assets/AmaticSC-Regular.ttf");
	myFont3 = loadFont("assets/blackjack.otf");

	sendLoveButton = createButton("Send Some Love");
	sendLoveButton.position(width*0.7, height*0.85);
	planeOriginX = width*0.7;
	planeOriginY = height*0.85;

	planes = new Queue();
}

function draw() {
	background(0);
	img_us.resize(600,800);
	img_m.resize(700,800);
	img_s.resize(700,800);
	img_plane.resize(80,50);


	for(var i = 0; i < planes.items.length; i++){
		if(planes.items[i].direction == -1){
			planes.items[i].move();
			planes.items[i].draw();
		}
	}

	// Put the image animations in its own function
	if(animationMode == 0){
		tint(255);
	  image(img_us, 100, 20);
	}
	else if(animationMode == 1){
		tint(255);
		image(img_m, 100, 20);
	}
	else if(animationMode == 2){
		tint(255);
		image(img_s, 100, 20);
	}


	for(var i = 0; i < planes.items.length; i++){
		if(planes.items[i].direction == 1){
			planes.items[i].move();
			planes.items[i].draw();
		}
	}



	fill(255);
	textFont(myFont);
	textSize(80);
	text("Save the Date", width/2 + width/10, height/5)

	textFont(myFont3);
	textSize(60);
  fill(0,0,200);
	text("Manaswi",width/2 + width/20, height/5 + height/8 )
	fill(200,0,0);
	text("weds",width/2 + width/5.1, height/5 + height/8 )
	fill(200,200,0);
	text("Sumedha",width/2 + width/3.6, height/5 + height/8 )


	fill(255);

	textFont(myFont2);
	textSize(30);

	text("Mangalakritya & Sangeet", width/2 + width/20, height/5 + height/8 + height/6);
	text("DEC 23rd 2019 - Kota, Rajasthan", width/2 + width/4,  height/5 + height/8 + height/6);

	text("The Wedding", width/2 + width/9, height/5 + height/5 + height/6);
	text("DEC 24th 2019 - Kota, Rajasthan", width/2 + width/4,  height/5 + height/5 + height/6);

	text("The Reception - Part 1", width/2 + width/12, height/5 + height/3.5 + height/6);
	text("DEC 27th 2019 - Mumbai", width/2 + width/4,  height/5 + height/3.5 + height/6);

	text("The Reception - Part 2", width/2 + width/12, height/5 + height/2.7 + height/6);
	text("DEC 29th 2019 - Bhubaneswar", width/2 + width/4,  height/5 + height/2.7 + height/6);

	sendLoveButton.mousePressed(sendLove);

	if(planes.items.length > maxPlanes){
		planes.dequeue();
	}


	console.log(planes.items.length);

	if(frameCount % 100 == 0){
		animationMode++;
		if(animationMode >= totalModes){
			animationMode = 0;
		}
	}
}

function sendLove(){
	tint(random(255), random(255), random(255));
	var p = new plane(planeOriginX, planeOriginY);
	planes.enqueue(p);
	// Add a plane to the queue

}
