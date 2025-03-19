let bugs = [];
let score = 0;
let timeLeft = 30;
let gameOver = false;
let bugImg, squishedImg, criticalHealthMusic, squishSound, hardkickSound, confettiSound, backgroundMusic;
let spriteWidth = 32, spriteHeight = 32;
let frameIndex = 0;
let speedIncrease = 0.5;
let globalSpeed = 2;
let criticalMusicPlaying = false;
let confettiPlayed = false;

function preload() {
  bugImg = loadImage('bug.png');
  squishedImg = loadImage('squished.png');
  criticalHealthMusic = loadSound('Critical Health Music.mp3');
  squishSound = loadSound('squish.mp3');
  hardkickSound = loadSound('hardkick.mp3');
  confettiSound = loadSound('confetti.mp3');
  backgroundMusic = loadSound('background.mp3');
}

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug(random(width), random(height)));
  }
  setInterval(updateTimer, 1000);
  setInterval(() => {
    frameIndex = (frameIndex + 1) % 3;
  }, 200);
  
  backgroundMusic.loop();
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    if (timeLeft === 10) {
      backgroundMusic.stop();
      criticalHealthMusic.loop();
    }
  } else {
    gameOver = true;
    criticalHealthMusic.stop();
    if (!confettiPlayed) {
      confettiSound.play();
      confettiPlayed = true;
    }
  }
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
    
    if (timeLeft <= 10) {
      fill(255, 0, 0);
    } else {
      fill(0);
    }
    text(`Time Left: ${timeLeft}s`, 10, 60);
  } else {
    textSize(32);
    textAlign(CENTER, CENTER);
    text(`Game Over! Final Score: ${score}`, width / 2, height / 2);
  }
}

function mousePressed() {
  let bugSquished = false;
  for (let i = bugs.length - 1; i >= 0; i--) {
    if (bugs[i].isClicked(mouseX, mouseY)) {
      bugs[i].squish();
      score++;
      globalSpeed += speedIncrease;
      bugs.push(new Bug(random(width), random(height)));
      squishSound.play();
      bugSquished = true;
      break;
    }
  }
  if (!bugSquished) {
    hardkickSound.play();
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
