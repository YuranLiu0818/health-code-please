class Exit {
  constructor() {
    this.size = 80;
    this.posx = 770;
    this.posy = 400;
}

move() {
  //this.size += random(-0.5,-1);
  this.posx += random(-1,0);
  this.posy += random(-1,0);
}

display(){
  fill(0,255,0,0);
  rect(this.posx,this.posy,this.size,this.size);
  image(imgscanner,0,0,1680,970);
}
}
