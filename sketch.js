var alpha, beta, gamma;

var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;
var flying = 0;
var terrain = [];







function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);
 
  

  cols = w / scl;
  rows = h/ scl;
  
  alpha = 670;
  beta = 0;
  gamma = 0;
  
  
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}





function draw() {

  flying -= gamma/10 ;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  
  background(0);

  
  translate(0, 50);
  rotateX(PI/3);
  fill(beta+100,gamma+75,gamma+180,75);
  stroke(233,30,gamma,50);
  translate(-w/2, -h/2);
  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
}


// accelerometer Data
window.addEventListener('deviceorientation', function(e) {
  alpha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
});