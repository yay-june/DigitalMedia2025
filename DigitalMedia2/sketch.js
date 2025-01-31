let colors = [
  'red', 'orange', 'yellow', 'green', 'cyan',
  'blue', 'magenta', 'brown', 'white', 'black'
];
let selectedColor = 'black';
let paletteWidth = 50; 
let lastX, lastY; 

function setup() {
  createCanvas(800, 600);
  background(255); 
  drawPalette(); 
}

function draw() {
  if (mouseIsPressed && mouseX > paletteWidth) {
    stroke(selectedColor);
    strokeWeight(5);
    line(lastX, lastY, mouseX, mouseY);
  }

  lastX = mouseX;
  lastY = mouseY;
}

function mousePressed() {
  if (mouseX < paletteWidth) {
    let index = floor(mouseY / (height / colors.length));
    if (index >= 0 && index < colors.length) {
      selectedColor = colors[index];
    }
  }
}

function drawPalette() {
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    stroke(0);
    rect(0, (height / colors.length) * i, paletteWidth, height / colors.length);
  }
}
