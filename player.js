class Player {
  constructor() {
    this.x = width/2;
    this.y = height;
    this.diameter = 60;
    this.condition=1;
    this.speed = 1;
    this.step=0;
}


move(){
  //让小球不跑出去
  this.x = constrain(this.x,this.diameter/2+710,width-this.diameter/2);
  this.y = constrain(this.y,this.diameter/2,height-this.diameter/2);
  this.x += random(-this.speed, this.speed);
  this.y += random(-this.speed, this.speed);
  this.step += 0.5;

  if (keyIsDown(LEFT_ARROW)) {
        this.x -= 5;
        this.step += 0.5;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        this.x += 5;
        this.step += 0.5 ;
    }
    if (keyIsDown(UP_ARROW)) {
        this.y -= 5;
        this.step += 0.5;
    }

    if (keyIsDown(DOWN_ARROW)) {
        this.y += 5;
        this.step += 0.5;
    }
}

display() {
    noStroke();
    //状态0绿色健康
        if(this.condition==0){
          fill(0,255,0);
          image(imgplayergreen,this.x-0.5*this.diameter,this.y-0.5*this.diameter,this.diameter,this.diameter);
          this.step = 0;
        }
    //状态1黄色亚健康
        if(this.condition==1){
          image(imgplayeryellow,this.x-0.5*this.diameter,this.y-0.5*this.diameter,this.diameter,this.diameter);
            if(this.step>400){
              this.condition=0;
              this.step=0;
          }
        }
    //状态2红色病毒
        if(this.condition==2){
          image(imgplayerred,this.x-0.5*this.diameter,this.y-0.5*this.diameter,this.diameter,this.diameter);

          if(this.step>400){
            this.condition = 1;
            this.step = 0;
          }
        }
        //状态3 通过状态
        if(this.condition==3){
          image(imgpass,this.x-0.5*this.diameter,this.y-0.5*this.diameter,this.diameter,this.diameter);

          if(this.step>40){
            this.condition=1;
            this.step=0;
          }
        }
    }
}
