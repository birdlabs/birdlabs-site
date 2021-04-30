var song;
var sliderVol, sliderRate, sliderPan;
var button, bpFiltButton, lpFiltButton;
let bpFilter, lpFilter, filterFreq, filterWidth, filterRes, fft;
let isConnected = true, bpOn = false, lpOn = false;

function setup() {
 createCanvas(710,256);
 song = loadSound("hexagen2612samp.mp3");
 sliderVol = createSlider(0, 1, 0.5, 0.01);
 sliderRate = createSlider(0, 10, 1, 0.01);
 sliderPan = createSlider(-1, 1, 0, 0.01);
 bpFilter = new p5.BandPass();
 lpFilter = new p5.LowPass();
 fft = new p5.FFT();
 button = createButton("play");
 bpFiltButton = createButton("BPF on");
 lpFiltButton = createButton("LPF on");
 button.mousePressed(togglePlaying);
 bpFiltButton.mousePressed(bpFilterStuff);
 lpFiltButton.mousePressed(lpFilterStuff);
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

function bpFilterStuff() {
 if (isConnected || lpOn) {
  song.disconnect();
  bpFilter.process(song);
  isConnected = false;
  bpOn = true;
  bpFiltButton.html("BPF off");
  if (lpOn) {
   lpFiltButton.html("LPF on");
   lpOn = false;
  }
 }
 else {
  song.connect();
  isConnected = true;
  bpOn = false;
  bpFiltButton.html("BPF on");
 }
}

function lpFilterStuff() {
 if (isConnected || bpOn) {
  song.disconnect();
  lpFilter.process(song);
  isConnected = false;
  lpOn = true;
  lpFiltButton.html("LPF off");
  if (bpOn) {
   bpFiltButton.html("BPF on");
   bpOn = false;
  } 
 }
 else {
  song.connect()
  isConnected = true;
  lpOn = false;
  lpFiltButton.html("LPF on");
 } 
}

function draw() {
 background(0);
 song.setVolume(sliderVol.value());
 song.rate(sliderRate.value());
 song.pan(sliderPan.value());
 filterFreq = map(mouseX, 0, width, 10, 22050);
 filterWidth = map(mouseY, 0, height-50, 0, 90);
 filterRes = map(mouseY, 0, height, 15, 5);
 bpFilter.set(filterFreq, filterWidth);
 lpFilter.set(filterFreq, filterRes);
 let spectrum = fft.analyze();
 noStroke();
 for (let i = 0; i < spectrum.length; i++) {
   let x = map(i, 0, spectrum.length, 0, width);
   let h = -height + map(spectrum[i], 0, 255, height, 0);
   rect(x, height, width / spectrum.length, h);
  }
}
