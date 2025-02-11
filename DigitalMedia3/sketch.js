let spriteSheets = {};
let characters = [];
let frameWidth = 80
let frameHeight = 80;
let totalFrames = 8;

function preload() {
    spriteSheets["ninja"] = loadImage("PC Computer - Spelunky - Ninja.png");
    spriteSheets["robot"] = loadImage("PC Computer - Spelunky - Robot.png");
    spriteSheets["roundBoy"] = loadImage("PC Computer - Spelunky - Round Boy.png");
}

function setup() {
    createCanvas(800, 400);
    let numNinjas = floor(random(3, 6));
    let numRobots = floor(random(3, 6));
    let numRoundBoys = floor(random(3, 6));
    let positions = [];
    for (let i = 0; i < numNinjas + numRobots + numRoundBoys; i++) {
        let x, y, overlapping;
        do {
            overlapping = false;
            x = random(width - frameWidth);
            y = random(height - frameHeight);
            
            for (let pos of positions) {
                if (dist(x, y, pos.x, pos.y) < frameWidth) {
                    overlapping = true;
                    break;
                }
            }
        } while (overlapping);
        positions.push({ x, y });
        let type;
        if (i < numNinjas) {
            type = "ninja";
        } else if (i < numNinjas + numRobots) {
            type = "robot";
        } else {
            type = "roundBoy";
        }
        characters.push(new Character(x, y, type));
    }
}

function draw() {
    background(220);
    for (let character of characters) {
        character.update();
        character.show();
    }
}

class Character {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.frame = 0;
        this.speed = 2;
        this.moving = 0;
        this.frameDelay = 6;
        this.frameCounter = 0;
        this.facing = 1; 
    }
    update() {
        if (keyIsDown(LEFT_ARROW)) {
            this.moving = -1;
            this.facing = -1;
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.moving = 1;
            this.facing = 1;
        } else {
            this.moving = 0;
        }
        
        this.x += this.moving * this.speed;
        
        if (this.moving !== 0) {
            this.frameCounter++;
            if (this.frameCounter >= this.frameDelay) {
                this.frame = (this.frame + 1) % totalFrames;
                this.frameCounter = 0;
            }
        } else {
            this.frame = 0; 
        }
    }
    show() {
        push();
        translate(this.x, this.y);
        if (this.facing === -1) {
            scale(-1, 1);
            image(spriteSheets[this.type], -frameWidth, 0, frameWidth, frameHeight, this.frame * frameWidth, 0, frameWidth, frameHeight);
        } else {
            image(spriteSheets[this.type], 0, 0, frameWidth, frameHeight, this.frame * frameWidth, 0, frameWidth, frameHeight);
        }
        pop();
    }
}
