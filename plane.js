class plane{

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.c = color(random(255), random(255), random(255));
    this.direction = 1;
    this.flyMode = 0;
  }

  move(){
    this.x -= 10 * this.direction;
    this.y -= random(-5, 10);


    if(this.x < width/10){

      this.direction = -1;
      console.log(this.x)
      this.flyMode = 1;
    }

    if(this.flyMode == 1 && this.x > width/2.1){
      this.direction = 1;
    }

    if(this.y < 5){
      this.y = height;
    }

    //boundary conditions
    // Also bring the plane down from below if it overshoots above
    // Also reverse direction of plane after boundary
  }

  draw(){
    push();
    tint(this.c);
    translate(this.x, this.y);
    scale(1.0*this.direction, 1.0,  1.0);
    image(img_plane, 0,0);
    pop();
  }
}
