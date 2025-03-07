let synth, noise, noiseFilter, noiseGain, filter, reverb, lfo;
let keyMap;
let activeNotes = new Set();

function setup() {
    createCanvas(400, 400);
    textSize(16);
    textAlign(LEFT, TOP);

    synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 0.8 }
    }).toDestination();
    
    noise = new Tone.Noise("white");
    noiseFilter = new Tone.Filter(800, "lowpass");
    noiseGain = new Tone.Gain(0.1).toDestination();
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    
    filter = new Tone.Filter({ frequency: 1000, type: "lowpass", Q: 10 });
    reverb = new Tone.Reverb({ decay: 2, wet: 0.5 });
    synth.connect(filter);
    filter.connect(reverb);
    reverb.toDestination();
    
    lfo = new Tone.LFO(2, 200, 5000);
    lfo.connect(filter.frequency);
    lfo.start();
    
    keyMap = {
        'q': 'C4', 'w': 'C#4', 'e': 'D4', 'r': 'D#4', 't': 'E4',
        'y': 'F4', 'u': 'F#4', 'i': 'G4', 'o': 'G#4', 'p': 'A4'
    };
    
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    createSliderElement('Filter Frequency', 50, 10000, 1000, (value) => filter.frequency.value = value, 20);
    createSliderElement('Reverb Wetness', 0, 1, 0.5, (value) => reverb.wet.value = value, 80);
    createSliderElement('Noise Filter Frequency', 50, 5000, 800, (value) => noiseFilter.frequency.setValueAtTime(value, Tone.now()), 140);
    createSliderElement('LFO Frequency', 0.1, 10, 2, (value) => lfo.frequency.value = value, 200);
    createSliderElement('Envelope Attack', 0.01, 1, 0.1, (value) => synth.set({ envelope: { attack: value } }), 260);
}

function draw() {
    background(220);
    text("Keyboard Controls:", 20, 20);
    text("Q - C", 20, 40);
    text("W - C#", 20, 60);
    text("E - D", 20, 80);
    text("R - D#", 20, 100);
    text("T - E", 20, 120);
    text("Y - F", 20, 140);
    text("U - F#", 20, 160);
    text("I - G", 20, 180);
    text("O - G#", 20, 200);
    text("P - A", 20, 220);
}

function keyPressed(event) {
    if (keyMap[event.key] && !activeNotes.has(event.key)) {
        synth.triggerAttack(keyMap[event.key]);
        noise.start();
        activeNotes.add(event.key);
    }
}

function keyReleased(event) {
    if (keyMap[event.key]) {
        synth.triggerRelease(keyMap[event.key]);
        noise.stop();
        activeNotes.delete(event.key);
    }
}

function createSliderElement(labelText, min, max, value, callback, position) {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = `${position}px`;
    container.style.left = '420px';
    container.style.fontFamily = 'Arial, sans-serif';

    const label = document.createElement('label');
    label.innerText = labelText;
    label.style.display = 'block';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = min;
    slider.max = max;
    slider.step = (max - min) / 100;
    slider.value = value;
    slider.style.width = '200px';
    slider.addEventListener('input', (event) => callback(parseFloat(event.target.value)));

    container.appendChild(label);
    container.appendChild(slider);
    document.body.appendChild(container);
}
