let img;
let fmSynth;
let filter;
let filterSlider;
let showImage = false;

function preload() {
  img = loadImage('kirby.jpg'); 
}

function setup() {
  createCanvas(600, 400);
  background(220);
  textAlign(CENTER, CENTER);
  textSize(20);
  text('Click to make Kirby swallow!', width / 2, height / 2);

  filter = new Tone.Filter(800, "lowpass").toDestination();
  
  fmSynth = new Tone.FMSynth({
    harmonicity: 4,
    modulationIndex: 12,
    envelope: {
      attack: 0.05,
      decay: 0.1,
      sustain: 0.5,
      release: 0.3
    },
    modulation: {
      type: 'square'
    }
  }).connect(filter);
  filterSlider = createSlider(100, 2000, 800, 50);
  filterSlider.position(20, height - 40);
  filterSlider.input(updateFilter);
}

function draw() {
  background(220); 
  fill(0);
  text('Click to make Kirby swallow!', width / 2, height / 2 - 50);
  fill(0);
  text('Filter Frequency: ' + filterSlider.value(), 150, height - 50);
  if (showImage) {
    image(img, width / 2 - img.width / 4, height / 2 - img.height / 4, img.width / 2, img.height / 2);
  }
}

function mousePressed() {
  showImage = true; 
  fmSynth.triggerAttack('C4');
}

function mouseReleased() {
  showImage = false; 
  fmSynth.triggerRelease();
}

function updateFilter() {
  filter.frequency.value = parseFloat(filterSlider.value()); 
}
