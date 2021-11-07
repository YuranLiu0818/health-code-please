var gameScreen=0;     //游戏界面
var player;
var exit;
var amountcovids=10;
var covids=[];
var imgcovid0;
var imgcovid1;
var imgplayergreen,imgplayeryellow,imgplayerred,imgplayerpass;
var imginput;
var imgscanner;
var imgleft;
var imggreencode,imgyellowcode,imgredcode,imgpass;
var fontImapct;
//var bgm;
var lastAddTime=0;
var input,startbtm;
var hit = false;
var button;

var playerName = "name"

function preload(){
  imgplayergreen = loadImage('img/player_green.png');
  imgplayeryellow = loadImage('img/player_yellow.png');
  imgplayerred = loadImage('img/player_red.png');
  imgplayerpass = loadImage('img/player_pass.png');
  imgcovid0 = loadImage('img/red.png');
  imgcovid1 = loadImage('img/yellow.png');
  imgscanner = loadImage('img/scanner.png');
  imgbg = loadImage('img/bg.png');
  imginput = loadImage('img/input.png')
  imgleft = loadImage('img/left.png');
  imggreencode = loadImage('img/greencode.png');
  imgyellowcode = loadImage('img/yellowcode.png');
  imgredcode = loadImage('img/redcode.png');
  imgpass = loadImage('img/pass.png');
  fontImapct = loadFont('libraries/Impact.ttf');
}

function setup() {
  //gameScreen = 0;
  createCanvas(1680,970);
  ellipseMode(CENTER);
  textAlign(CENTER);
  textFont(fontImapct);
  button = createButton("restart");
  button.mousePressed(resetSketch);
  button.position(340, 320);
  button.hide();
  resetSketch();
}

function resetSketch(){
  amountcovids = 10;
  var amountcovids1 = 0;
  covids=[];
  player = new Player();
  exit = new Exit();
  for (let i = 0; i < 20; i++) {
    covids.push(new COVID());
  }
  initScreen();

}

function draw() {

  if (gameScreen == 0) {
  }
  else if (gameScreen == 1) {
  gameplayScreen();
  }
  if(amountcovids>20){
      worldend();
  }
}


function initScreen(){
  image(imginput,0,0,1680,970);
  input=createInput('');
  input.style('font-size', '24px');
  input.size(260);
  input.position(865, 600);
  //fill(0);
  //rect(1400,870,160,60);
}

function gameplayScreen() {
  image(imgbg,710,0,970,970);
  gui();
//  button.show();
  player.display();
  player.move();
  exit.display();
  input.remove();


  if (millis()-lastAddTime > 5000) {
   covids.push(new COVID());
   lastAddTime = millis();
   amountcovids++;
  }

  if(covids.length > 50){
    covids.splice(0,10);
  //  amountcovids--;
  }

  for (let c of covids){
     c.move();
     c.display();
     hit = collideCircleCircle(player.x,player.y,player.diameter,c.x,c.y,c.size);

     if(hit == true&&c.condition>0.8 || c.condition==0.8){
       player.condition=2;
     }

     if(hit == true&&c.condition<0.8 &&player.condition<2){
       player.condition=1;
     }

     if(hit == true&&c.condition<0.8&&player.condition==0){
       player.condition=1;
     }

     if(hit == true&&c.condition>0.8&&player.condition==1){
       player.condition=1;
     }
  }

  fill(255)
  text(playerName, 175, 640);

   pass();
   gameover();
}

// function mouseClicked() {
//   if(gameScreen==0){     //按下鼠标时,如果当前界面是游戏准备开始界面
//      startGame();         //调用游戏开始方法，来开始游戏
//    }
//  }

function startGame() {   //游戏开始函数
  gameScreen=1;          //设置当前界面状态为游戏界面
  button.show();
}

function mousePressed() {
  if (mouseX>1400) {
    playerName = input.value();
    input.remove();
    startGame();
  }
}


function pass(){
  hit = collideRectCircle(exit.posx, exit.posy, exit.size, exit.size, player.x,player.y,player.diameter);
  if(hit == true && player.condition==0){
  covids=[];
  player.condition = 3;
  for (let i = 0; i < 15; i++) {
    covids.push(new COVID());
    }
  }
}
function gui(){
  //面板
  fill(30,33,56);
  rect(0,0,710,970);
  textSize(60);
  fill(255,174,21);
  text(amountcovids+'%',460,125);
  var amountcovids0=floor(amountcovids*0.2);
  var amounthealth= 100-amountcovids-amountcovids0;
  text(amountcovids0+'%',495,220);
  text(amounthealth+'%',450,310);


  fill(255);
  image(imgleft,0,0,1680,970);
  //个人信息
  if(player.condition==0){
    image(imggreencode,0,0,1680,970);
  }
  if(player.condition==1){
    image(imgyellowcode,0,0,1680,970);
  }
  if(player.condition==2){
    image(imgredcode,0,0,1680,970);
  }
  if(player.condition==3){
    image(imgplayerpass,0,0,1680,970);
  }

}
function gameover(){
  hit = collideRectCircle(exit.posx, exit.posy, exit.size, exit.size, player.x,player.y,player.diameter);
  if(hit == true && player.condition == 2){
    background(0,0,0);
    textAlign(CENTER);
    textSize(32);
    fill(255,0, 0);
    text('Are you unhealthy? Why your health code is red?', width/2, height/2);
  }

  if(hit == true && player.condition == 1){
    background(0,0,0);
    textSize(32);
    fill(255,0, 0);
    textAlign(CENTER);
    text('The hospital certification is not sufficient. ', width/2, height/2);
    text('We only check your health code. ', width/2, height/2+60);
  }
}
function worldend(){
    background(0,0,0);
    textSize(32);
    fill(255,0, 0);
    text('Your health code turns red. You cannot enter this area anymore.', width/2, height/2);
    textSize(16);
    textAlign(CENTER);
    text('*The color of the health code is automatically generated by the algorithms.  ',width/2,height/2+40);
    text('The reason is not disclosed. ',width/2,height/2+60);

}
