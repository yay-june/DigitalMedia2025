let sounds = {};
let buttons = {};
let vSlider;
let currentS = null;

function preload() {
  sounds['a'] = loadSound('a.wav');
  sounds['b'] = loadSound('b.wav');
  sounds['c'] = loadSound('c.wav');
  sounds['d'] = loadSound('d.wav');
  sounds['g'] = loadSound('g.wav');
}

function setup() {
  createCanvas(400, 300);
  
  createP('Cello Notes').style('font-size', '20px').style('font-weight', 'bold').position(50, 10);
  
  let keys = ['a', 'b', 'c', 'd', 'g'];
  let yPos = 50;
  
  keys.forEach((key, index) => {
    buttons[key] = createButton('Play ' + key.toUpperCase());
    buttons[key].position(50, yPos + index * 40);
    buttons[key].mousePressed(() => playSound(key));
  });
  
  createP('Volume Control').position(200, 10);
  vSlider = createSlider(0, 1, 0.5, 0.01);
  vSlider.position(200, 50);
}

function draw() {
  if (currentS) {
    currentS.setVolume(vSlider.value());
  }
}

function playSound(key) {
  if (currentS) {
    currentS.stop();
  }
  
  if (sounds[key]) {
    let sound = sounds[key];
    sound.setVolume(vSlider.value());
    sound.play();
    currentS = sound;
  }
}
