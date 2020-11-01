let objects = [];
let bg;
let character;
let p;
var timer = 30;
var clicks = 0
let score = 0;
let highscore = 0;
let song;

function preload() {
  bg = loadImage('cityscape.jpg');
  character = loadImage("character2.png");
  p= loadImage("package.png");
  song = loadSound('TechnoSong.mp3')
}

function setup() {
  createCanvas(600, 400);
  song.play();
  for (let i = 0; i < 200; i++) {
    objects[i] = new object(150 * i);
  }
}

function draw() {
  background(bg);
  for (let object of objects) {
    object.display();
    object.move();
  }
  image(character, mouseX - 20, mouseY - 20, character.width * 0.1, character.height * 0.1);

  fill(225);
  textSize(35);
  text(clicks, 30, 35)

  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
    // song.play();
  }
  if (timer == 0) {
    colorMode(RGB);
    a = random(225);
    b = random(225);
    c = random(225);
    fill(a, b, c);
    rect(0, 0, 600, 400);
    noLoop();
    song.stop();

    push();
    fill(225);
    textAlign(CENTER,CENTER)
    text('GAME OVER',300, 150)
    textSize(30);
    text(timer, 550, 35);
    pop();

    push();
    fill(225);
    textAlign(CENTER, CENTER)
    text('score: '+ clicks,300,200);
    text('highscore: '+ clicks,300,250);
    pop();

    push();
    fill(225);
    textSize(35);
    text(clicks, 30, 35)
    pop();
  }
}


function mousePressed() {
  for (let object of objects) {
    console.log('pressed');
    object.clicked();
  }
  
}

class object {
  constructor(x) {
    this.x = x;
    this.y = random(0, 320);
    this.radius = random(50, 80);
  }
  clicked() {
    var d = dist(mouseX-25, mouseY-20, this.x, this.y);
    if (d < this.radius / 2 == true) {
      this.radius = 0.01;
      clicks++;
    }
    else {
      if (d < this.radius / 2 == false) {
        clicks += 0;
      }
    }
  }
  move() {
    if (mouseX >= 0) {
      this.x -= 4
    }
  }
  display() {
    push();
    image(p,this.x, this.y, this.radius,this.radius);
    pop();

    textSize(30);
    text(timer, 550, 35);
}
}


