let bugs = [];
let score = 0;
let timeLeft = 30;
let gameOver = false;
let bugImg, squishedImg;
let spriteWidth = 32, spriteHeight = 32;
let frameIndex = 0;
let speedIncrease = 0.8;
let globalSpeed = 2;

function preload() {
  bugImg = loadImage('bug.png');
  squishedImg = loadImage('squished.png');
}

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug(random(width), random(height)));
  }
  setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
    } else {
      gameOver = true;
    }
  }, 1000);
  setInterval(() => {
    frameIndex = (frameIndex + 1) % 3;
  }, 200);
}

function draw() {
  background(220);
  
  if (!gameOver) {
    for (let bug of bugs) {
      bug.move();
      bug.display();
    }
    
    fill(0);
    textSize(24);
    text(`Score: ${score}`, 10, 30);
    text(`Time Left: ${timeLeft}s`, 10, 60);
  } else {
    textSize(32);
    textAlign(CENTER, CENTER);
    text(`Game Over! Final Score: ${score}`, width / 2, height / 2);
  }
}

function mousePressed() {
  for (let i = bugs.length - 1; i >= 0; i--) {
    if (bugs[i].isClicked(mouseX, mouseY)) {
      bugs[i].squish();
      score++;
      globalSpeed += speedIncrease;
      bugs.push(new Bug(random(width), random(height)));
      break;
    }
  }
}

class Bug {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = random(TWO_PI);
    this.squished = false;
  }
  
  move() {
    if (!this.squished) {
      this.x += cos(this.angle) * globalSpeed;
      this.y += sin(this.angle) * globalSpeed;
      
      if (this.x < 0 || this.x > width) this.angle = PI - this.angle;
      if (this.y < 0 || this.y > height) this.angle = -this.angle;
    }
  }
  
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    
    if (!this.squished) {
      let dirIndex = this.getDirectionIndex();
      image(bugImg, 0, 0, spriteWidth, spriteHeight, frameIndex * spriteWidth, dirIndex * spriteHeight, spriteWidth, spriteHeight);
    } else {
      image(squishedImg, 0, 0, 40, 40);
    }
    pop();
  }
  
  getDirectionIndex() {
    let dx = cos(this.angle);
    let dy = sin(this.angle);
    if (abs(dx) > abs(dy)) {
      return dx > 0 ? 3 : 1;
    } else {
      return dy > 0 ? 2 : 0;
    }
  }
  
  isClicked(mx, my) {
    return !this.squished && dist(mx, my, this.x, this.y) < 20;
  }
  
  squish() {
    this.squished = true;
  }
}
