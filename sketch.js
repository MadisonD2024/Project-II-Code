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
var slider;
var instruction;
let lines = 'Click to deliver as many packages\nas you can before sunset!'
let sound;

function preload() {
  bg = loadImage('cityscape3.jpeg');
  character = loadImage("character1.png");
  p = loadImage("package.png");
  p2 = loadImage("package2.png");
  song = loadSound('TechnoSong.mp3')
  sound = loadSound('SoundEffect.mp3')
  mode = 0
}

function setup() {
  mode = 0;
  createCanvas(800, 400);
  restartGame();
  var button = createButton("Restart");
  button.mousePressed(restartGame);
  GameOver();
  instruction = createP('Speed mode:');
  slider = createSlider(2, 7, 4);
  for (let i = 0; i < 200; i++) {
    if (random() < 0.7) {
      packages[i] = new Package1(150 * i);
    } else packages[i] = new Package2(150 * i);
  }
}

function draw() {
  background(bg);
  if (mode == 0) {
    push();
    colorMode(RGB);
    fill(200, 10, 200);
    rect(0, 0, 800, 400);
    pop();

    push();
    textSize(35);
    fill(225);
    textAlign(CENTER)
    text("Press 'Enter' to Start", 400, 150);
    pop();

    push();
    fill(225);
    textSize(20);
    textAlign(CENTER)
    text('Tip: Dark Packages = 1pt, Light Packages = 2pts', 400, 325);
    pop();

    push();
    fill(225);
    textAlign(CENTER);
    textSize(25);
    textLeading(30);
    text(lines, 400, 220)
    pop();

    song.stop();
  }
  if (mode == 1) {
    for (let Package of packages) {
      Package.display();
      Package.move();
    }
    image(character, mouseX - 57, mouseY - 15, character.width * 0.15, character.height * 0.15);

    fill(225);
    textSize(35);
    text(clicks, 30, 35)

    if (frameCount % 60 == 0 && timer > 0) {
      timer--;
    }
    if (timer == 0) {
      GameOver();
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    mode = 1;
    song.play();
  }
}

function GameOver() {
  colorMode(RGB);
  fill(200, 10, 200);
  rect(0, 0, 800, 400);
  song.stop();

  push();
  fill(225);
  textAlign(CENTER, CENTER)
  text('GAME OVER', 400, 150)
  textSize(35);
  text(timer, 750, 35);
  pop();

  push();
  fill(225);
  textAlign(CENTER, CENTER)
  textSize(30);
  text('Score: ' + clicks, 400, 200);
  text('Highscore: ' + clicks, 400, 235);
  text("Click the 'Restart' Button to Play Again", 400, 300);
  pop();

  push();
  fill(225);
  textSize(35);
  text(clicks, 30, 35)
  pop();
}

function restartGame() {
  mode = 0;
  timer = 30;
  clicks = 0;
}

function mousePressed() {
  for (let Package of packages) {
    Package.clicked();
  }
}

class Package {
  move() {
    if (mouseX >= 0) {
      this.x -= slider.value();
    }
  }
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
    if (d < this.radius / 2) {
      this.radius = 0.01;
      clicks++;
      sound.play();
    } else {
      if (d > this.radius / 2) {
        clicks += 0;
      }
    }
  }
  display() {
    push();
    image(p, this.x, this.y, this.radius, this.radius);
    pop();

    textSize(35);
    text(timer, 750, 35);
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
    if (d < this.radius / 2) {
      this.radius = 0.01;
      clicks += 2;
      // textSize(35);
      // text('+2',mouseX,mouseY - 40);
      sound.play();
    } else {
      if (d > this.radius / 2) {
        clicks += 0;
      }
    }
  }
  display() {
    push();
    image(p2, this.x, this.y, this.radius, this.radius);
    pop();

    textSize(35);
    text(timer, 750, 35);
  }
}