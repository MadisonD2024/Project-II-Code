let packages = [];
let bg;
let character;
let p;
let p2;
var timer = 30;
var clicks = 0
let score = 0;
let highscore = 0;
let song;
var mode;
let lines = 'Deliver as many\npackages as you can\nbefore sunset!'

function preload() {
  bg = loadImage('cityscape3.jpeg');
  character = loadImage("character1.png");
  p = loadImage("package.png");
  p2 = loadImage("package2.png");
  song = loadSound('TechnoSong.mp3')
  mode = 0
}

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 200; i++) {
    if (random() < 0.7) {
      packages[i] = new Package1(150 * i);
    } else packages[i] = new Package2(150 * i);
  }
}

function draw() {
  background(bg);
  for (let Package of packages) {
    Package.display();
    Package.move();
  }
  image(character, mouseX - 20, mouseY - 20, character.width * 0.15, character.height * 0.15);

  fill(225);
  textSize(35);
  text(clicks, 30, 35)

  if (mode == 0) {

    push();
    colorMode(RGB);
    fill(200,10,200);
    rect(0, 0, 600, 400); 
    pop();

    push();
    textSize(35);
    fill(225);
    textAlign(CENTER)
    text("Press 'Enter' to Start", 300, 180);
    pop();

    push();
    textAlign(CENTER);
    textSize(25);
    textLeading(30);
    text(lines, 300, 220)
    pop();

    song.stop();
  }

  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  if (timer == 0) {
    colorMode(RGB);
    fill(200,10,200);
    rect(0, 0, 600, 400); 
    song.stop();

    push();
    fill(225);
    textAlign(CENTER,CENTER)
    text('GAME OVER',300, 150)
    textSize(35);
    text(timer, 550, 35);
    pop();

    push();
    fill(225);
    textAlign(CENTER, CENTER)
    textSize(30);
    text('Packages Delivered: '+ clicks,300,200);
    text('Highscore: '+ clicks,300,250);
    pop();

    push();
    fill(225);
    textSize(30);
    text(clicks, 30, 35)
    pop(); 
  }
}

function keyPressed() {
  if (keyCode===ENTER) {
    mode=1;
    song.play();
  }
}

function mousePressed() {
  for (let Package of packages) {
    Package.clicked();
  }
}

class Package {
  move() {
    if (mouseX >= 0) {
      this.x -= 4
    }
  }
  // if (mouseIsPressed === true) {
  //   song.play();
  // }
  // else {
  //   song.stop();
  // }
}

class Package1 extends Package {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = random(0, 320);
    this.radius = random(50, 80);
  }
  clicked() {
    var d = dist(mouseX - 25, mouseY - 20, this.x, this.y);
    if (d < this.radius / 2 == true) {
      this.radius = 0.01;
      clicks++;
    } else {
      if (d < this.radius / 2 == false) {
        clicks += 0;
      }
    }
  }
  display() {
    push();
    image(p, this.x, this.y, this.radius, this.radius);
    pop();

    textSize(30);
    text(timer, 550, 35);
  }
}

class Package2 extends Package {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = random(0, 320);
    this.radius = random(50, 80);
  }
  clicked() {
    var d = dist(mouseX - 25, mouseY - 20, this.x, this.y);
    if (d < this.radius / 2 == true) {
      this.radius = 0.01;
      clicks+=2;
    } else {
      if (d < this.radius / 2 == false) {
        clicks += 0;
      }
    }
  }
  display() {
    push();
    image(p2, this.x, this.y, this.radius, this.radius);
    pop();

    textSize(30);
    text(timer, 550, 35);
  }
}
