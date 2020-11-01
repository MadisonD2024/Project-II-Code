let packages = [];
let bg;
let character;
let p;
let p2;
var timer = 30;
var clicks = 0

function preload() {
  bg = loadImage('cityscape3.jpeg');
  character = loadImage("character1.png");
  p = loadImage("package.png");
  p2 = loadImage("package2.png");
}

function setup() {
  createCanvas(600, 400);
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