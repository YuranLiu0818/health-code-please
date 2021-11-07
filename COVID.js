class COVID {
  constructor() {
    this.x = random(760,windowWidth);
    this.y = random(0,height);
    this.size = random(70,100);
    this.speed=1;
    this.condition=random(0,1);
    this.redamount=0;
    this.yellowamount=0;
}

//出口变动
move() {
  this.x += random(-0.3*this.speed, 0.3*this.speed);
  this.y += random(-0.3*this.speed, 0.3*this.speed);
  this.size += random(-0.01*this.speed, 0.03*this.speed);
}


display() {
  {

    if (this.x>750&&this.x<850&&this.y>300&&this.y<700)
    {
      this.x = random(760,windowWidth);
      this.y = random(0,400);
    }
    if(this.condition<0.8,this.condition+=0.0003){
      //fill(255,255,0);
      image(imgcovid1,this.x-0.5*this.size,this.y-0.5*this.size,this.size,this.size);
    }
    if(this.condition>0.8||this.condition==0.8){
      image(imgcovid0,this.x-0.5*this.size,this.y-0.5*this.size,this.size,this.size);

    }

    //circle(this.x,this.y,this.size);
  }
}
}
