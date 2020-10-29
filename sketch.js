let objects = [];
let bg;
let character;
var timer = 30;
var clicks = 0

function preload() {
  bg = loadImage('cityscape.jpg');
  character = loadImage("character2.png")
}

function setup() {
  createCanvas(600, 400);
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
  }
  if (timer == 0) {
    colorMode(RGB);
    a = random(225);
    b = random(225);
    c = random(225);
    fill(a, b, c);
    rect(0, 0, 600, 400);
    noLoop();

    push();
    fill(225);
    text('GAME OVER', width / 3, height / 2)
    textSize(30);
    text(timer, 550, 35);
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
  constructor(x, y) {
    this.x = x;
    this.y = random(0, 400);
    this.radius = random(50, 80);
    this.color1 = random(100, 200);
    this.color2 = random(100, 200);
    this.color3 = random(100, 200);
  }
  clicked() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.radius / 2 == true) {
      this.radius = this.radius + 30
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
    strokeWeight(4);
    noFill();
    stroke(this.color1, this.color2, this.color3);
    circle(this.x, this.y, this.radius);
    pop();

    textSize(30);
    text(timer, 550, 35);
  }
}


