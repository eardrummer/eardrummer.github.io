var digitPath = ["./assets/myDigits/", "./assets/TI99Digits/"]
var digits = []
var piDigits;
var img;
var digitPosition = 0;
var source = 0;

var soundFlag = false;

function loadAllSounds(){

	for(var j = 0; j < 2; j++){
		digits[j] = [];
		for(var i = 0; i < 11; i++){
			digits[j][i] = loadSound(digitPath[j] + str(i) + ".wav");
		}
	}
}

function preload() {

	img = loadImage("assets/background.jpg")
	loadAllSounds();

}

function setup() {
	createCanvas(windowWidth, windowHeight);
	setFrameRate(5)

	piDigits = loadStrings("assets/pi.txt");
}

function draw() {
	image(img, 0, 0, width, height)

	source = probabilityOfMachine();

	fill(200);
	textSize(20);
	textAlign(CENTER, LEFT)
	text("HUMAN", width*0.1, height/2);

	fill(10);
	textSize(20);
	textAlign(CENTER, LEFT)
	text("MACHINE", width*0.9, height/2);

	//let c = get(mouseX, mouseY, 1, 1)
//	stroke(255 - c[0],255 - c[1], 255 - c[2]);
	stroke(200,0,0)
	strokeWeight(2);
	line(mouseX,0, mouseX, height)
	noStroke();


	// Sound Stuff
	if(soundFlag == true){
		textSize(200);
		if(digitPosition == 0){
				text("3.", width*0.5, height*0.5)
				if(!digits[0][3].isPlaying() && !digits[1][3].isPlaying()){
					digits[source][3].play();
				}

				digits[source][3].onended(updateDigit);

		}
		else{
			text(piDigits[0][digitPosition-1], width*0.5, height*0.5)
			//digitPosition++;

			let d = piDigits[0][digitPosition-1];
			if(!digits[0][d].isPlaying() && !digits[1][d].isPlaying()){
				digits[source][d].play();
			}
			digits[source][d].onended(updateDigit);
		}

	}

}

function updateDigit(){
	digitPosition++;
	//console.log("digitPosition")
}

function mousePressed(){
	if(soundFlag == false){
		soundFlag = true;
	}
	else{
		// Reset the digit reading.
		digitPosition = 0;
	}
}

function probabilityOfMachine(){
	let p = map(mouseX, 0, width, 0, 1);
	if(random() > p){
		return 0;
	}
	return 1;
}
