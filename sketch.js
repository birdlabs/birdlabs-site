var song;
var sliderVol;
var sliderRate;
var sliderPan;
var button;
var filtButton;
let filter, filterFreq, filterWidth, fft;
let isConnected = true;

function setup() {
 createCanvas(710,256);
 song = loadSound("hexagen2612samp.mp3");
 sliderVol = createSlider(0, 1, 0.5, 0.01);
 sliderRate = createSlider(0, 10, 1, 0.01);
 sliderPan = createSlider(-1, 1, 0, 0.01);
 filter = new p5.BandPass();
 fft = new p5.FFT();
 button = createButton("play");
 filtButton = createButton("filter on");
 button.mousePressed(togglePlaying);
 filtButton.mousePressed(filterStuff);
}

function togglePlaying() {
  if (!song.isPlaying()) { 
   song.loop();
   song.setVolume(0.5);
   button.html("stop");
  }
  else {
   song.pause();
   button.html("play");
  }
}

function filterStuff() {
 if (isConnected) {
  song.disconnect();
  filter.process(song);
  isConnected = false;
  filtButton.html("filter off");
 }
 else {
  song.connect();
  isConnected = true;
  filtButton.html("filter on");
 }
}

function draw() {
 background(0);
 song.setVolume(sliderVol.value());
 song.rate(sliderRate.value());
 song.pan(sliderPan.value());
 filterFreq = map(mouseX, 0, width, 10, 22050);
 filterWidth = map(mouseY, 0, height, 0, 90);
 filter.set(filterFreq, filterWidth);
 let spectrum = fft.analyze();
 noStroke();
 for (let i = 0; i < spectrum.length; i++) {
   let x = map(i, 0, spectrum.length, 0, width);
   let h = -height + map(spectrum[i], 0, 255, height, 0);
   rect(x, height, width / spectrum.length, h);
  }
}
