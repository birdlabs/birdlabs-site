var song;
var sliderVol;
var sliderRate;
var sliderPan;
var button;

function setup() {
 createCanvas(200,200);
 song = loadSound("hexagen2612samp.mp3"); 
 sliderVol = createSlider(0, 1, 0.5, 0.01);
 sliderRate = createSlider(0, 10, 1, 0.01);
 sliderPan = createSlider(0, 1, 0.5, 0.01);
 button = createButton("play");
 button.mousePressed(togglePlaying);
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

function draw() {
 //background(0);
 song.setVolume(sliderVol.value());
 song.rate(sliderRate.value());
 song.pan(sliderPan.value());
}
